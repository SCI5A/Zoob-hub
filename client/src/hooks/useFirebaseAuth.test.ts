import { describe, it, expect, beforeAll } from 'vitest';

describe('Firebase Auth Configuration', () => {
  it('should have Firebase environment variables configured', () => {
    expect(import.meta.env.VITE_FIREBASE_PROJECT_ID).toBeDefined();
    expect(import.meta.env.VITE_FIREBASE_AUTH_DOMAIN).toBeDefined();
  });

  it('should have correct Firebase project ID', () => {
    expect(import.meta.env.VITE_FIREBASE_PROJECT_ID).toBe('zopia-project-1773520629');
  });

  it('should have correct Firebase auth domain', () => {
    expect(import.meta.env.VITE_FIREBASE_AUTH_DOMAIN).toContain('firebaseapp.com');
  });

  it('should have Firebase storage bucket configured', () => {
    expect(import.meta.env.VITE_FIREBASE_STORAGE_BUCKET).toBeDefined();
  });
});
