import React from "react";
import { animated, useSpring } from "react-spring";
import { useDrag } from "@use-gesture/react";
import styled from "styled-components";
import { colors } from "../../styles/theme";

interface MobileSlidingPanelProps {
  content?: React.ReactNode;
}

const MobileSlidingPanel: React.FC<MobileSlidingPanelProps> = ({ content }) => {
  const NAVBAR_HEIGHT = 100;
  const panelHeight =
    typeof window !== "undefined" ? window.innerHeight - NAVBAR_HEIGHT : 500;

  const MID_POSITION = panelHeight - 300;
  const FULLY_OPEN = 0;
  const FULLY_CLOSED = panelHeight;

  const [{ y }, api] = useSpring(() => ({
    y: FULLY_CLOSED,
    config: { tension: 100, friction: 25 },
  }));

  const togglePanel = () => {
    api.start({ y: y.get() === FULLY_CLOSED ? MID_POSITION : FULLY_CLOSED });
  };

  const bind = useDrag(
    ({ down, movement: [, my] }) => {
      if (down) {
        api.start({
          y: Math.max(FULLY_OPEN, Math.min(FULLY_CLOSED, y.get() + my)),
        });
      } else {
        const currentY = y.get();
        const target = getNearestSnapPoint(currentY);
        api.start({ y: target });
      }
    },
    { from: () => [0, y.get()] }
  );

  const getNearestSnapPoint = (currentY: number) => {
    const points = [FULLY_OPEN, MID_POSITION, FULLY_CLOSED];
    return points.reduce((prev, curr) =>
      Math.abs(curr - currentY) < Math.abs(prev - currentY) ? curr : prev
    );
  };

  const AnimatedPanel = animated(PanelBase);

  return (
    <MobileContainer>
      <AnimatedPanel
        style={{ transform: y.to((v) => `translateY(${v}px)`) }}
        {...bind()}
      >
        <SwipeBar onClick={togglePanel} />
        <MobileContent>{content}</MobileContent>
      </AnimatedPanel>
    </MobileContainer>
  );
};

const MobileContainer = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  z-index: 20;
`;

const PanelBase = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 100vh;
  background-color: ${colors.secondary};
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  touch-action: none;
`;

const SwipeBar = styled.div`
  width: 200px;
  height: 5px;
  background-color: #ccc;
  border-radius: 5px;
  margin: 10px auto;
  cursor: pointer; // 클릭 가능하게 변경
`;

const MobileContent = styled.div`
  padding: 20px;
  padding-bottom: 100px;
  color: white;
  overflow-y: auto;
`;

export default MobileSlidingPanel;
