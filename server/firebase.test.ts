import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { initializeFirebase, getFirebaseDb, getFirebaseAuth } from './firebase';
import * as admin from 'firebase-admin';

describe('Firebase Configuration', () => {
  let app: admin.app.App;

  beforeAll(() => {
    try {
      app = initializeFirebase();
    } catch (error) {
      console.error('Failed to initialize Firebase:', error);
    }
  });

  it('should initialize Firebase Admin SDK successfully', () => {
    expect(app).toBeDefined();
  });

  it('should have Firebase Auth available', () => {
    const auth = getFirebaseAuth();
    expect(auth).toBeDefined();
  });

  it('should have Firestore database available', () => {
    const db = getFirebaseDb();
    expect(db).toBeDefined();
  });

  it('should have correct project ID configured', () => {
    expect(process.env.FIREBASE_PROJECT_ID).toBe('zopia-project-1773520629');
  });

  it('should have Firebase credentials configured', () => {
    expect(process.env.FIREBASE_CLIENT_EMAIL).toBeDefined();
    expect(process.env.FIREBASE_CLIENT_EMAIL).toContain('firebase-adminsdk');
  });
});
