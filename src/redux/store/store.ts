import { configureStore } from "@reduxjs/toolkit";
import { notesReducer, NotesState } from "../reducers/notesReducer";

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
