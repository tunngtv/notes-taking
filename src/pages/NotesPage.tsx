import { useNotes } from "@/hooks/useNotes";
import { NotesList } from "@/components/notes/NotesList";
import { NoteEditor } from "@/components/notes/NoteEditor";
import { MarkdownPreview } from "@/components/notes/MarkdownPreview";
import {
  ResizablePanel,
  ResizablePanelGroup,
  ResizableHandle,
} from "@/components/ui/resizable";

export function NotesPage() {
  const {
    notes,
    currentNote,
    isLoading,
    error,
    addNote,
    deleteNote,
    selectNote,
    updateNote,
    searchNotes,
    loadNotes,
  } = useNotes();

  if (error) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-red-500">Error: {error.message}</div>
      </div>
    );
  }

  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="h-full items-stretch"
    >
      <ResizablePanel defaultSize={25} minSize={150} maxSize={250}>
        <div className="h-full p-4">
          <NotesList
            notes={notes}
            currentNote={currentNote}
            onSelectNote={selectNote}
            onAddNote={addNote}
            onDeleteNote={deleteNote}
            onSearch={searchNotes}
            onClearSearch={loadNotes}
            isLoading={isLoading}
          />
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={75}>
        {currentNote ? (
          <ResizablePanelGroup direction="vertical">
            <ResizablePanel defaultSize={50} minSize={30}>
              <NoteEditor note={currentNote} onUpdate={updateNote} />
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={50} minSize={30}>
              <MarkdownPreview content={currentNote.content} />
            </ResizablePanel>
          </ResizablePanelGroup>
        ) : (
          <div className="flex h-full items-center justify-center text-muted-foreground">
            {isLoading ? (
              <p>Loading notes...</p>
            ) : (
              <p>Select a note to view or create a new one.</p>
            )}
          </div>
        )}
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}

export default NotesPage;
