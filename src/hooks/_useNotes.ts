import { useState, useEffect, useCallback } from "react";
import { Note } from "@/types/note";
import notesRepository from "@/db/notesRepository";

type SavingStatus = "idle" | "saving" | "saved" | "error";

export function useNotes() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [currentNoteId, setCurrentNoteId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [savingStatus, setSavingStatus] = useState<SavingStatus>("idle");

  const loadNotes = useCallback(async () => {
    setIsLoading(true);
    try {
      const allNotes = await notesRepository.getAllNotes();
      setNotes(allNotes);
      if (allNotes.length > 0) {
        setCurrentNoteId(allNotes[0].id);
      } else {
        setCurrentNoteId(null);
      }
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to load notes"));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadNotes();
  }, [loadNotes]);

  const addNote = useCallback(async () => {
    const newNote = await notesRepository.createNote(); // Create note first to get ID
    setNotes(prevNotes => [newNote, ...prevNotes]);
    setCurrentNoteId(newNote.id);

    // This is not truly optimistic as we wait for the DB, but provides instant UI feedback after creation.
    // A fully optimistic approach would generate a temporary ID, which adds complexity.
  }, []);

  const updateNote = useCallback(
    async (noteToUpdate: Partial<Note>) => {
      if (!noteToUpdate.id) return;
      setSavingStatus("saving");

      const originalNotes = notes;
      // Optimistically update the UI
      const updatedNoteFromUI = {
        ...originalNotes.find(n => n.id === noteToUpdate.id)!,
        ...noteToUpdate,
        updatedAt: Date.now(),
      };

      const newNotes = originalNotes.map(n =>
        n.id === updatedNoteFromUI.id ? updatedNoteFromUI : n
      );
      const sortedNotes = newNotes.sort((a, b) => b.updatedAt - a.updatedAt);
      setNotes(sortedNotes);

      try {
        await notesRepository.updateNote(noteToUpdate);
        setSavingStatus("saved");
      } catch (err) {
        setNotes(originalNotes); // Revert on failure
        setError(
          err instanceof Error ? err : new Error("Failed to update note")
        );
        setSavingStatus("error");
      } finally {
        setTimeout(() => setSavingStatus("idle"), 2000); // Reset status after 2s
      }
    },
    [notes]
  );

  const deleteNote = useCallback(
    async (id: string) => {
      const originalNotes = notes;

      // Optimistically remove from UI
      const remainingNotes = originalNotes.filter(n => n.id !== id);
      if (currentNoteId === id) {
        setCurrentNoteId(
          remainingNotes.length > 0 ? remainingNotes[0].id : null
        );
      }
      setNotes(remainingNotes);

      try {
        await notesRepository.deleteNote(id);
      } catch (err) {
        setNotes(originalNotes); // Revert on failure
        setError(
          err instanceof Error ? err : new Error("Failed to delete note")
        );
      }
    },
    [currentNoteId, notes]
  );

  const searchNotes = useCallback(async (query: string) => {
    setIsLoading(true);
    try {
      const foundNotes = await notesRepository.searchNotes(query);
      setNotes(foundNotes);
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error("Failed to search notes")
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  const selectNote = useCallback((id: string | null) => {
    setCurrentNoteId(id);
  }, []);

  const currentNote = notes.find(note => note.id === currentNoteId);

  return {
    notes,
    currentNote,
    isLoading,
    error,
    savingStatus,
    loadNotes,
    addNote,
    updateNote,
    deleteNote,
    searchNotes,
    selectNote,
  };
}
