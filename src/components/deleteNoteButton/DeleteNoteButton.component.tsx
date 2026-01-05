import { useState } from "react";
import useNotes from "../../hooks/useNotes";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { CgTrash } from "react-icons/cg";

const DeleteNoteButton = () => {
  const { notes, deleteNote } = useNotes();

  const [isOpen, setIsOpen] = useState(false);

  const deleteActiveNote = () => {
    setIsOpen(false);
    deleteNote(notes.activeNote.toString());
  };

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  return (
    <>
      {notes.notes.length > 1 ? (
        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              onClick={handleOpen}
              className="border-none rounded-none focus:ring-0 focus:ring-offset-0"
            >
              <CgTrash className="h-4 w-4 text-red-600 dark:text-red-400" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-4">
            <div className="flex flex-col space-y-3">
              <div className="text-red-500 font-medium">
                Are you sure you want to delete it?
              </div>
              <div className="flex space-x-2 justify-around">
                <Button variant="destructive" onClick={deleteActiveNote}>
                  Delete note
                </Button>
                <Button variant="outline" onClick={handleClose}>
                  Cancel
                </Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      ) : null}
    </>
  );
};

export default DeleteNoteButton;
