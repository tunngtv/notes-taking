import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { IoHelpCircleOutline } from "react-icons/io5";
import AboutModal from "../aboutModal/AboutModal.component.tsx";

const AboutButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            onClick={onOpen}
            className="border-none rounded-none bg-gray-700 focus:ring-0 focus:ring-offset-0"
          >
            <IoHelpCircleOutline className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>About</p>
        </TooltipContent>
      </Tooltip>
      <AboutModal isOpen={isOpen} onClose={onClose} />
    </TooltipProvider>
  );
};

export default AboutButton;
