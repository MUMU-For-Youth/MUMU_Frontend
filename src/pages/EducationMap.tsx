import styled from "styled-components";
import NaverMap from "../components/NaverMap";
import SlidingPanel from "../components/SlidingPanel";
import Card from "../components/Card";

// SlidingPanel이 children을 받지 않는 구조라면,
// SlidingPanel 내부에서 CardList를 직접 렌더링하도록 SlidingPanel의 content(혹은 비슷한 prop) 사용
// 카드 형태(크기)는 그대로 유지

const EducationMap: React.FC = () => {
  return (
    <EducationMapContainer>
      <SlidingPanel
        // SlidingPanel 내부에 CardList를 content prop 등으로 전달
        content={
          <CardList>
            <Card />
            <Card />
            <Card />
            <Card />
            {/* 필요시 더 추가 */}
          </CardList>
        }
      />
      <NaverMap />
    </EducationMapContainer>
  );
};

// 패널 안에서 세로 스크롤이 가능하고, 카드가 잘리지 않게 함
const CardList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 24px 8px 32px 8px;
  overflow-y: auto;
  max-height: 80vh; /* 패널 높이에 맞게 조정 */
  min-height: 0;
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const EducationMapContainer = styled.div`
  width: 100%;
  height: 100vh;
  position: relative;
`;

export default EducationMap;
