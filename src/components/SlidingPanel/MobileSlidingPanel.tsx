import React from "react";
import { animated, useSpring } from "react-spring";
import { useDrag } from "@use-gesture/react";
import styled from "styled-components";
import { colors } from "../../styles/theme";

// 모바일 슬라이딩 패널 Props
interface MobileSlidingPanelProps {
  content?: React.ReactNode;
}

// 모바일에서 하단에서 올라오는 슬라이딩 패널 컴포넌트
const MobileSlidingPanel: React.FC<MobileSlidingPanelProps> = ({ content }) => {
  // 네비게이션 바 높이 (고정값)
  const NAVBAR_HEIGHT = 100;
  // 패널 전체 높이 계산 (window가 없을 때는 500으로 fallback)
  const panelHeight =
    typeof window !== "undefined" ? window.innerHeight - NAVBAR_HEIGHT : 500;

  // 패널의 3가지 스냅 포인트
  const MID_POSITION = panelHeight - 300; // 중간 위치
  const FULLY_OPEN = 0; // 완전히 열린 위치 (상단)
  const FULLY_CLOSED = panelHeight; // 완전히 닫힌 위치 (하단)

  // react-spring으로 y축 위치 애니메이션 상태 관리
  const [{ y }, api] = useSpring(() => ({
    y: FULLY_CLOSED,
    config: { tension: 100, friction: 25 },
  }));

  // 패널을 중간/닫힘 상태로 토글하는 함수 (스와이프 바 클릭 시)
  const togglePanel = () => {
    api.start({ y: y.get() === FULLY_CLOSED ? MID_POSITION : FULLY_CLOSED });
  };

  // 드래그 제스처 바인딩
  const bind = useDrag(
    ({ down, movement: [, my] }) => {
      if (down) {
        // 드래그 중: y 위치를 실시간으로 업데이트 (범위 제한)
        api.start({
          y: Math.max(FULLY_OPEN, Math.min(FULLY_CLOSED, y.get() + my)),
        });
      } else {
        // 드래그 끝: 가장 가까운 스냅 포인트로 이동
        const currentY = y.get();
        const target = getNearestSnapPoint(currentY);
        api.start({ y: target });
      }
    },
    { from: () => [0, y.get()] }
  );

  // 현재 y 위치에서 가장 가까운 스냅 포인트 반환
  const getNearestSnapPoint = (currentY: number) => {
    const points = [FULLY_OPEN, MID_POSITION, FULLY_CLOSED];
    return points.reduce((prev, curr) =>
      Math.abs(curr - currentY) < Math.abs(prev - currentY) ? curr : prev
    );
  };

  // 애니메이션 적용된 패널 컴포넌트
  const AnimatedPanel = animated(PanelBase);

  return (
    <MobileContainer>
      <AnimatedPanel
        style={{ transform: y.to((v) => `translateY(${v}px)`) }}
        {...bind()}
      >
        <SwipeBar onClick={togglePanel} />
        <MobileContentWrapper>
          {/* 카드가 작아보이도록 내부에 max-width와 scale 적용 */}
          <MobileContent>
            <CardScaleWrapper>{content}</CardScaleWrapper>
          </MobileContent>
        </MobileContentWrapper>
      </AnimatedPanel>
    </MobileContainer>
  );
};

// ===== styled-components =====

// 패널 전체 컨테이너 (화면 하단 고정)
const MobileContainer = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  z-index: 20;
`;

// 패널 베이스 (슬라이딩 영역)
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

// 스와이프 바 (패널 상단의 작은 바)
const SwipeBar = styled.div`
  width: 200px;
  height: 5px;
  background-color: #ccc;
  border-radius: 5px;
  margin: 10px auto 0 auto;
  cursor: pointer;
  flex-shrink: 0;
`;

// 컨텐츠 래퍼 (스크롤 영역)
const MobileContentWrapper = styled.div`
  flex: 1 1 0;
  min-height: 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

// 실제 컨텐츠 영역 (스크롤 가능)
const MobileContent = styled.div`
  flex: 1 1 0;
  min-height: 0;
  padding: 12px 0 100px 0;
  color: white;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE 10+ */
  display: flex;
  flex-direction: column;
  align-items: center;
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
  }
`;

// 카드가 작아보이도록 scale과 max-width 적용
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
