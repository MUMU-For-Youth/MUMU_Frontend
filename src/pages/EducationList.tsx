// pages/EducationList.tsx

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import Card from "../components/Card";
import { ApiEduResponse } from "../types/responses"; // ApiEduResponse 타입 import

// EducationList 컴포넌트: 무료 교육 목록 페이지를 렌더링합니다.
const EducationList: React.FC = () => {
  const [educationList, setEducationList] = useState<ApiEduResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // API 데이터 fetch
  useEffect(() => {
    const fetchEducationData = async () => {
      try {
        const response = await axios.get<ApiEduResponse[]>(
          "http://43.201.111.31:8080/api/edu"
        );
        setEducationList(response.data);
      } catch (error) {
        console.error("교육 정보를 불러오는 데 실패했습니다.", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEducationData();
  }, []);

  return (
    <ScrollWrapper>
      <EducationListContainer>
        <h1>무료 교육 목록</h1>
        {loading ? (
          <p>로딩 중...</p>
        ) : (
          <CardGrid>
            {educationList.map((edu) => (
              <GridCardWrapper key={edu.eduId}>
                <Card type="education" data={edu} />
              </GridCardWrapper>
            ))}
          </CardGrid>
        )}
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
