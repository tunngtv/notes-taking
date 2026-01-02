import { useState } from 'react';
import useNotes from '../../hooks/useNotes';

import { Button } from '@/components/ui/button';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip';

import { IoSaveOutline } from 'react-icons/io5';

interface SaveChangesButtonProps {
    document: string;
}

const SaveChangesButton = ({ document }: SaveChangesButtonProps) => {
    const { saveNoteContent, activeNote } = useNotes();
    const [isSaving, setIsSaving] = useState(false);

    const saveNote = async () => {
        if (activeNote) {
            setIsSaving(true);
            
            // Simulate saving (in a real app, you would handle this differently)
            saveNoteContent(activeNote.id, document.toString());
            
            // Show a simple notification using browser API
            if ('Notification' in window && Notification.permission === 'granted') {
                new Notification('Changes saved!!');
            } else if ('Notification' in window && Notification.permission !== 'denied') {
                const permission = await Notification.requestPermission();
                if (permission === 'granted') {
                    new Notification('Changes saved!!');
                }
            }
            
            // Alternative: console log for now
            console.log('Changes saved!!');
            
            setIsSaving(false);
        }
    };

    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button
                        disabled={isSaving}
                        variant="outline"
                        size="icon"
                        onClick={saveNote}
                        className="border-none rounded-none focus:ring-0 focus:ring-offset-0"
                    >
                        <IoSaveOutline className="h-4 w-4" />
                    </Button>
                </TooltipTrigger>
                <TooltipContent>
                    <p>Save changes</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
};

export default SaveChangesButton;