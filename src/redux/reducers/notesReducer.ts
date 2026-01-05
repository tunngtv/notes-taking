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
  activeNote: 928734,
};

export const notesReducer = (
  state: NotesState = initialState,
  action: Action
): NotesState => {
  switch (action.type) {
    case "RESET_STATE": {
      const typedAction = action as { type: "RESET_STATE"; payload: RootState };
      return typedAction.payload.notes || state;
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
