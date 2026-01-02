import { Note } from "@/types/note";

const DB_NAME = "notes-db";
const DB_VERSION = 1;
const STORE_NAME = "notes";

let db: IDBDatabase | null = null;

export function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (db) {
      return resolve(db);
    }

    if (!window.indexedDB) {
      console.error("IndexedDB is not supported by this browser.");
      return reject(new Error("IndexedDB not supported"));
    }

    const request = window.indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = event => {
      const dbInstance = (event.target as IDBOpenDBRequest).result;
      if (!dbInstance.objectStoreNames.contains(STORE_NAME)) {
        const store = dbInstance.createObjectStore(STORE_NAME, {
          keyPath: "id",
        });
        store.createIndex("title", "title", { unique: false });
        store.createIndex("content", "content", { unique: false });
        store.createIndex("updatedAt", "updatedAt", { unique: false });
      }
    };

    request.onsuccess = event => {
      db = (event.target as IDBOpenDBRequest).result;
      resolve(db);
    };

    request.onerror = event => {
      console.error(
        "IndexedDB error:",
        (event.target as IDBOpenDBRequest).error
      );
      reject(new Error("IndexedDB error"));
    };
  });
}
