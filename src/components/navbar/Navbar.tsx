import { useState } from "react";
import { useIsSmallDevice } from "../../hooks/useIsSmallDevice";
import { Button } from "../ui/button";
import Sidebar from "../sidebar/Sidebar.component";
import { CgMenu } from "react-icons/cg";
import styles from "./navbar.module.scss";
import { useAuth } from "../../contexts/AuthContext";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../ui/popover";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const onToggle = () => setOpen(!open);
  const isSmallDevice = useIsSmallDevice();

  const { user, signOut } = useAuth();

  return (
    <nav className={styles.navbar}>
      <div className="flex items-center gap-4">
        {!isSmallDevice && <Sidebar />}
        {isSmallDevice && (
          <div style={{ width: "auto" }}>
            <Button
              variant="ghost"
              style={{
                backgroundColor: "#2d3748",
                borderRadius: "0",
                color: "white",
              }}
              onClick={onToggle}
            >
              <CgMenu />
            </Button>
            {open ? <Sidebar setFlag={onToggle} /> : null}
          </div>
        )}
      </div>

      <div className="flex items-center gap-4 px-4">
        {user && (
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <div className="flex h-full w-full items-center justify-center rounded-full bg-blue-500 text-white font-bold">
                  {user.email?.[0].toUpperCase()}
                </div>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-56" align="end" forceMount>
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{user.email}</p>
                <p className="text-xs leading-none text-muted-foreground">
                  Signed in
                </p>
              </div>
              <Button
                variant="outline"
                className="mt-4 w-full"
                onClick={() => signOut()}
              >
                Log out
              </Button>
            </PopoverContent>
          </Popover>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
