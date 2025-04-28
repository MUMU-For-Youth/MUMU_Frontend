// pages/EducationList.tsx

import React from "react";
import styled from "styled-components";
import Card from "../components/Card";

// EducationList 컴포넌트: 무료 교육 목록 페이지를 렌더링합니다.
const EducationList: React.FC = () => {
  return (
    <ScrollWrapper>
      <EducationListContainer>
        {/* 페이지 제목 */}
        <h1>무료 교육 목록</h1>
        <CardFlex>
          {/* Card 컴포넌트 여러 개 렌더링 (임시 데이터) */}
          <ResponsiveCardWrapper>
            <Card />
          </ResponsiveCardWrapper>
          <ResponsiveCardWrapper>
            <Card />
          </ResponsiveCardWrapper>
          <ResponsiveCardWrapper>
            <Card />
          </ResponsiveCardWrapper>
          <ResponsiveCardWrapper>
            <Card />
          </ResponsiveCardWrapper>
          <ResponsiveCardWrapper>
            <Card />
          </ResponsiveCardWrapper>
        </CardFlex>
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

// 카드들을 flex로 배치하는 래퍼 스타일
const CardFlex = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  margin-top: 20px;
  justify-content: center;
  align-items: flex-start;
`;

// 카드의 가로 길이와 내부 버튼의 유동적 크기 조절을 위한 래퍼
const ResponsiveCardWrapper = styled.div`
  flex: 1 1 360px;
  max-width: 420px;
  min-width: 320px;
  display: flex;
  justify-content: center;

  @media (max-width: 900px) {
    min-width: 80vw;
    max-width: 88vw;
    flex-basis: 88vw;
  }

  @media (max-width: 600px) {
    min-width: 92vw;
    max-width: 96vw;
    flex-basis: 96vw;
    padding: 0;
  }

  /* 카드 내부 버튼이 넘치지 않도록 카드에 강제적으로 width 100% 부여 */
  & > * {
    width: 100%;
    min-width: 0;
  }
`;
