import { useState } from "react";
import { useIsSmallDevice } from "../../hooks/useIsSmallDevice";
import { Button } from "../ui/button";
import Sidebar from "../sidebar/Sidebar.component";
import { CgMenu } from "react-icons/cg";
import styles from "./navbar.module.scss";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const onToggle = () => setOpen(!open);
  const isSmallDevice = useIsSmallDevice();

  return (
    <nav className={styles.navbar}>
      {!isSmallDevice ? (
        <Sidebar />
      ) : (
        <div style={{ width: "100vw" }}>
          <div style={{ backgroundColor: "#2d3748", width: "100%", height: "100%" }}>
            <Button
              variant="ghost"
              style={{ backgroundColor: "#2d3748", borderRadius: "0", color: "white" }}
              onClick={onToggle}
            >
              <CgMenu />
            </Button>
          </div>
          {open ? <Sidebar setFlag={onToggle} /> : null}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
