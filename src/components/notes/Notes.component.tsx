import NoteItem from "../navigationItem/NoteItem.component";
import type { Note as NoteType } from "../../types/note";
import { Skeleton } from "../../components/ui/skeleton";

interface NotesProps {
  setFlag?:
    | (() => void)
    | ((flag: boolean) => void)
    | { toggle: () => void }
    | undefined;
  items: NoteType[];
  isLoading?: boolean;
}

const Notes = ({ setFlag, items, isLoading = false }: NotesProps) => {
  if (isLoading) {
    return (
      <ul className="overflow-auto flex-1 p-2">
        {Array.from({ length: 5 }).map((_, index) => (
          <li key={index} className="p-1">
            <div className="w-full text-left rounded-md bg-muted hover:bg-accent">
              <div className="p-3">
                <Skeleton className="h-5 w-3/4 mb-2" />
                <div className="flex flex-wrap gap-1">
                  <Skeleton className="h-4 w-12" />
                  <Skeleton className="h-4 w-16" />
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <ul
      className="overflow-auto flex-1"
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
