import { useState, useEffect } from 'react';
import { Note } from '@/types/note';
import { useDebounce } from '@/hooks/useDebounce';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';

type NoteEditorProps = {
  note: Note;
  onUpdate: (note: Partial<Note>) => void;
};

export function NoteEditor({ note, onUpdate }: NoteEditorProps) {
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);

  const debouncedTitle = useDebounce(title, 500);
  const debouncedContent = useDebounce(content, 500);

  // Update local state when the selected note changes
  useEffect(() => {
    setTitle(note.title);
    setContent(note.content);
  }, [note.id, note.title, note.content]);

  // Call the update function when debounced values change
  useEffect(() => {
    if (debouncedTitle !== note.title || debouncedContent !== note.content) {
      onUpdate({ id: note.id, title: debouncedTitle, content: debouncedContent });
    }
  }, [debouncedTitle, debouncedContent, note.id, note.title, note.content, onUpdate]);

  return (
    <div className="flex h-full flex-col p-4 relative">
      <div className="pb-4">
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="text-2xl font-bold border-none focus-visible:ring-0 shadow-none p-0"
          placeholder="Note Title"
        />
      </div>
      <ScrollArea className="flex-grow">
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="h-full w-full resize-none border-none focus-visible:ring-0 shadow-none p-0 text-base"
          placeholder="Start writing your note here..."
        />
      </ScrollArea>
    </div>
  );
}