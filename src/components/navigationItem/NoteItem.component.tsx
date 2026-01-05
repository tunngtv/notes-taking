import useNotes from "../../hooks/useNotes";
import type { Note } from "../../types/note";
import { Badge } from "../ui/badge";

interface NoteProps {
  data: Note;
}

const NoteItem = ({ data }: NoteProps) => {
  const { notes, changeActiveNote } = useNotes();

  const { title, tags, id } = data;
  const isActive = notes.activeNote === id;

  return (
    <li>
      <button
        className={`w-full text-left transition-colors break-words border-b border-border ${
          isActive ? "bg-accent" : "hover:bg-accent"
        }`}
        onClick={() => {
          if (notes.activeNote === id) return;
          changeActiveNote(id);
        }}
      >
        <div className="p-3">
          <b className="block truncate">{title}</b>
          <div className="mt-2 flex flex-wrap gap-1">
            {tags.map(
              (tag: { title: string; color: string }, index: number) => (
                <Badge
                  key={index}
                  style={{ backgroundColor: tag.color, color: "white" }}
                  className="text-xs"
                >
                  {tag.title}
                </Badge>
              )
            )}
          </div>
        </div>
      </button>
    </li>
  );
};

export default NoteItem;
