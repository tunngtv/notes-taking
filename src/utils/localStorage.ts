/**
 * Local storage management using IndexedDB
 * Handles saving and loading application state
 */

import { RootState } from "../redux/store/store";

// Database configuration constants
const DB_NAME = "notes-app";
const DB_VERSION = 1;
const STORE_NAME = "app-state";

// Global database reference
let db: IDBDatabase | null = null;

/**
 * Opens and initializes the IndexedDB database
 * Creates the object store if it doesn't exist
 */
function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    // Return existing database connection if available
    if (db) {
      return resolve(db);
    }

    // Check if IndexedDB is supported by the browser
    if (!window.indexedDB) {
      console.error("IndexedDB is not supported by this browser.");
      return reject(new Error("IndexedDB not supported"));
    }

    // Open database connection
    const request = window.indexedDB.open(DB_NAME, DB_VERSION);

    // Create object store if it doesn't exist
    request.onupgradeneeded = (event) => {
      const dbInstance = (event.target as IDBOpenDBRequest).result;
      if (!dbInstance.objectStoreNames.contains(STORE_NAME)) {
        dbInstance.createObjectStore(STORE_NAME, { keyPath: "key" });
      }
    };

    // Handle successful database opening
    request.onsuccess = (event) => {
      db = (event.target as IDBOpenDBRequest).result;
      resolve(db);
    };

    // Handle database opening errors
    request.onerror = (event) => {
      console.error(
        "IndexedDB error:",
        (event.target as IDBOpenDBRequest).error
      );
      reject(new Error("IndexedDB error"));
    };
  });
}

/**
 * Loads the application state from IndexedDB
 * @returns Promise with the loaded RootState or undefined if not found
 */
export const loadState = async (): Promise<RootState | undefined> => {
  try {
    const database = await openDB();

    return new Promise((resolve, reject) => {
      const transaction = database.transaction([STORE_NAME], "readonly");
      const store = transaction.objectStore(STORE_NAME);
      const request = store.get("state");

      request.onsuccess = () => {
        const result = request.result;
        if (result && result.data) {
          resolve(JSON.parse(result.data));
        } else {
          resolve(undefined);
        }
      };

      request.onerror = () => {
        reject(new Error("Failed to load state from IndexedDB"));
      };
    });
 } catch (err) {
    console.error("Error loading state:", err);
    return undefined;
  }
};

/**
 * Saves the application state to IndexedDB
 * @param state The RootState to save
 */
export const saveState = async (state: RootState) => {
   try {
     const database = await openDB();
     const serializedState = JSON.stringify(state);

     return new Promise((resolve, reject) => {
       const transaction = database.transaction([STORE_NAME], "readwrite");
       const store = transaction.objectStore(STORE_NAME);
       const request = store.put({ key: "state", data: serializedState });

       request.onsuccess = () => {
         resolve(void 0);
       };

       request.onerror = () => {
         console.warn("Failed to save state to IndexedDB");
         reject(new Error("Failed to save state to IndexedDB"));
       };
     });
 } catch (event) {
     console.warn("Error saving state:", event);
     throw event;
   }
 };
