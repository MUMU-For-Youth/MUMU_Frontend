import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import Card from "../components/Card";
import { ApiEduResponse } from "../types/responses";
import { baseURL } from "../api/api";

const EducationList: React.FC = () => {
  const [educationList, setEducationList] = useState<ApiEduResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchEducationData = async () => {
      try {
        const response = await axios.get<ApiEduResponse[]>(
          `${baseURL}/api/edu`
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

const ScrollWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  overflow-y: auto;
  box-sizing: border-box;
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const EducationListContainer = styled.div`
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
