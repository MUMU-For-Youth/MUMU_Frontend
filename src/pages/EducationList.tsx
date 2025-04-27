// pages/EducationList.tsx

import React from "react";
import styled from "styled-components";
import Card from "../components/Card";

// EducationList 컴포넌트: 무료 교육 목록 페이지를 렌더링합니다.
const EducationList: React.FC = () => {
  return (
    <EducationListContainer>
      {/* 페이지 제목 */}
      <h1>무료 교육 목록</h1>
      <CardFlex>
        {/* Card 컴포넌트 여러 개 렌더링 (임시 데이터) */}
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </CardFlex>
    </EducationListContainer>
  );
};

export default EducationList;

// 전체 EducationList 페이지의 컨테이너 스타일
const EducationListContainer = styled.div`
  padding: 20px;
`;

// 카드들을 flex로 배치하는 래퍼 스타일
const CardFlex = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-top: 20px;
  justify-content: flex-start;

  /* 카드가 화면 끝에 닿으면 밑으로 내려감 */
  & > * {
    flex: 1 1 320px;
    max-width: 500px;
    min-width: 320px;
    box-sizing: border-box;
  }

  /* 모바일 환경에서 세로 배치 및 크기 조정 */
  @media (max-width: 600px) {
    flex-direction: column;
    align-items: center;
    & > * {
      min-width: 0;
      max-width: 100%;
    }
  }
`;
