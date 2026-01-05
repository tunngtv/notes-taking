import { RootState } from "./redux/store/store";

const DB_NAME = "notes-app";
const DB_VERSION = 1;
const STORE_NAME = "app-state";

let db: IDBDatabase | null = null;

function openDB(): Promise<IDBDatabase> {
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
        dbInstance.createObjectStore(STORE_NAME, { keyPath: "key" });
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

export const loadState = async (): Promise<RootState | undefined> => {
  try {
    const db = await openDB();

    return new Promise((resolve, reject) => {
      const transaction = db.transaction([STORE_NAME], "readonly");
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

export const saveState = async (state: RootState) => {
  try {
    const db = await openDB();
    const serializedState = JSON.stringify(state);

    return new Promise((resolve, reject) => {
      const transaction = db.transaction([STORE_NAME], "readwrite");
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
  }
};
