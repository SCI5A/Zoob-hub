import * as admin from 'firebase-admin';
import { readFileSync } from 'fs';
import { join } from 'path';

// Initialize Firebase Admin SDK
let firebaseApp: admin.app.App | undefined = undefined;

export function initializeFirebase() {
  if (firebaseApp) {
    return firebaseApp;
  }

  try {
    // Read the Firebase Admin SDK key file
    const serviceAccountPath = join(process.cwd(), 'firebase-adminsdk.json');
    const serviceAccount = JSON.parse(readFileSync(serviceAccountPath, 'utf-8'));

    firebaseApp = admin.initializeApp({
      credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
      projectId: process.env.FIREBASE_PROJECT_ID,
      databaseURL: process.env.FIREBASE_DATABASE_URL,
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    });

    console.log('[Firebase] Admin SDK initialized successfully');
    return firebaseApp;
  } catch (error) {
    console.error('[Firebase] Failed to initialize Admin SDK:', error);
    throw error;
  }
}

export function getFirebaseApp(): admin.app.App {
  if (!firebaseApp) {
    firebaseApp = initializeFirebase();
  }
  return firebaseApp;
}

export function getFirebaseAuth() {
  const app = getFirebaseApp();
  return admin.auth(app);
}

export function getFirebaseDb() {
  const app = getFirebaseApp();
  return admin.firestore(app);
}

export function getFirebaseStorage() {
  const app = getFirebaseApp();
  return admin.storage(app);
}

// Verify Firebase connection
export async function verifyFirebaseConnection(): Promise<boolean> {
  try {
    const db = getFirebaseDb();
    const testDoc = await db.collection('_test').doc('connection').get();
    console.log('[Firebase] Connection verified');
    return true;
  } catch (error) {
    console.error('[Firebase] Connection verification failed:', error);
    return false;
  }
}
