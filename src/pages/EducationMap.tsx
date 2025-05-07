import styled from "styled-components";
import NaverMap from "../components/NaverMap";
import SlidingPanel from "../components/SlidingPanel";
import DropdownContainer from "../components/Dropdown/DropdownContainer";
import Card from "../components/Card";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { baseURL } from "../api/api";
import {
  ApiEduMarkerResponse,
  ApiEduResponse,
  EduWithMarker,
} from "../types/responses";
import { useEduFilterStore } from "../store/useEduFilterStore";
import { useAuthStore } from "../store/useAuthStore";

const EducationMap: React.FC = () => {
  const [eduList, setEduList] = useState<EduWithMarker[]>([]);
  const { district, category, status } = useEduFilterStore();
  const [selectedEduId, setSelectedEduId] = useState<number | null>(null);
  const accessToken = useAuthStore((state) => state.accessToken);

  const cardRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});

  const fetch = async () => {
    try {
      const params = new URLSearchParams();

      if (district.length > 0) params.append("region", district.join(","));
      if (category.length > 0) params.append("field", category.join(","));
      if (status.length > 0) params.append("status", status.join(","));
      if (accessToken) params.append("access_token", accessToken);

      const [eduListRes, markerRes] = await Promise.all([
        axios.get<ApiEduResponse[]>(`${baseURL}/api/edu?${params.toString()}`),
        axios.get<ApiEduMarkerResponse[]>(`${baseURL}/api/edu/marker`),
      ]);

      const merged: EduWithMarker[] = eduListRes.data
        .map((edu) => {
          const marker = markerRes.data.find((m) => m.eduId === edu.eduId);
          if (!marker) return null;
          return {
            ...edu,
            lat: marker.eduLocationLatitude!,
            lng: marker.eduLocationLongitude!,
          };
        })
        .filter(Boolean) as EduWithMarker[];

      setEduList(merged);
    } catch (err) {
      console.error("교육 API 호출 실패", err);
    }
  };

  useEffect(() => {
    fetch();
  }, [district, category, status, accessToken]);

  // 선택된 eduId로 해당 카드로 스크롤
  useEffect(() => {
    if (selectedEduId && cardRefs.current[selectedEduId]) {
      cardRefs.current[selectedEduId]?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [selectedEduId]);

  return (
    <EducationMapContainer>
      <DropdownContainer type="education" absolute={true} />
      <SlidingPanel
        content={
          <CardListWrapper>
            <CardList>
              {eduList.map((edu) => (
                <div
                  key={edu.eduId}
                  ref={(el) => {
                    cardRefs.current[edu.eduId] = el;
                  }}
                >
                  <Card type="education" data={edu} onBookmarkChange={fetch} />
                </div>
              ))}
            </CardList>
          </CardListWrapper>
        }
      />
      <NaverMap
        eduMarkers={eduList.map((m) => ({
          eduId: m.eduId!,
          lat: m.lat!,
          lng: m.lng!,
        }))}
        onEduMarkerClick={(eduId) => setSelectedEduId(eduId)}
      />
    </EducationMapContainer>
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
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

/**
 * EducationMapContainer
 * - 전체 페이지 컨테이너, 100vw/100vh 사용
 */
const EducationMapContainer = styled.div`
  width: 100%;
  height: 100vh;
  position: relative;
`;

export default EducationMap;
