import React, { useState } from "react";
import OpenArrowIcon from "../../assets/icons/OpenArrowIcon.svg";
import CloseArrowIcon from "../../assets/icons/CloseArrowIcon.svg";
import styled from "styled-components";
import { colors } from "../../styles/theme";

interface DesktopSlidingPanelProps {
  content?: React.ReactNode;
}

// 패널과 토글 버튼의 너비 상수
const PANEL_WIDTH = 420;
const TOGGLE_WIDTH = 35;

const DesktopSlidingPanel: React.FC<DesktopSlidingPanelProps> = ({
  content,
}) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Wrapper isOpen={isOpen}>
      <PanelContainer isOpen={isOpen}>
        <Content>{content}</Content>
      </PanelContainer>
      <PanelToggle
        isOpen={isOpen}
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "패널 닫기" : "패널 열기"}
      >
        <img src={isOpen ? CloseArrowIcon : OpenArrowIcon} alt="" />
      </PanelToggle>
    </Wrapper>
  );
};

// 패널 전체 영역. 패널이 닫힐 때 토글버튼이 완전히 보이도록 width 조정
const Wrapper = styled.div<{ isOpen: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  width: ${({ isOpen }) =>
    isOpen ? `${PANEL_WIDTH + TOGGLE_WIDTH / 2}px` : `${TOGGLE_WIDTH}px`};
  z-index: 20;
  pointer-events: none;
`;

// 실제 패널 영역. 닫힐 때 왼쪽으로 숨김
const PanelContainer = styled.div<{ isOpen: boolean }>`
  width: ${PANEL_WIDTH}px;
  height: 100vh;
  background-color: ${colors.secondary};
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
  position: absolute;
  top: 0;
  left: 0;
  transform: ${({ isOpen }) =>
    isOpen ? "translateX(0)" : `translateX(-${PANEL_WIDTH}px)`};
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 21;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  pointer-events: auto;
  overflow: visible;
`;

// 토글 버튼. 패널의 오른쪽 바깥에 위치
const PanelToggle = styled.button<{ isOpen: boolean }>`
  position: absolute;
  top: 50%;
  left: ${({ isOpen }) => (isOpen ? `${PANEL_WIDTH}px` : `0`)};
  transform: translateY(-50%);
  width: ${TOGGLE_WIDTH}px;
  height: 85px;
  background-color: white;
  border: none;
  border-radius: 0 20px 20px 0;
  box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  z-index: 22;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: left 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  pointer-events: auto;
`;

// 패널 내부 컨텐츠 영역
const Content = styled.div`
  padding: 0;
  justify-content: center;
  align-items: center;
  flex: 1 auto;
  overflow-y: auto;
  min-width: 0;
  min-height: 0;
  display: flex;
  flex-direction: column;

  /* 스크롤바 숨기기 (크로스 브라우저) */
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
}
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
  }
`;

export default DesktopSlidingPanel;
