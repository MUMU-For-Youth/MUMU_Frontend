import styled from "styled-components";
import NaverMap from "../components/NaverMap";
import SlidingPanel from "../components/SlidingPanel";
import DropdownContainer from "../components/Dropdown/DropdownContainer";
import Card from "../components/Card";
import { useEffect, useState } from "react";
import axios from "axios";
import { baseURL } from "../api/api";
import {
  ApiEduMarkerResponse,
  ApiEduResponse,
  EduWithMarker,
} from "../types/responses";

const EducationMap: React.FC = () => {
  const [eduList, setEduList] = useState<EduWithMarker[]>([]); // 교육 리스트 상태

  useEffect(() => {
    const fetch = async () => {
      try {
        const [eduListRes, markerRes] = await Promise.all([
          axios.get<ApiEduResponse[]>(`${baseURL}/api/edu`),
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

    fetch();
  }, []);

  return (
    <EducationMapContainer>
      <SlidingPanel />
      {/* <Dropdown /> */}
      <DropdownContainer type="education" />
      <SlidingPanel
        // CardListWrapper로 감싸서 패널 내부에서 CardList가 100% 영역을 차지하도록 함
        content={
          <CardListWrapper>
            <CardList>
              {eduList.map((edu, id) => (
                <Card key={id} type="education" data={edu} />
              ))}
            </CardList>
          </CardListWrapper>
        }
      />
      {/* 지도 영역 */}
      <NaverMap
        eduMarkers={eduList.map((m) => ({
          eduId: m.eduId!,
          lat: m.lat!,
          lng: m.lng!,
        }))}
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
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE 10+ */
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
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
