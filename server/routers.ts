import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router, protectedProcedure } from "./_core/trpc";
import { z } from "zod";
import * as dataApi from "./dataApi";

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  // Data management endpoints
  data: router({
    // Get all data items for the current user
    list: protectedProcedure.query(async ({ ctx }) => {
      if (!ctx.user) {
        throw new Error("User not found");
      }
      return dataApi.getUserDataItems(ctx.user.id);
    }),

    // Create a new data item
    create: protectedProcedure
      .input(
        z.object({
          title: z.string().min(1, "Title is required"),
          description: z.string().optional(),
          content: z.string().optional(),
        })
      )
      .mutation(async ({ ctx, input }) => {
        if (!ctx.user) {
          throw new Error("User not found");
        }
        return dataApi.createDataItem(ctx.user.id, {
          title: input.title,
          description: input.description,
          content: input.content,
          status: "active",
        });
      }),

    // Get a specific data item
    get: protectedProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ ctx, input }) => {
        if (!ctx.user) {
          throw new Error("User not found");
        }
        return dataApi.getDataItemById(input.id, ctx.user.id);
      }),

    // Update a data item
    update: protectedProcedure
      .input(
        z.object({
          id: z.number(),
          title: z.string().optional(),
          description: z.string().optional(),
          content: z.string().optional(),
        })
      )
      .mutation(async ({ ctx, input }) => {
        if (!ctx.user) {
          throw new Error("User not found");
        }
        const { id, ...updateData } = input;
        return dataApi.updateDataItem(id, ctx.user.id, updateData);
      }),

    // Delete a data item (soft delete)
    delete: protectedProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ ctx, input }) => {
        if (!ctx.user) {
          throw new Error("User not found");
        }
        return dataApi.deleteDataItem(input.id, ctx.user.id);
      }),

    // Archive a data item
    archive: protectedProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ ctx, input }) => {
        if (!ctx.user) {
          throw new Error("User not found");
        }
        return dataApi.archiveDataItem(input.id, ctx.user.id);
      }),
  }),
});

export type AppRouter = typeof appRouter;
