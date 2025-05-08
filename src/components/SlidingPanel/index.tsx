import React from "react";
import DesktopSlidingPanel from "./DesktopSlidingPanel";
import MobileSlidingPanel from "./MobileSlidingPanel";
import { useScreenStore } from "../../store/useScreenStore";

interface SlidingPanelProps {
  // 공통으로 넘길 props가 있다면 정의
  content?: React.ReactNode;
  isOpen?: boolean; // 선택적
  onToggle?: () => void; // 선택적
  openToMobile?: "mid" | "full" | "closed";
}

const SlidingPanel: React.FC<SlidingPanelProps> = ({
  content,
  isOpen,
  onToggle,
  openToMobile,
}) => {
  const { isMobile } = useScreenStore();

  return isMobile ? (
    <MobileSlidingPanel content={content} openTo={openToMobile} />
  ) : (
    <DesktopSlidingPanel
      content={content}
      isOpen={isOpen}
      onToggle={onToggle}
    />
  );
};

export default SlidingPanel;
