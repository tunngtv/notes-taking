import NoteItem from "../navigationItem/NoteItem.component";
import type { Note as NoteType } from "../../types/note";

import styles from "./notes.module.scss";

interface NotesProps {
  setFlag?:
    | (() => void)
    | ((flag: boolean) => void)
    | { toggle: () => void }
    | undefined;
  items: NoteType[];
}

const Notes = ({ setFlag, items }: NotesProps) => {
  return (
    <ul
      className={styles.notes}
      onClick={() => {
        if (typeof setFlag === "function") {
          // Handle function that takes no arguments or function that takes a boolean
          (setFlag as () => void)();
        } else if (
          setFlag &&
          typeof setFlag === "object" &&
          "toggle" in setFlag
        ) {
          // Handle object with toggle method
          setFlag.toggle();
        }
      }}
    >
      {items.map((item: NoteType, index: number) => (
        <NoteItem data={item} key={index} />
      ))}
    </ul>
  );
};

export default Notes;
