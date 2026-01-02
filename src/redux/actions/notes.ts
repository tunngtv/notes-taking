import types from '../types/types';
import { Note } from '../../types/note';
import { Action } from 'redux';

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

export const addNewNote = (note: Note): AddNewNoteAction => ({
    type: types.notesAddNewNote,
    payload: note,
});

export const deleteNote = (id: string): DeleteNoteAction => ({
    type: types.notesDeleteNote,
    payload: id,
});

export const saveNoteContent = (id: string, content: string): SaveNoteContentAction => ({
    type: types.notesSaveNoteContent,
    payload: { id, content },
});

// Union type for all note actions
export type NoteAction =
  | ChangeActiveNoteAction
  | AddNewNoteAction
  | DeleteNoteAction
  | SaveNoteContentAction;
