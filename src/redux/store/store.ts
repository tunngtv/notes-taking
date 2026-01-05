import { configureStore } from "@reduxjs/toolkit";
import { notesReducer, NotesState } from "../reducers/notesReducer";
import { loadState, saveState } from "../../localStorage";

// Define the RootState type
export interface RootState {
  notes: NotesState;
}

// Initialize store without preloaded state initially
export const store = configureStore<RootState>({
  reducer: {
    notes: notesReducer,
  },
});

// Load state asynchronously and dispatch reset action if needed
async function initializeState() {
  try {
    const persistedState = await loadState();
    if (persistedState) {
      // Dispatch an action to restore the state
      store.dispatch({ type: "RESET_STATE", payload: persistedState });
    }
  } catch (error) {
    console.error("Failed to load persisted state:", error);
  }
}

// Subscribe to store changes to persist state
store.subscribe(async () => {
  try {
    await saveState(store.getState());
  } catch (error) {
    console.error("Failed to save state:", error);
  }
});

// Initialize state asynchronously
initializeState();
