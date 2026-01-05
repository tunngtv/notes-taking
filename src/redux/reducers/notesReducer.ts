import { initialNote } from "@/initial-note";
import types from "../types/types";
import { Note } from "../../types/note";
import {
  ChangeActiveNoteAction,
  AddNewNoteAction,
  DeleteNoteAction,
  SaveNoteContentAction,
} from "../actions/notes";
import { Action } from "redux";
import { RootState } from "../store/store";

export interface NotesState {
  notes: Note[];
  activeNote: string | number; // Could be string or number based on initial value
}

const initialState: NotesState = {
  notes: [initialNote],
  activeNote: initialNote.id,
};

export const notesReducer = (
  state: NotesState = initialState,
  action: Action
): NotesState => {
  switch (action.type) {
    case "RESET_STATE": {
      const typedAction = action as { type: "RESET_STATE"; payload: RootState };
      const loadedState = typedAction.payload.notes;
      
      // If there are no notes in the loaded state, use initial state with sample note
      if (!loadedState || loadedState.notes.length === 0) {
        return initialState;
      }
      
      // Ensure activeNote exists in the notes array
      const hasValidActiveNote = loadedState.notes.some(note => note.id === loadedState.activeNote);
      if (!hasValidActiveNote && loadedState.notes.length > 0) {
        // Set first note as active if current activeNote doesn't exist
        return {
          ...loadedState,
          activeNote: loadedState.notes[0].id,
        };
      }
      
      return loadedState;
    }
    case types.notesActiveNote: {
      const typedAction = action as ChangeActiveNoteAction;
      return {
        ...state,
        activeNote: typedAction.payload,
      };
    }
    case types.notesAddNewNote: {
      const typedAction = action as AddNewNoteAction;
      return {
        ...state,
        notes: [...state.notes, typedAction.payload],
      };
    }
    case types.notesDeleteNote: {
      const typedAction = action as DeleteNoteAction;
      const newActiveNote = state.notes[0]?.id;

      if (typedAction.payload === newActiveNote) {
        const nextActiveNote = state.notes[1]?.id || state.activeNote;
        return {
          notes: state.notes.filter(note => note.id !== typedAction.payload),
          activeNote: nextActiveNote,
        };
      }

      return {
        notes: state.notes.filter(note => note.id !== typedAction.payload),
        activeNote: newActiveNote,
      };
    }
    case types.notesSaveNoteContent: {
      const typedAction = action as SaveNoteContentAction;
      const noteIndex = state.notes.findIndex(
        note => note.id === typedAction.payload.id
      );

      if (noteIndex === -1) {
        return state; // No note with the given ID to update
      }

      return {
        ...state,
        notes: [
          ...state.notes.slice(0, noteIndex),
          {
            ...state.notes[noteIndex],
            content: typedAction.payload.content,
          },
          ...state.notes.slice(noteIndex + 1),
        ],
      };
    }
    default:
      return state;
  }
};
