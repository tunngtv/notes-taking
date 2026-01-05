import DeleteNoteButton from "../deleteNoteButton/DeleteNoteButton.component";
import CopyContentButton from "../copyContentButton/CopyContentButton.component";
import DownloadFileButton from "../downloadFileButton/DownloadFileButton.component";
import SaveChangesButton from "../saveChangesButton/SaveChangesButton.component";
import AboutButton from "../aboutButton/AboutButton.component";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { CgScan } from "react-icons/cg";

import styles from "./panels-footer.module.scss";

interface IViews {
  ON: string;
  OFF: string;
  SPLITTED: string;
}

interface PanelsFooterProps {
  setView: (view: string) => void;
  IViews: IViews;
  doc: string;
}

const PanelsFooter = ({ setView, IViews, doc }: PanelsFooterProps) => {
  const { ON, OFF, SPLITTED } = IViews;

  return (
    <div
      className={`bg-gray-700 dark:bg-gray-700 flex justify-between items-center w-full ${styles.panelsFooter}`}
    >
      <div className="flex items-center">
        <DeleteNoteButton />
        <CopyContentButton document={doc} />
        <DownloadFileButton document={doc} />
        <SaveChangesButton document={doc} />
      </div>
      <div className="flex items-center">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className={styles.panelsFooterIcon}
                onClick={() => setView(SPLITTED)}
              >
                <CgScan className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Toggle views</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className={styles.panelsFooterIcon}
                onClick={() => setView(OFF)}
              >
                <IoEyeOffOutline className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Hide preview</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className={styles.panelsFooterIcon}
                onClick={() => setView(ON)}
              >
                <IoEyeOutline className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Hide editor</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <AboutButton />
      </div>
    </div>
  );
};

export default PanelsFooter;
