import { useRef, useState } from "react";

import useNotes from "../../hooks/useNotes";

import TagIntegrator from "../tagIntegrator/TagIntegrator.component";

import { Note } from "../../types/note";
import { Tag } from "../../types/tag";

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
      id: `note_${Date.now()}`, // Convert to string
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
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/50" onClick={onClose}></div>
      <div className="relative bg-white rounded-lg shadow-lg max-w-lg w-full mx-4 p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Create a new note</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            &times;
          </button>
        </div>

        {/* <form onSubmit={addNote} className="mb-4"> */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Title</label>
          <input
            ref={input}
            type="text"
            placeholder="Note title"
            spellCheck={false}
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Tags</label>
          <TagIntegrator tags={tags} setTags={setTags} />
        </div>
        {/* </form> */}

        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium border rounded"
          >
            Cancel
          </button>
          <button
            type="submit"
            onClick={addNote}
            className="px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTaskModal;
