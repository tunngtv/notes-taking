import types from "../types/types";
import { Note } from "../../types/note";
import { Action } from "redux";
import { notesService } from "@/services/notesService";
import { supabase } from "@/lib/supabase";
import { initialNote } from "@/data/initial-note";

// Define action types
export interface ChangeActiveNoteAction extends Action {
  type: typeof types.notesActiveNote;
  payload: string;
}

export interface AddNewNoteAction extends Action {
  type: typeof types.notesAddNewNote;
  payload: Note;
}

export interface DeleteNoteAction extends Action {
  type: typeof types.notesDeleteNote;
  payload: string;
}

export interface SaveNoteContentAction extends Action {
  type: typeof types.notesSaveNoteContent;
  payload: { id: string; content: string };
}

// Action creators
export const changeActiveNote = (id: string): ChangeActiveNoteAction => ({
  type: types.notesActiveNote,
  payload: id,
});

// Async Action Creators (Thunks)
export const addNewNote = (note: Note) => async (dispatch: any) => {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) throw new Error("Authentication required");

    const dbNote = await notesService.createNote({
      id: note.id,
      title: note.title,
      content: note.content,
      tags: note.tags,
      user_id: session.user.id
    });
    dispatch({
      type: types.notesAddNewNote,
      payload: { ...note, ...dbNote },
    });
  } catch (error) {
    console.error("Error adding note:", error);
  }
};

export const deleteNote = (id: string) => async (dispatch: any) => {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) throw new Error("Authentication required");

    // Don't delete initialNote from DB (it's not there)
    if (id !== initialNote.id) {
      await notesService.deleteNote(id);
    }
    
    dispatch({
      type: types.notesDeleteNote,
      payload: id,
    });
  } catch (error) {
    console.error("Error deleting note:", error);
  }
};

export const saveNoteContent = (id: string, content: string) => async (dispatch: any, getState: any) => {
  try {
    const state = getState();
    const note = state.notes.notes.find((n: Note) => n.id === id);
    
    if (note) {
      const { data: { session } } = await supabase.auth.getSession();
      
      // If logged in and NOT the initialNote (unless we want to save edits to initialNote too)
      if (session) {
        // If it's the initialNote being edited for the first time, Supabase might not have it.
        // We should probably check if it was already created or just update.
        // For simplicity, we use updateNote which uses .match({id}).
        // If it's the initialNote and it doesn't exist in DB, it just won't update anything in DB.
        
        await notesService.updateNote(id, {
          content,
          title: note.title, // Title update is often separate but we sync it here too
          user_id: session.user.id
        });
      }
    }

    dispatch({
      type: types.notesSaveNoteContent,
      payload: { id, content },
    });
  } catch (error) {
    console.error("Error saving note content:", error);
    dispatch({
      type: types.notesSaveNoteContent,
      payload: { id, content },
    });
  }
};

// Union type for all note actions
export type NoteAction =
  | ChangeActiveNoteAction
  | AddNewNoteAction
  | DeleteNoteAction
  | SaveNoteContentAction;
