import { useLayoutEffect, useState } from "react";

export function useIsSmallDevice() {
  const [isSmallDevice, setIsSmallDevice] = useState(false);

  useLayoutEffect(() => {
    function updateSize() {
      setIsSmallDevice(window.innerWidth < 1100);
    }

    window.addEventListener("resize", updateSize);
    updateSize();

    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return isSmallDevice;
}
