import React, { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { store } from "@/redux/store/store";
import { useAuth } from "@/contexts/AuthContext";
import { notesService } from "@/services/notesService";
import { initialNote } from "@/data/initial-note";

interface AsyncReduxProviderProps {
  children: React.ReactNode;
}

const AsyncReduxProvider: React.FC<AsyncReduxProviderProps> = ({
  children,
}) => {
  const [isInitialized, setIsInitialized] = useState(false);
  const { session, loading: authLoading } = useAuth();

  useEffect(() => {
    const initializeStore = async () => {
      if (authLoading) return;

      try {
        let notes = [];
        if (session) {
          const dbNotes = await notesService.getNotes();
          notes = dbNotes || [];
        }

        // Always ensure initialNote is present at the beginning
        // We filter out any potential duplicates of the initial note if it was already saved in DB
        const finalNotes = [
          initialNote,
          ...notes.filter((n) => n.id !== initialNote.id),
        ];

        store.dispatch({
          type: "RESET_STATE",
          payload: {
            notes: {
              notes: finalNotes,
              activeNote: finalNotes[0].id,
            },
          },
        });
      } catch (error) {
        console.error("Failed to initialize store:", error);
      } finally {
        setIsInitialized(true);
      }
    };

    initializeStore();
  }, [session, authLoading]);

  if (!isInitialized) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-500"></div>
      </div>
    );
  }

  return <Provider store={store}>{children}</Provider>;
};

export default AsyncReduxProvider;
