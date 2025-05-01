import React from "react";
import styled from "styled-components";
import Card from "../components/Card";

const SpaceList: React.FC = () => {
  // 카드 9장 배열 생성 (실제 데이터가 있다면 map으로 대체)
  const cards = Array.from({ length: 9 });

  return (
    <SpaceListScrollWrapper>
      <SpaceListContainer>
        <h1>무료공간</h1>
        {/* <CardGrid> */}
        {/* {cards.map((_, idx) => (
            <GridCardWrapper key={idx}>
              <Card type="space" />
            </GridCardWrapper>
          ))}
        </CardGrid> */}
      </SpaceListContainer>
    </SpaceListScrollWrapper>
  );
};

const SpaceListScrollWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  overflow-y: auto;
  box-sizing: border-box;

  /* 스크롤바 숨기기 (크로스 브라우징) */
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
  }
`;

const SpaceListContainer = styled.div`
  padding: 20px;
  min-height: 100vh;
  box-sizing: border-box;
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 24px;
  margin-top: 20px;
  justify-items: center;
  align-items: start;

  @media (max-width: 900px) {
    grid-template-columns: repeat(auto-fill, minmax(80vw, 1fr));
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    gap: 16px;
  }
`;

const GridCardWrapper = styled.div`
  width: 100%;
  max-width: 420px;
  min-width: 0;
  display: flex;
  justify-content: center;

  & > * {
    width: 100%;
    min-width: 0;
  }
`;

export default SpaceList;
