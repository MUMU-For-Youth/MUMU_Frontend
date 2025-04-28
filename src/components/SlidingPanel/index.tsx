import React from "react";
import DesktopSlidingPanel from "./DesktopSlidingPanel";
import MobileSlidingPanel from "./MobileSlidingPanel";
import { useScreenStore } from "../../store/useScreenStore";

interface SlidingPanelProps {
  // 공통으로 넘길 props가 있다면 정의
  content?: React.ReactNode;
}

const SlidingPanel: React.FC<SlidingPanelProps> = ({ content }) => {
  const { isMobile } = useScreenStore();

  return isMobile ? (
    <MobileSlidingPanel content={content} />
  ) : (
    <DesktopSlidingPanel content={content} />
  );
};

export default SlidingPanel;
