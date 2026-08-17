import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => {
  const app = { name: "test-firebase-app" };
  const credential = { kind: "test-credential" };
  const auth = { kind: "test-auth" };
  const db = { kind: "test-firestore" };
  const storage = { kind: "test-storage" };

  return {
    app,
    credential,
    auth,
    db,
    storage,
    initializeApp: vi.fn(() => app),
    cert: vi.fn(() => credential),
    getAuth: vi.fn(() => auth),
    getFirestore: vi.fn(() => db),
    getStorage: vi.fn(() => storage),
    readFileSync: vi.fn(() => JSON.stringify({ project_id: "test-project" })),
  };
});

vi.mock("firebase-admin", () => ({
  initializeApp: mocks.initializeApp,
  credential: { cert: mocks.cert },
  auth: mocks.getAuth,
  firestore: mocks.getFirestore,
  storage: mocks.getStorage,
}));

vi.mock("fs", () => ({ readFileSync: mocks.readFileSync }));

import {
  getFirebaseAuth,
  getFirebaseApp,
  getFirebaseDb,
  getFirebaseStorage,
  initializeFirebase,
} from "./firebase";

const originalProjectId = process.env.FIREBASE_PROJECT_ID;

describe("Firebase configuration unit tests", () => {
  beforeAll(() => {
    process.env.FIREBASE_PROJECT_ID = "test-project";
  });

  afterAll(() => {
    if (originalProjectId === undefined) {
      delete process.env.FIREBASE_PROJECT_ID;
    } else {
      process.env.FIREBASE_PROJECT_ID = originalProjectId;
    }
  });

  it("initializes the Admin SDK through mocked dependencies without credentials", () => {
    const app = initializeFirebase();

    expect(app).toBe(mocks.app);
    expect(mocks.readFileSync).toHaveBeenCalledOnce();
    expect(mocks.cert).toHaveBeenCalledWith({ project_id: "test-project" });
    expect(mocks.initializeApp).toHaveBeenCalledWith({
      credential: mocks.credential,
      projectId: "test-project",
      databaseURL: undefined,
      storageBucket: undefined,
    });
  });

  it("caches the initialized app", () => {
    expect(getFirebaseApp()).toBe(mocks.app);
    expect(getFirebaseApp()).toBe(mocks.app);
    expect(mocks.initializeApp).toHaveBeenCalledOnce();
  });

  it("exposes Firebase service clients through the initialized app", () => {
    expect(getFirebaseAuth()).toBe(mocks.auth);
    expect(getFirebaseDb()).toBe(mocks.db);
    expect(getFirebaseStorage()).toBe(mocks.storage);
    expect(mocks.getAuth).toHaveBeenCalledWith(mocks.app);
    expect(mocks.getFirestore).toHaveBeenCalledWith(mocks.app);
    expect(mocks.getStorage).toHaveBeenCalledWith(mocks.app);
  });
});
