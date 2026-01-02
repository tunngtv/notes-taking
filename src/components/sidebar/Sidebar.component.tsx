import { useState } from "react";
import { Button } from "../ui/button";
import Navigation from "../navigation/Navigation.component";
import { CgChevronDoubleLeft, CgChevronDoubleRight } from "react-icons/cg";
import styles from "./sidebar.module.scss";

type SidebarProps = {
  setFlag?: () => void;
};

const Sidebar = ({ setFlag }: SidebarProps) => {
  const [open, setOpen] = useState(true);
  const onToggle = () => setOpen(!open);

  return (
    <div
      style={{ backgroundColor: "#4a5568" }}
      className={
        open ? `${styles.sidebar} ${styles.openSidebar}` : styles.sidebar
      }
    >
      {open ? <Navigation setFlag={setFlag} /> : null}
      <Button
        variant="secondary"
        className={styles.sidebarButton}
        style={{ color: "#fff", borderRadius: "0", height: "100%" }}
        onClick={onToggle}
      >
        {open ? <CgChevronDoubleLeft /> : <CgChevronDoubleRight />}
      </Button>
    </div>
  );
};

export default Sidebar;
