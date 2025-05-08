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

const SpaceListContainer = styled.div`
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
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 24px;
`;

const GridCardWrapper = styled.div`
  width: 360px; // 또는 원하는 고정값
  flex-shrink: 0;
`;
