import DeleteNoteButton from "../deleteNoteButton/DeleteNoteButton.component";
import CopyContentButton from "../copyContentButton/CopyContentButton.component";
import DownloadFileButton from "../downloadFileButton/DownloadFileButton.component";
import SaveChangesButton from "../saveChangesButton/SaveChangesButton.component";
import AboutButton from "../aboutButton/AboutButton.component";
import { useTheme } from "@/hooks/useTheme";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import {
  IoEyeOutline,
  IoEyeOffOutline,
  IoMoonOutline,
  IoSunnyOutline,
} from "react-icons/io5";
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
  currentView?: string;
}

const PanelsFooter = ({
  setView,
  IViews,
  doc,
  currentView,
}: PanelsFooterProps) => {
  const { ON, OFF, SPLITTED } = IViews;
  const { colorMode, toggleColorMode } = useTheme();

  // Determine if a button should be active based on the current view
  const isViewActive = (viewName: string) => currentView === viewName;

  return (
    <div
      className={`bg-muted dark:bg-muted flex justify-between items-center w-full ${styles.panelsFooter}`}
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
                onClick={toggleColorMode}
              >
                {colorMode === "dark" ? (
                  <IoSunnyOutline className="h-4 w-4" />
                ) : (
                  <IoMoonOutline className="h-4 w-4" />
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>
                {colorMode === "dark"
                  ? "Switch to light mode"
                  : "Switch to dark mode"}
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant={isViewActive(SPLITTED) ? "default" : "ghost"}
                size="icon"
                className={styles.panelsFooterIcon}
                onClick={() => setView(SPLITTED)}
              >
                <CgScan className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Show both editor and preview</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant={isViewActive(OFF) ? "default" : "ghost"}
                size="icon"
                className={styles.panelsFooterIcon}
                onClick={() => setView(OFF)}
              >
                <IoEyeOffOutline className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Show editor only</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant={isViewActive(ON) ? "default" : "ghost"}
                size="icon"
                className={styles.panelsFooterIcon}
                onClick={() => setView(ON)}
              >
                <IoEyeOutline className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Show preview only</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <AboutButton />
      </div>
    </div>
  );
};

export default PanelsFooter;
