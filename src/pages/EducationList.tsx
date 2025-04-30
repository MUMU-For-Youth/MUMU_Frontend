// pages/EducationList.tsx

import React from "react";
import styled from "styled-components";
import Card from "../components/Card";

// EducationList 컴포넌트: 무료 교육 목록 페이지를 렌더링합니다.
const EducationList: React.FC = () => {
  // 임시 카드 데이터 개수
  const cardCount = 8;
  const cards = Array.from({ length: cardCount });

  return (
    <ScrollWrapper>
      <EducationListContainer>
        {/* 페이지 제목 */}
        <h1>무료 교육 목록</h1>
        <CardGrid>
          {/* Card 컴포넌트 여러 개 렌더링 (임시 데이터) */}
          {cards.map((_, idx) => (
            <GridCardWrapper key={idx}>
              <Card type="education" />
            </GridCardWrapper>
          ))}
        </CardGrid>
      </EducationListContainer>
    </ScrollWrapper>
  );
};

export default EducationList;

// 스크롤은 가능하지만 스크롤바는 보이지 않게 하는 래퍼
const ScrollWrapper = styled.div`
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

// 전체 EducationList 페이지의 컨테이너 스타일
const EducationListContainer = styled.div`
  padding: 20px;
  min-height: 100vh;
  box-sizing: border-box;
`;

// 카드들을 grid로 배치하는 래퍼 스타일
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

// 카드의 가로 길이와 내부 버튼의 유동적 크기 조절을 위한 래퍼
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
