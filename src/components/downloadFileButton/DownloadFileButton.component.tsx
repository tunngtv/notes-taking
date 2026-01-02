import { Button } from '@/components/ui/button';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip';
import useNotes from '../../hooks/useNotes';

import { CgSoftwareDownload } from 'react-icons/cg';

interface DownloadFileButtonProps {
    document: string;
}

const DownloadFileButton = ({ document: doc }: DownloadFileButtonProps) => {
    const { activeNote } = useNotes();

    const handleDownload = () => {
        const mdArchive = new Blob([doc.toString()], { type: 'text/plain' });
        const downloadMdArchive = window.URL.createObjectURL(mdArchive);
        
        const link = window.document.createElement('a');
        link.href = downloadMdArchive;
        link.download = `${activeNote?.title || 'untitled'}.md`;
        window.document.body.appendChild(link);
        link.click();
        window.document.body.removeChild(link);
        window.URL.revokeObjectURL(downloadMdArchive);
    };

    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={handleDownload}
                        className="border-none rounded-none bg-gray-700 focus:ring-0 focus:ring-offset-0"
                    >
                        <CgSoftwareDownload className="h-4 w-4" />
                    </Button>
                </TooltipTrigger>
                <TooltipContent>
                    <p>Download .md file</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
};

export default DownloadFileButton;