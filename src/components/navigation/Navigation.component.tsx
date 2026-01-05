import { useEffect, useState } from "react";

import styles from "./navigation.module.scss";
import Notes from "../notes/Notes.component";
import NavigationHeader from "../navigationHeader/NavigationHeader.component";
import useNotes from "../../hooks/useNotes";

const Navigation = ({ setFlag }: { setFlag?: (flag: boolean) => void }) => {
  const { notes } = useNotes();

  const [visibleNotes, setVisibleNotes] = useState(notes.notes);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Set loading to false after a short delay to simulate loading
    const timer = setTimeout(() => {
      if (notes.notes) {
        setVisibleNotes(notes.notes);
        setIsLoading(false);
      }
    }, 300); // Adding a small delay to show the skeleton loading

    return () => clearTimeout(timer);
  }, [notes.notes]);

  return (
    <div className={styles.navigation}>
      <NavigationHeader setVisibleNotes={setVisibleNotes} />
      <hr />
      <Notes setFlag={setFlag} items={visibleNotes} isLoading={isLoading} />
    </div>
  );
};

export default Navigation;
