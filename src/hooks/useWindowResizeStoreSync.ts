import { useEffect } from "react";
import { useScreenStore } from "../store/useScreenStore";

export const useWindowResizeStoreSync = () => {
  const setScreenSize = useScreenStore((state) => state.setScreenSize);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleResize = () => {
      setScreenSize(window.innerWidth);
    };

    handleResize(); // 초기 실행
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [setScreenSize]);
};
