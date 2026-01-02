import { useEffect, useState } from "react";

import styles from "./navigation.module.scss";
import Notes from "../notes/Notes.component";
import NavigationHeader from "../navigationHeader/NavigationHeader.component";
import useNotes from "../../hooks/useNotes";

const Navigation = ({ setFlag }: { setFlag?: (flag: boolean) => void }) => {
  const { notes } = useNotes();

  const [visibleNotes, setVisibleNotes] = useState(notes.notes);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (notes.notes) {
        setVisibleNotes(notes.notes);
      }
    }, 0);

    return () => clearTimeout(timer);
  }, [notes.notes]);

  return (
    <div className={styles.navigation}>
      <NavigationHeader setVisibleNotes={setVisibleNotes} />
      <Notes setFlag={setFlag} items={visibleNotes} />
    </div>
  );
};

export default Navigation;
