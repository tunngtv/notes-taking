import useNotes from "../../hooks/useNotes";
import type { Note } from "../../types/note";
import styles from "./note-item.module.scss";

interface NoteProps {
  data: Note;
}

const Note = ({ data }: NoteProps) => {
  const { notes, changeActiveNote } = useNotes();

  const { title, tags, id } = data;

  const isSelected = () => {
    if (notes.activeNote === id) {
      return styles.selectedNote;
    }

    return styles.note;
  };

  return (
    <li>
      <button
        style={{ backgroundColor: "#4a5568" }}
        className={isSelected()}
        onClick={() => changeActiveNote(id)}
      >
        <b>{title}</b>
        <div style={{ marginTop: "0.75rem" }}>
          {tags.map((tag: { title: string; color: string }, index: number) => (
            <span
              key={index}
              style={{
                backgroundColor: `${tag.color}.500`,
                color: "white",
                padding: "0.25rem 0.5rem",
                borderRadius: "0.375rem",
                marginRight: "0.25rem",
                fontSize: "0.75rem",
              }}
            >
              {tag.title}
            </span>
          ))}
        </div>
      </button>
    </li>
  );
};

export default Note;
