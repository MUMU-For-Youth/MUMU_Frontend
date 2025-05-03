import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  ApiEduDetailResponse,
  ApiSpaceDetailResponse,
} from "@/types/responses";
import { baseURL } from "../api/api";
import styled from "styled-components";
import EducationDetail from "../components/Detail/EducationDetail";
import SpaceDetail from "../components/Detail/SpaceDetail";

type DetailType = "education" | "space";

interface DetailData {
  id: string;
  title: string;
  description: string;
  // 필요한 필드 추가
}

const Detail: React.FC = () => {
  const { type, id } = useParams<{ type: DetailType; id: string }>();
  const [eduData, setEduData] = useState<ApiEduDetailResponse | null>(null);
  const [spaceData, setSpaceData] = useState<ApiSpaceDetailResponse | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDetail = async () => {
      if (!type || !id) return;

      try {
        setLoading(true);
        if (type === "education") {
          const response = await axios.get<ApiEduDetailResponse>(
            `${baseURL}/api/edu/${id}`
          );
          setEduData(response.data);
        } else if (type === "space") {
          const response = await axios.get<ApiSpaceDetailResponse>(
            `${baseURL}/api/space/${id}`
          );
          setSpaceData(response.data);
        } else {
          setError("잘못된 type입니다.");
        }
      } catch (err) {
        setError("데이터를 불러오지 못했습니다.");
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [type, id]);

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>{error}</div>;

  return (
    <Wrapper>
      {type === "education" && eduData && <EducationDetail data={eduData} />}

      {type === "space" && spaceData && <SpaceDetail data={spaceData} />}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 20px;
  overflow-y: auto;
`;

export default Detail;
