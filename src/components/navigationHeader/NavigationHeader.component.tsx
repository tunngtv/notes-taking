import { Button } from "../ui/button";
import { BsPencilSquare } from "react-icons/bs";

import SearchTask from "../searchTask/SearchTask.component";
import AddTaskModal from "../addTaskModal/AddTaskModal.component";

import navigationHeader from "./navigation-header.module.scss";

import { Dispatch, SetStateAction } from "react";
import { Note } from "../../types/note";
import useDisclosure from "../../hooks/useDisclosure";

interface NavigationHeaderProps {
  setVisibleNotes: Dispatch<SetStateAction<Note[]>>;
}

const NavigationHeader = ({ setVisibleNotes }: NavigationHeaderProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div className={navigationHeader.navigationHeader}>
      <h2 style={{ fontSize: "1.5rem", marginBottom: "0.75rem" }}>Notes</h2>
      <div style={{ display: "flex" }}>
        <SearchTask setVisibleNotes={setVisibleNotes} />
        <Button
          style={{ padding: "1rem", borderRadius: "0" }}
          onClick={onOpen}
        >
          <BsPencilSquare />
        </Button>
        <AddTaskModal
          isOpen={isOpen}
          onClose={onClose}
          setVisibleNotes={setVisibleNotes}
        />
      </div>
    </div>
  );
};

export default NavigationHeader;
