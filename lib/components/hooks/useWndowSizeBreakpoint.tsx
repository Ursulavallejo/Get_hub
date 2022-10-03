import { useState, useEffect } from "react";

export type Size = {
  width: number | undefined;
  height: number | undefined;
};

export const useWindowSizeBreakpoint = (): number => {
  const [oldWidth, setOldWidth] = useState<number>(0);
  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      const w = window.innerWidth;
      if (oldWidth === 0) {
        setOldWidth(w);
      } else if (w < 768 && oldWidth >= 768) {
        setOldWidth(w);
      } else if (w > 768 && w < 1024 && (oldWidth <= 768 || oldWidth >= 1024)) {
        setOldWidth(w);
      } else if (
        w > 1024 &&
        w < 1336 &&
        (oldWidth <= 1024 || oldWidth >= 1336)
      ) {
        setOldWidth(w);
      } else if (
        w > 1336 &&
        w < 1639 &&
        (oldWidth <= 1336 || oldWidth >= 1639)
      ) {
        setOldWidth(w);
      } else if (w > 1639 && oldWidth <= 1639) {
        setOldWidth(w);
      }
    }
    // Add event listener
    window.addEventListener("resize", handleResize);
    // Call handler right away so state gets updated with initial window size
    handleResize();
    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, [oldWidth]);
  return oldWidth;
};
