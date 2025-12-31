import { openDB } from './indexedDb';
import { Note } from '@/types/note';
import { generateUUID } from '@/utils/uuid';

const STORE_NAME = 'notes';

type PartialNote = Partial<Note>;

const notesRepository = {
  async createNote(noteData: PartialNote = {}): Promise<Note> {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      
      const now = Date.now();
      const newNote: Note = {
        id: generateUUID(),
        title: 'New Note',
        content: '',
        createdAt: now,
        updatedAt: now,
        ...noteData,
      };

      const request = store.add(newNote);

      request.onsuccess = () => {
        resolve(newNote);
      };

      request.onerror = (event) => {
        console.error('Error creating note:', (event.target as IDBRequest).error);
        reject(new Error('Could not create note'));
      };
    });
  },

  async getAllNotes(): Promise<Note[]> {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.getAll();

      request.onsuccess = () => {
        const sortedNotes = request.result.sort((a, b) => b.updatedAt - a.updatedAt);
        resolve(sortedNotes);
      };

      request.onerror = (event) => {
        console.error('Error getting all notes:', (event.target as IDBRequest).error);
        reject(new Error('Could not get all notes'));
      };
    });
  },

  async getNoteById(id: string): Promise<Note | undefined> {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.get(id);

      request.onsuccess = () => {
        resolve(request.result);
      };

      request.onerror = (event) => {
        console.error(`Error getting note by id ${id}:`, (event.target as IDBRequest).error);
        reject(new Error('Could not get note'));
      };
    });
  },

  async updateNote(note: PartialNote): Promise<Note> {
    const db = await openDB();
    return new Promise(async (resolve, reject) => {
       if (!note.id) {
        return reject(new Error('Note ID is required for updates'));
      }

      const transaction = db.transaction(STORE_NAME, 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      
      const existingNoteRequest = store.get(note.id);

      existingNoteRequest.onerror = (event) => {
        console.error('Error fetching existing note for update:', (event.target as IDBRequest).error);
        reject(new Error('Could not fetch existing note for update'));
      };

      existingNoteRequest.onsuccess = () => {
        const existingNote = existingNoteRequest.result;
        if (!existingNote) {
          return reject(new Error(`Note with id ${note.id} not found`));
        }

        const updatedNote: Note = {
          ...existingNote,
          ...note,
          updatedAt: Date.now(),
        };

        const updateRequest = store.put(updatedNote);

        updateRequest.onsuccess = () => {
          resolve(updatedNote);
        };

        updateRequest.onerror = (event) => {
          console.error('Error updating note:', (event.target as IDBRequest).error);
          reject(new Error('Could not update note'));
        };
      };
    });
  },

  async deleteNote(id: string): Promise<void> {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.delete(id);

      request.onsuccess = () => {
        resolve();
      };

      request.onerror = (event) => {
        console.error(`Error deleting note with id ${id}:`, (event.target as IDBRequest).error);
        reject(new Error('Could not delete note'));
      };
    });
  },

  async searchNotes(query: string): Promise<Note[]> {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.openCursor();
      const matchingNotes: Note[] = [];
      const lowerCaseQuery = query.toLowerCase();

      request.onsuccess = (event) => {
        const cursor = (event.target as IDBRequest<IDBCursorWithValue>).result;
        if (cursor) {
          const note: Note = cursor.value;
          if (
            note.title.toLowerCase().includes(lowerCaseQuery) ||
            note.content.toLowerCase().includes(lowerCaseQuery)
          ) {
            matchingNotes.push(note);
          }
          cursor.continue();
        } else {
          resolve(matchingNotes.sort((a, b) => b.updatedAt - a.updatedAt));
        }
      };

      request.onerror = (event) => {
        console.error('Error searching notes:', (event.target as IDBRequest).error);
        reject(new Error('Could not search notes'));
      };
    });
  },
};

export default notesRepository;
