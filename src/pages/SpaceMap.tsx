import styled from "styled-components";
import NaverMap from "../components/NaverMap";
import SlidingPanel from "../components/SlidingPanel";
import DropdownContainer from "../components/Dropdown/DropdownContainer";
import Card from "../components/Card";
import { useEffect, useRef, useState } from "react";
import { baseURL } from "../api/api";
import axios from "axios";
import {
  ApiSpaceMarkerResponse,
  ApiSpaceResponse,
  SpaceWithMarker,
} from "../types/responses";
import { useSpaceFilterStore } from "../store/useSpaceFilterStore";
import { useAuthStore } from "../store/useAuthStore";
import { useSearchParams } from "react-router-dom";

/**
 * SpaceMap 페이지
 * - 좌측에 SlidingPanel(공간 카드 리스트), 우측에 NaverMap(지도) 표시
 * - SlidingPanel은 content prop을 통해 카드 리스트를 전달받음
 * - CardList는 패널 내부에서 최대한 많은 영역을 차지하며 스크롤 가능
 */
const SpaceMap: React.FC = () => {
  const [spaceList, setSpaceList] = useState<SpaceWithMarker[]>([]); // 교육 리스트 상태
  const { district, target, facility } = useSpaceFilterStore();
  const [selectedSpaceId, setSelectedSpaceId] = useState<string | null>(null);
  const accessToken = useAuthStore((state) => state.accessToken);
  const cardRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const [searchParams] = useSearchParams();
  const initialSpaceIdFromQuery = searchParams.get("spaceId");

  useEffect(() => {
    if (initialSpaceIdFromQuery && spaceList.length > 0) {
      const id = initialSpaceIdFromQuery;
      const exists = spaceList.some((e) => e.spaceId === id);
      if (exists) {
        setSelectedSpaceId(id);
        setIsPanelOpen(true); // ✅ 자동 열기
      }
    }
  }, [initialSpaceIdFromQuery, spaceList]);

  const fetch = async () => {
    try {
      const params = new URLSearchParams();
      if (district.length > 0) params.append("region", district.join(","));
      if (target.length > 0) params.append("target", target.join(","));
      if (facility.length > 0) params.append("type", facility.join(","));
      if (accessToken) params.append("access_token", accessToken);

      const [spaceListRes, markerRes] = await Promise.all([
        axios.get<ApiSpaceResponse[]>(
          `${baseURL}/api/space?${params.toString()}`
        ),
        axios.get<ApiSpaceMarkerResponse[]>(`${baseURL}/api/space/marker`),
      ]);

      const merged: SpaceWithMarker[] = spaceListRes.data
        .map((space) => {
          const marker = markerRes.data.find(
            (m) => m.spaceId === space.spaceId
          );
          if (!marker) return null;

          return {
            ...space,
            lat: marker.spaceLocationLatitude!,
            lng: marker.spaceLocationLongitude!,
          };
        })
        .filter(Boolean) as SpaceWithMarker[];

      setSpaceList(merged);
    } catch (err) {
      console.error("공간 API 호출 실패", err);
    }
  };

  useEffect(() => {
    fetch();
  }, [district, target, facility]);

  useEffect(() => {
    if (selectedSpaceId && cardRefs.current[selectedSpaceId]) {
      cardRefs.current[selectedSpaceId]?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [selectedSpaceId]);

  return (
    <SpaceMapContainer>
      <DropdownContainer type="space" absolute={true} />
      {/* 좌측 패널: 공간 카드 리스트 */}
      <SlidingPanel
        key={selectedSpaceId}
        content={
          <CardListWrapper>
            <CardList>
              {spaceList.map((space) => (
                <div
                  key={space.spaceId}
                  ref={(el) => {
                    cardRefs.current[space.spaceId] = el;
                  }}
                >
                  <Card type="space" data={space} onBookmarkChange={fetch} />
                </div>
              ))}
            </CardList>
          </CardListWrapper>
        }
        isOpen={isPanelOpen}
        onToggle={() => setIsPanelOpen((prev) => !prev)}
        openToMobile={selectedSpaceId ? "mid" : undefined}
      />
      {/* 우측 지도 영역 */}
      <NaverMap
        spaceMarkers={spaceList.map((m) => ({
          spaceId: m.spaceId!,
          lat: m.lat!,
          lng: m.lng!,
        }))}
        onSpaceMarkerClick={(spaceId) => {
          setSelectedSpaceId(spaceId);
          setIsPanelOpen(true);
        }}
      />
    </SpaceMapContainer>
  );
};

/**
 * CardListWrapper
 * - SlidingPanel 내부에서 CardList가 최대한 많은 영역을 차지하도록 하는 래퍼
 */
const CardListWrapper = styled.div`
  height: 100%;
  min-height: 0;
  display: flex;
  flex-direction: column;
`;

/**
 * CardList
 * - 카드들을 세로로 나열, 스크롤 가능
 * - 스크롤바는 숨김 처리
 */
const CardList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 24px 8px 24px 8px;
  overflow-y: auto;
  height: 100%;
  min-height: 0;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE 10+ */
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
  }
`;

/**
 * SpaceMapContainer
 * - 전체 페이지 컨테이너, 100vw/100vh 사용
 */
const SpaceMapContainer = styled.div`
  width: 100%;
  height: 100vh;
  position: relative;
`;

export default SpaceMap;
