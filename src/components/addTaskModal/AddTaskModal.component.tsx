import { useRef, useState } from "react";
import useNotes from "../../hooks/useNotes";
import { generateUUID } from "../../utils/uuid";

import TagIntegrator from "../tagIntegrator/TagIntegrator.component";

import { Note } from "../../types/note";
import { Tag } from "../../types/tag";

import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../ui/dialog";

// Removed unused imports
interface AddTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  setVisibleNotes: (notes: Note[]) => void;
}

const AddTaskModal = ({
  isOpen,
  onClose,
  setVisibleNotes,
}: AddTaskModalProps) => {
  const { notes } = useNotes();

  const { addNewNote } = useNotes();
  const [tags, setTags] = useState<Tag[]>([]);
  const input = useRef<HTMLInputElement>(null);

  const addNote = (event: React.FormEvent) => {
    event.preventDefault();

    const noteTitle = input.current?.value;

    if (!noteTitle?.trim().length || !tags.length) {
      alert("You need to enter a title and at least one tag.");
      return;
    }

    const newNote = {
      content: `# ${noteTitle}`,
      id: generateUUID(),
      tags: tags,
      title: noteTitle,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    addNewNote(newNote);

    setVisibleNotes([...notes.notes, newNote]);

    if (input.current) {
      input.current.value = "";
    }
    setTags([]);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create a new note</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="note-title" className="text-sm font-medium">
              Title
            </label>
            <div className="col-span-4">
              <input
                ref={input}
                id="note-title"
                type="text"
                placeholder="Note title"
                spellCheck={false}
                className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <label className="text-sm font-medium">Tags</label>
            <div className="col-span-4">
              <TagIntegrator tags={tags} setTags={setTags} />
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="h-10"
          >
            Cancel
          </Button>
          <Button type="button" onClick={addNote} className="h-10">
            Create
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddTaskModal;
