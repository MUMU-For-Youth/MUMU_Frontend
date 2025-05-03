import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import Card from "../components/Card";
import { ApiSpaceResponse } from "../types/responses";
import { baseURL } from "../api/api";

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
    <SpaceListScrollWrapper>
      <SpaceListContainer>
        <h1>무료공간</h1>
        <CardGrid>
          {spaces.map((space) => (
            <GridCardWrapper key={space.spaceId}>
              <Card type="space" data={space} />
            </GridCardWrapper>
          ))}
        </CardGrid>
      </SpaceListContainer>
    </SpaceListScrollWrapper>
  );
};

export default SpaceList;

const SpaceListScrollWrapper = styled.div`
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
