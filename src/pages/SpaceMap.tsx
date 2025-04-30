import styled from "styled-components";
import NaverMap from "../components/NaverMap";
import SlidingPanel from "../components/SlidingPanel";
import Card from "../components/Card";

/**
 * SpaceMap 페이지
 * - 좌측에 SlidingPanel(공간 카드 리스트), 우측에 NaverMap(지도) 표시
 * - SlidingPanel은 content prop을 통해 카드 리스트를 전달받음
 * - CardList는 패널 내부에서 최대한 많은 영역을 차지하며 스크롤 가능
 */
const SpaceMap: React.FC = () => {
  return (
    <SpaceMapContainer>
      {/* 좌측 패널: 공간 카드 리스트 */}
      <SlidingPanel
        content={
          <CardListWrapper>
            <CardList>
              {/* 공간 카드 예시 (실제 데이터로 대체 가능) */}
              <Card type="space" />
              <Card type="space" />
              <Card type="space" />
              {/* 필요시 더 추가 */}
            </CardList>
          </CardListWrapper>
        }
      />
      {/* 우측 지도 영역 */}
      <NaverMap />
    </SpaceMapContainer>
  );
};

/**
 * CardListWrapper
 * - SlidingPanel 내부에서 CardList가 최대한 많은 영역을 차지하도록 하는 래퍼
 */
const CardListWrapper = styled.div`
  height: 100%;
  min-height: 0;
  display: flex;
  flex-direction: column;
`;

/**
 * CardList
 * - 카드들을 세로로 나열, 스크롤 가능
 * - 스크롤바는 숨김 처리
 */
const CardList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 24px 8px 24px 8px;
  overflow-y: auto;
  height: 100%;
  min-height: 0;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE 10+ */
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
  }
`;

/**
 * SpaceMapContainer
 * - 전체 페이지 컨테이너, 100vw/100vh 사용
 */
const SpaceMapContainer = styled.div`
  width: 100%;
  height: 100vh;
  position: relative;
`;

export default SpaceMap;
