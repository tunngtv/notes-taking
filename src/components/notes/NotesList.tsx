import { useState } from 'react';
import { Note } from '@/types/note';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

type NotesListProps = {
  notes: Note[];
  currentNote: Note | undefined;
  onSelectNote: (id: string) => void;
  onAddNote: () => void;
  onDeleteNote: (id: string) => void;
  onSearch: (query: string) => void;
  onClearSearch: () => void;
  isLoading: boolean;
};

function NotesListSkeleton() {
  return (
    <div className="space-y-2">
      {[...Array(5)].map((_, i) => (
        <Card key={i}>
          <CardHeader className="p-4">
            <Skeleton className="h-5 w-3/4" />
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <Skeleton className="h-4 w-full" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export function NotesList({
  notes,
  currentNote,
  onSelectNote,
  onAddNote,
  onDeleteNote,
  onSearch,
  onClearSearch,
  isLoading,
}: NotesListProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query) {
      onSearch(query);
    } else {
      onClearSearch();
    }
  };

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between pb-4">
        <h1 className="text-2xl font-bold">Notes</h1>
        <Button onClick={onAddNote} size="sm">
          New Note
        </Button>
      </div>
      <div className="pb-4">
        <Input
          type="search"
          placeholder="Search notes..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>
      <ScrollArea className="flex-grow">
        {isLoading && notes.length === 0 ? (
          <NotesListSkeleton />
        ) : notes.length === 0 ? (
          <p className="text-muted-foreground text-center pt-8">No notes yet.</p>
        ) : (
          <div className="space-y-2">
            {notes.map((note) => (
              <Card
                key={note.id}
                className={cn(
                  'cursor-pointer hover:bg-muted/50',
                  currentNote?.id === note.id && 'bg-muted'
                )}
                onClick={() => onSelectNote(note.id)}
              >
                <CardHeader className="p-4">
                  <CardTitle className="text-lg truncate">{note.title}</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <p className="text-sm text-muted-foreground truncate">
                    {note.content || 'No content'}
                  </p>
                   <Button
                      variant="destructive"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteNote(note.id);
                      }}
                      className="mt-2"
                    >
                      Delete
                    </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </ScrollArea>
    </div>
  );
}

