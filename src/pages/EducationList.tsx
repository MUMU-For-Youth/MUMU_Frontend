import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import Card from "../components/Card";
import { ApiEduResponse } from "../types/responses";
import { baseURL } from "../api/api";
import DropdownContainer from "../components/Dropdown/DropdownContainer";
import { useAuthStore } from "../store/useAuthStore";
import { useEduFilterStore } from "../store/useEduFilterStore";

const EducationList: React.FC = () => {
  const [educationList, setEducationList] = useState<ApiEduResponse[]>([]);
  const accessToken = useAuthStore((state) => state.accessToken);
  const { district, category, status } = useEduFilterStore();

  const fetchEducationData = async () => {
    try {
      const params = new URLSearchParams();
      if (district.length > 0) params.append("region", district.join(","));
      if (category.length > 0) params.append("field", category.join(","));
      if (status.length > 0) params.append("status", status.join(","));
      if (accessToken) params.append("access_token", accessToken);

      const response = await axios.get<ApiEduResponse[]>(
        `${baseURL}/api/edu?${params.toString()}`
      );

      setEducationList(response.data);
    } catch (error) {
      console.error("교육 정보를 불러오는 데 실패했습니다.", error);
    }
  };

  useEffect(() => {
    fetchEducationData();
  }, [district, category, status, accessToken]);

  return (
    <ScrollWrapper>
      <EducationListContainer>
        <Header>
          <Title>무료 교육 목록</Title>
          <DropdownContainer type="education" />
        </Header>

        <CardGrid>
          {educationList.map((edu) => (
            <GridCardWrapper key={edu.eduId}>
              <Card
                type="education"
                data={edu}
                onBookmarkChange={fetchEducationData}
              />
            </GridCardWrapper>
          ))}
        </CardGrid>
      </EducationListContainer>
    </ScrollWrapper>
  );
};

export default EducationList;

// 스크롤 가능한 전체 래퍼
const ScrollWrapper = styled.div`
  width: 100%;
  height: 100vh;
  overflow-y: auto;
  box-sizing: border-box;
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

// 교육 리스트 컨테이너
const EducationListContainer = styled.div`
  padding: 20px;
  min-height: 100vh;
  box-sizing: border-box;
`;

const Header = styled.div`
  width: 100%;
  height: 80px;
  position: relative;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  text-align: center;
`;

// 카드 그리드 레이아웃
const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 24px;
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

// 각 카드의 래퍼
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
