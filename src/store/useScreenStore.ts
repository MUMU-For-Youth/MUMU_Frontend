import { create } from "zustand";
import { breakpoints } from "../styles/theme";

interface ScreenState {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  setScreenSize: (width: number) => void;
}

const md = parseInt(breakpoints.md);
const lg = parseInt(breakpoints.lg);

const getScreenState = (width: number): Omit<ScreenState, "setScreenSize"> => ({
  isMobile: width <= md,
  isTablet: width > md && width <= lg,
  isDesktop: width > lg,
});

export const useScreenStore = create<ScreenState>((set) => {
  // SSR-safe 초기값
  const initialWidth = typeof window !== "undefined" ? window.innerWidth : 1024;

  return {
    ...getScreenState(initialWidth),
    setScreenSize: (width: number) => set(getScreenState(width)),
  };
});
