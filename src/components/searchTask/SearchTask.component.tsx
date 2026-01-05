import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { IoSearchOutline } from "react-icons/io5";
import useNotes from "../../hooks/useNotes";

import { Dispatch, SetStateAction } from "react";
import { Note } from "../../types/note";

interface SearchTaskProps {
  setVisibleNotes: Dispatch<SetStateAction<Note[]>>;
}

const SearchTask = ({ setVisibleNotes }: SearchTaskProps) => {
  const { notes } = useNotes();
  const [search, setSearch] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    const results = notes.notes.filter(note =>
      note.title.toLowerCase().includes(search.toLowerCase())
    );

    setVisibleNotes(results);
  }, [search, notes.notes, setVisibleNotes]);

  return (
    <div
      style={{ position: "relative", display: "flex", alignItems: "center" }}
    >
      <IoSearchOutline
        className="text-muted-foreground absolute left-3 z-10"
        style={{ top: "50%", transform: "translateY(-50%)" }}
      />
      <Input
        value={search}
        placeholder="Search"
        style={{ paddingLeft: "35px" }}
        onChange={handleChange}
        className="rounded-none"
      />
    </div>
  );
};

export default SearchTask;
