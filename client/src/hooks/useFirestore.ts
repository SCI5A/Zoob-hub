import { useEffect, useState } from 'react';
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';

export interface FirestoreState<T> {
  data: T[];
  loading: boolean;
  error: Error | null;
}

export function useFirestoreCollection<T extends { id?: string }>(
  collectionName: string
) {
  const [state, setState] = useState<FirestoreState<T>>({
    data: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    const collectionRef = collection(db, collectionName);

    const unsubscribe = onSnapshot(
      collectionRef,
      (snapshot) => {
        const docs = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        } as T));
        setState({
          data: docs,
          loading: false,
          error: null,
        });
      },
      (error) => {
        setState({
          data: [],
          loading: false,
          error: error as Error,
        });
      }
    );

    return unsubscribe;
  }, [collectionName]);

  return state;
}

export function useFirestoreAdd(collectionName: string) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const add = async (data: Record<string, unknown>) => {
    try {
      setLoading(true);
      setError(null);
      const collectionRef = collection(db, collectionName);
      const docRef = await addDoc(collectionRef, data);
      setLoading(false);
      return docRef.id;
    } catch (err) {
      const error = err as Error;
      setError(error);
      setLoading(false);
      throw error;
    }
  };

  return { add, loading, error };
}

export function useFirestoreUpdate(collectionName: string) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const update = async (docId: string, data: Record<string, unknown>) => {
    try {
      setLoading(true);
      setError(null);
      const docRef = doc(db, collectionName, docId);
      await updateDoc(docRef, data);
      setLoading(false);
    } catch (err) {
      const error = err as Error;
      setError(error);
      setLoading(false);
      throw error;
    }
  };

  return { update, loading, error };
}

export function useFirestoreDelete(collectionName: string) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const remove = async (docId: string) => {
    try {
      setLoading(true);
      setError(null);
      const docRef = doc(db, collectionName, docId);
      await deleteDoc(docRef);
      setLoading(false);
    } catch (err) {
      const error = err as Error;
      setError(error);
      setLoading(false);
      throw error;
    }
  };

  return { remove, loading, error };
}
