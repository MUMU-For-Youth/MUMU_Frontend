import React, { useEffect, useState } from "react";
import { animated, useSpring } from "react-spring";
import { useDrag } from "@use-gesture/react";
import styled from "styled-components";
import { colors } from "../../styles/theme";

interface MobileSlidingPanelProps {
  content?: React.ReactNode;
  openTo?: "mid" | "full" | "closed";
}

const MobileSlidingPanel: React.FC<MobileSlidingPanelProps> = ({
  content,
  openTo,
}) => {
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

  const [internalOpen, setInternalOpen] = useState(false);
  const controlled = openTo !== undefined;

  const getTargetY = (position: "mid" | "full" | "closed") => {
    switch (position) {
      case "mid":
        return MID_POSITION;
      case "full":
        return FULLY_OPEN;
      case "closed":
      default:
        return FULLY_CLOSED;
    }
  };

  const openY = internalOpen ? MID_POSITION : FULLY_CLOSED;

  useEffect(() => {
    api.start({ y: openY });
  }, [openY]);

  useEffect(() => {
    if (openTo) {
      setInternalOpen(true); // 내부 상태 true로 바꿈
      api.start({ y: getTargetY(openTo) });
    }
  }, [openTo]);

  const togglePanel = () => {
    if (controlled) return;
    setInternalOpen((prev) => !prev);
  };

  const bind = useDrag(
    ({ down, movement: [, my] }) => {
      if (down) {
        api.start({
          y: Math.max(FULLY_OPEN, Math.min(FULLY_CLOSED, y.get() + my)),
        });
      } else {
        const currentY = y.get();
        const points = [FULLY_OPEN, MID_POSITION, FULLY_CLOSED];
        const nearest = points.reduce((prev, curr) =>
          Math.abs(curr - currentY) < Math.abs(prev - currentY) ? curr : prev
        );
        setInternalOpen(nearest !== FULLY_CLOSED); // 열린 상태 반영
        api.start({ y: nearest });
      }
    },
    { from: () => [0, y.get()] }
  );

  const AnimatedPanel = animated(PanelBase);

  return (
    <MobileContainer>
      <AnimatedPanel
        style={{ transform: y.to((v) => `translateY(${v}px)`) }}
        {...bind()}
      >
        <SwipeBar onClick={togglePanel} />
        <MobileContentWrapper>
          <MobileContent>
            <CardScaleWrapper>{content}</CardScaleWrapper>
          </MobileContent>
        </MobileContentWrapper>
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
  display: flex;
  flex-direction: column;
`;

const SwipeBar = styled.div`
  width: 200px;
  height: 5px;
  background-color: #ccc;
  border-radius: 5px;
  margin: 10px auto 0 auto;
  cursor: pointer;
  flex-shrink: 0;
`;

const MobileContentWrapper = styled.div`
  flex: 1 1 0;
  min-height: 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const MobileContent = styled.div`
  flex: 1 1 0;
  min-height: 0;
  padding: 12px 0 100px 0;
  color: white;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  -ms-overflow-style: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const CardScaleWrapper = styled.div`
  width: 100%;
  max-width: 440px;
  transform: scale(0.9);
  transform-origin: top center;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export default MobileSlidingPanel;
