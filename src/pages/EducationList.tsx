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

const ScrollWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  overflow-y: auto;
  box-sizing: border-box;

  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const EducationListContainer = styled.div`
  padding: 32px 20px;
  max-width: 1200px;
  margin: 0 auto;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 24px 16px;
  }
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 32px;

  @media (max-width: 768px) {
    margin-bottom: 24px;
  }
`;

const Title = styled.h1`
  font-size: 28px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 12px;

  @media (max-width: 768px) {
    font-size: 22px;
  }
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
  gap: 24px;
`;

const GridCardWrapper = styled.div`
  width: 360px; // 또는 원하는 고정값
  flex-shrink: 0;
`;
