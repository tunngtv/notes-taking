import { useSelector } from "react-redux";
import { useActions } from "./useActions";
import {
  changeActiveNote,
  addNewNote,
  deleteNote,
  saveNoteContent,
} from "../redux/actions/notes";
import { Note } from "../types/note";
import { RootState } from "../redux/store/store";

const useNotes = () => {
  const notes = useSelector((state: RootState) => state.notes);

  const actions = useActions({
    changeActiveNote,
    addNewNote,
    deleteNote,
    saveNoteContent,
  });

  const activeNote = notes.notes.find(
    (note: Note) => note.id === notes.activeNote
  );

  return { notes, activeNote, ...actions };
};

export default useNotes;
