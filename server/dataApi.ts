import { eq, and } from "drizzle-orm";
import { dataItems, InsertDataItem, DataItem } from "../drizzle/schema";
import { getDb } from "./db";

/**
 * Create a new data item for a user
 */
export async function createDataItem(
  userId: number,
  data: Omit<InsertDataItem, "userId">
): Promise<DataItem | null> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot create data item: database not available");
    return null;
  }

  try {
    const result = await db.insert(dataItems).values({
      ...data,
      userId,
    });

    if (result[0].insertId) {
      const items = await db
        .select()
        .from(dataItems)
        .where(eq(dataItems.id, Number(result[0].insertId)))
        .limit(1);
      return items.length > 0 ? items[0] : null;
    }
    return null;
  } catch (error) {
    console.error("[Database] Failed to create data item:", error);
    throw error;
  }
}

/**
 * Get all data items for a user
 */
export async function getUserDataItems(userId: number): Promise<DataItem[]> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get data items: database not available");
    return [];
  }

  try {
    const items = await db
      .select()
      .from(dataItems)
      .where(
        and(
          eq(dataItems.userId, userId),
          eq(dataItems.status, "active")
        )
      );
    return items;
  } catch (error) {
    console.error("[Database] Failed to get data items:", error);
    throw error;
  }
}

/**
 * Get a single data item by ID
 */
export async function getDataItemById(
  itemId: number,
  userId: number
): Promise<DataItem | null> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get data item: database not available");
    return null;
  }

  try {
    const items = await db
      .select()
      .from(dataItems)
      .where(
        and(
          eq(dataItems.id, itemId),
          eq(dataItems.userId, userId)
        )
      )
      .limit(1);
    return items.length > 0 ? items[0] : null;
  } catch (error) {
    console.error("[Database] Failed to get data item:", error);
    throw error;
  }
}

/**
 * Update a data item
 */
export async function updateDataItem(
  itemId: number,
  userId: number,
  data: Partial<Omit<InsertDataItem, "userId">>
): Promise<DataItem | null> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot update data item: database not available");
    return null;
  }

  try {
    await db
      .update(dataItems)
      .set({
        ...data,
        updatedAt: new Date(),
      })
      .where(
        and(
          eq(dataItems.id, itemId),
          eq(dataItems.userId, userId)
        )
      );

    return getDataItemById(itemId, userId);
  } catch (error) {
    console.error("[Database] Failed to update data item:", error);
    throw error;
  }
}

/**
 * Delete (soft delete) a data item
 */
export async function deleteDataItem(
  itemId: number,
  userId: number
): Promise<boolean> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot delete data item: database not available");
    return false;
  }

  try {
    await db
      .update(dataItems)
      .set({
        status: "deleted",
        updatedAt: new Date(),
      })
      .where(
        and(
          eq(dataItems.id, itemId),
          eq(dataItems.userId, userId)
        )
      );
    return true;
  } catch (error) {
    console.error("[Database] Failed to delete data item:", error);
    throw error;
  }
}

/**
 * Archive a data item
 */
export async function archiveDataItem(
  itemId: number,
  userId: number
): Promise<DataItem | null> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot archive data item: database not available");
    return null;
  }

  try {
    await db
      .update(dataItems)
      .set({
        status: "archived",
        updatedAt: new Date(),
      })
      .where(
        and(
          eq(dataItems.id, itemId),
          eq(dataItems.userId, userId)
        )
      );

    return getDataItemById(itemId, userId);
  } catch (error) {
    console.error("[Database] Failed to archive data item:", error);
    throw error;
  }
}
