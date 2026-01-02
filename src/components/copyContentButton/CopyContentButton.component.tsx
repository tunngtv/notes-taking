import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { CgCopy, CgCheckO } from "react-icons/cg";

interface CopyContentButtonProps {
  document: string;
}

const CopyContentButton = ({ document }: CopyContentButtonProps) => {
  const [hasCopied, setHasCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(document.toString());
      setHasCopied(true);
      setTimeout(() => setHasCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            onClick={handleCopy}
            className="border-none rounded-none bg-gray-700 focus:ring-0 focus:ring-offset-0"
          >
            {hasCopied ? (
              <CgCheckO className="h-4 w-4 text-green-50" />
            ) : (
              <CgCopy className="h-4 w-4" />
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Copy content to clipboard</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default CopyContentButton;
