import React, { useState } from "react";
import OpenArrowIcon from "../../assets/icons/OpenArrowIcon.svg";
import CloseArrowIcon from "../../assets/icons/CloseArrowIcon.svg";
import styled from "styled-components";
import { colors } from "../../styles/theme";

interface DesktopSlidingPanelProps {
  content?: React.ReactNode;
}

const DesktopSlidingPanel: React.FC<DesktopSlidingPanelProps> = ({
  content,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Wrapper>
      <PanelContainer isOpen={isOpen}>
        <Content>{content}</Content>
      </PanelContainer>
      <PanelToggle isOpen={isOpen} onClick={() => setIsOpen(!isOpen)}>
        <img src={isOpen ? CloseArrowIcon : OpenArrowIcon} />
      </PanelToggle>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
`;

const PanelContainer = styled.div<{ isOpen: boolean }>`
  width: 350px;
  height: 100vh;
  background-color: ${colors.secondary};
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
  position: absolute;
  top: 0;
  left: ${({ isOpen }) => (isOpen ? "0" : "-350px")};
  transition: left 0.3s ease;
  z-index: 5;
`;

const PanelToggle = styled.button<{ isOpen: boolean }>`
  position: absolute;
  top: 50%;
  left: ${({ isOpen }) => (isOpen ? "350px" : "0")};
  transform: translateY(-50%);
  width: 35px;
  height: 85px;
  background-color: white;
  border: none;
  border-radius: 0 20px 20px 0;
  box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: left 0.3s ease;
`;

const Content = styled.div`
  padding: 20px;
  color: white;
`;

export default DesktopSlidingPanel;
