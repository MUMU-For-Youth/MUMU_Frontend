import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import Card from "../components/Card";
import { ApiSpaceResponse } from "../types/responses";
import { baseURL } from "../api/api";
import DropdownContainer from "../components/Dropdown/DropdownContainer";
import { useAuthStore } from "../store/useAuthStore";
import { useSpaceFilterStore } from "../store/useSpaceFilterStore";

const SpaceList: React.FC = () => {
  const [spaceList, setSpaceList] = useState<ApiSpaceResponse[]>([]);
  const accessToken = useAuthStore((state) => state.accessToken);
  const { district, target, facility } = useSpaceFilterStore();

  const fetchSpaceData = async () => {
    try {
      const params = new URLSearchParams();
      if (district.length > 0) params.append("region", district.join(","));
      if (target.length > 0) params.append("target", target.join(","));
      if (facility.length > 0) params.append("type", facility.join(","));

      if (accessToken) params.append("access_token", accessToken);

      const response = await axios.get<ApiSpaceResponse[]>(
        `${baseURL}/api/space`,
        { params }
      );

      setSpaceList(response.data);
    } catch (error) {
      console.error("공간 정보를 불러오는 데 실패했습니다.", error);
    }
  };

  useEffect(() => {
    fetchSpaceData();
  }, [district, target, facility, accessToken]);

  return (
    <ScrollWrapper>
      <SpaceListContainer>
        <Header>
          <Title>무료 공간 목록</Title>
          <DropdownContainer type="space" />
        </Header>

        <CardGrid>
          {spaceList.map((space) => (
            <GridCardWrapper key={space.spaceId}>
              <Card
                type="space"
                data={space}
                onBookmarkChange={fetchSpaceData}
              />
            </GridCardWrapper>
          ))}
        </CardGrid>
      </SpaceListContainer>
    </ScrollWrapper>
  );
};

export default SpaceList;

// ======================= styled-components =======================

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

const SpaceListContainer = styled.div`
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
