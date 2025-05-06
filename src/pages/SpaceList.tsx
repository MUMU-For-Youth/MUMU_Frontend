import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import Card from "../components/Card";
import { ApiSpaceResponse } from "../types/responses";
import { baseURL } from "../api/api";
import DropdownContainer from "../components/Dropdown/DropdownContainer";

const SpaceList: React.FC = () => {
  const [spaces, setSpaces] = useState<ApiSpaceResponse[]>([]);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const fetchSpaces = async () => {
      try {
        const response = await axios.get<ApiSpaceResponse[]>(
          `${baseURL}/api/space`,
          {
            headers: {
              Authorization: token ? `Bearer ${token}` : "null",
            },
          }
        );
        setSpaces(response.data);
      } catch (error) {
        console.error("공간 데이터를 불러오지 못했습니다:", error);
      }
    };

    fetchSpaces();
  }, [token]);

  return (
    <ScrollWrapper>
      <SpaceListContainer>
        <Header>
          <Title>무료 공간 목록</Title>
          <DropdownContainer type="space" />
        </Header>

        <CardGrid>
          {spaces.map((space) => (
            <GridCardWrapper key={space.spaceId}>
              <Card type="space" data={space} />
            </GridCardWrapper>
          ))}
        </CardGrid>
      </SpaceListContainer>
    </ScrollWrapper>
  );
};

export default SpaceList;

// 스크롤 가능한 전체 래퍼
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

// 공간 리스트 컨테이너
const SpaceListContainer = styled.div`
  padding: 20px;
  min-height: 100vh;
  box-sizing: border-box;
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
