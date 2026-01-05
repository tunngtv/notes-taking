import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { CgExternal } from "react-icons/cg";

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AboutModal = ({ isOpen, onClose }: AboutModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>About</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <h4 className="text-md font-medium mb-2">Markdown resources</h4>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <a
                href="https://www.markdownguide.org/basic-syntax/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Learn the basic Syntax
              </a>
            </li>
            <li>
              <a
                href="https://www.markdownguide.org/extended-syntax/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Learn the extended Syntax
              </a>
            </li>
          </ul>
          <hr className="my-3" />
          <a
            className="flex items-center text-primary hover:underline"
            href="https://github.com/tunngtv/notes-taking.git"
            target="_blank"
            rel="noopener noreferrer"
          >
            Project source code{" "}
            <CgExternal style={{ marginTop: "3px", marginLeft: "4px" }} />
          </a>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AboutModal;
