import React from "react";
import styled from "styled-components";
import { useAuthStore } from "../store/useAuthStore";
import SlidingPanel from "../components/SlidingPanel";
import CalendarComponent from "../components/Calendar/CalendarComponent";
import SlidingTopBar from "../components/SlidingTopBar";
import Card from "../components/Card";

const Mypage: React.FC = () => {
  const { user } = useAuthStore();

  // 카드 9장 배열 생성 (실제 데이터가 있다면 map으로 대체)
  const cards = Array.from({ length: 9 });

  return (
    <MypageContainer>
      {/* SlidingPanel이 TopBar보다 위에 오도록 TopBar를 Panel 아래에 둠 */}
      <StyledSlidingPanelWrapper>
        <StyledSlidingPanel
          content={
            <>
              <CalendarComponent />
            </>
          }
        />
      </StyledSlidingPanelWrapper>
      <StyledTopBarWrapper>
        <SlidingTopBar />
      </StyledTopBarWrapper>
      <CardsGrid>
        <Card type="space" />
        <Card type="space" />
        <Card type="space" />
      </CardsGrid>
    </MypageContainer>
  );
};

const MypageContainer = styled.div`
  position: relative;
  padding: 0;
  height: 100vh;
  width: 100vw;
  overflow-y: scroll;
  /* 스크롤바 숨기기 (크로스브라우징) */
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE 10+ */
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
  }
`;

// SlidingPanel이 TopBar보다 위에 오도록 z-index를 더 높게 설정
const StyledSlidingPanelWrapper = styled.div`
  position: sticky;
  top: 0;
  z-index: 30;
`;

const StyledSlidingPanel = styled(SlidingPanel)`
  z-index: 30;
  position: relative;
`;

const StyledTopBarWrapper = styled.div`
  width: 100%;
  position: sticky;
  top: 0;
  z-index: 10;
  background: #fff;
`;

const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 32px 24px;
  justify-items: center;
  margin: 48px auto 0 auto;
  max-width: 1300px;
  width: 100%;
`;

export default Mypage;
