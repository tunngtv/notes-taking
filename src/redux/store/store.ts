import { configureStore } from "@reduxjs/toolkit";
import { notesReducer, NotesState } from "../reducers/notesReducer";
import { loadState, saveState } from "../../localStorage";

// Define the RootState type
export interface RootState {
  notes: NotesState;
}

export const store = configureStore<RootState>({
  reducer: {
    notes: notesReducer,
  },
  preloadedState: loadState(),
});

store.subscribe(() => {
  saveState(store.getState());
});
