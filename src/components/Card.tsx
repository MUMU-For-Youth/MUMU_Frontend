import styled from "styled-components";
import GotoMapButtonSvg from "../assets/buttons/GotoMapButton.svg";
import CardTag from "./CardTag";
import EducationTextSection from "./EducationTextSection";
import SpaceTextSection from "./SpaceTextSection";
import GotoDetailButton from "./Button/GotoDetailButton";
import GotoApplyButton from "./Button/GotoApplyButton";
import BookMarkIconButton from "./Button/BookMarkIconButton";
import { ApiEduResponse, ApiSpaceResponse } from "../types/responses";
import { useAuthStore } from "../store/useAuthStore";
import axios from "axios";
import { baseURL } from "../api/api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// 제목이 너무 길면 …으로 줄여주는 함수 (2줄 기준)
function truncateTitle(title: string, maxLength: number = 40): string {
  if (title.length <= maxLength) return title;
  return title.slice(0, maxLength - 1) + "…";
}

// props 타입 정의 (Discriminated Union)
interface CardPropsEducation {
  type: "education";
  data: ApiEduResponse;
}

interface CardPropsSpace {
  type: "space";
  data: ApiSpaceResponse;
}

type CardProps = CardPropsEducation | CardPropsSpace;

const Card: React.FC<CardProps & { onBookmarkChange?: () => void }> = ({
  type,
  data,
  onBookmarkChange,
}) => {
  const navigate = useNavigate();

  const title =
    type === "education"
      ? truncateTitle(data.eduName)
      : truncateTitle(data.spaceName);

  const handleBookmark = async () => {
    const accessToken = useAuthStore.getState().accessToken;
    if (!accessToken) {
      alert("로그인이 필요합니다.");
      return;
    }

    try {
      if (type === "education") {
        await axios.post(
          `${baseURL}/api/edu/bookmark?access_token=${accessToken}`,
          {
            eduId: data.eduId,
          }
        );
      } else {
        await axios.post(
          `${baseURL}/api/space/bookmark?access_token=${accessToken}`,
          {
            spaceId: data.spaceId,
          }
        );
      }
      onBookmarkChange?.();
    } catch (error) {
      console.error("북마크 실패", error);
      alert("북마크 요청 중 오류가 발생했습니다.");
    }
  };

  const handleGotoMap = () => {
    if (type === "education") {
      navigate(`/education-map?eduId=${(data as ApiEduResponse).eduId}`);
    } else {
      navigate(`/space-map?spaceId=${(data as ApiSpaceResponse).spaceId}`);
    }
  };

  return (
    <CardOuter>
      <CardCenterWrapper>
        <CardContainer>
          <CardTag>
            {type === "education" ? data.field : data.spaceType}
          </CardTag>

          <CardTitleRow>
            <CardTitle
              title={type === "education" ? data.eduName : data.spaceName}
            >
              {title}
            </CardTitle>
            {/* bookmarked 상태 전달 */}
            <BookMarkIconButton
              handleBookmark={handleBookmark}
              isBookmarked={data.bookmarked}
            />
          </CardTitleRow>

          <ImageWrapper>
            <CardImage
              src={
                type === "education"
                  ? // eduImage 필드가 없다면 placeholder로 대체
                    (data as ApiEduResponse).eduImage ?? ""
                  : (data as ApiSpaceResponse).spaceImage ?? ""
              }
              alt="교육 or 공간 이미지"
            />
          </ImageWrapper>

          {/* 화면에 따라 적절한 정보 섹션 렌더링 */}
          {type === "education" ? (
            <EducationTextSection data={data as ApiEduResponse} />
          ) : (
            <SpaceTextSection data={data as ApiSpaceResponse} />
          )}

          <CardButtonContainer>
            <IconButton
              type="button"
              aria-label="지도보기"
              onClick={handleGotoMap}
            >
              <img src={GotoMapButtonSvg} alt="지도보기" />
            </IconButton>
            <GotoDetailButton
              type={type}
              spaceId={(data as ApiSpaceResponse).spaceId}
              eduId={(data as ApiEduResponse).eduId}
            />
            <GotoApplyButton
              type={type === "education" ? "apply" : "reserve"}
              url={
                type === "education"
                  ? (data as ApiEduResponse).eduUrl
                  : (data as ApiSpaceResponse).spaceUrl
              }
            />
          </CardButtonContainer>
        </CardContainer>
      </CardCenterWrapper>
    </CardOuter>
  );
};

export default Card;

const CardOuter = styled.div`
  padding: 16px 8px;
  background: transparent;
`;

const CardCenterWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const CardContainer = styled.div`
  background-color: #ffffff;
  border-radius: 16px;
  padding: 24px 20px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  width: 100%;
  max-width: 420px;
  min-height: 520px;
  display: flex;
  flex-direction: column;
  gap: 12px;

  @media (max-width: 600px) {
    padding: 20px 16px;
    border-radius: 14px;
    box-shadow: 0 1px 8px rgba(0, 0, 0, 0.06);
  }
`;

const CardTitleRow = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`;

const CardTitle = styled.h2`
  font-size: 1.2rem;
  font-weight: 600;
  height: 53px;
  color: #222;
  margin: 0;
  flex: 1;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;

  @media (max-width: 600px) {
    font-size: 1.1rem;
  }
`;

const ImageWrapper = styled.div`
  width: 100%;
  height: 180px;
  overflow: hidden;
  border-radius: 10px;
  background-color: #f5f5f5;

  @media (max-width: 600px) {
    height: 140px;
  }
`;

const CardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const CardButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
  padding-top: 16px;
  gap: 8px;
  border-top: 1px solid #eee;

  @media (max-width: 600px) {
    padding-top: 12px;
    gap: 6px;
  }
`;

const IconButton = styled.button`
  background: none;
  border: none;
  padding: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.12s ease;

  &:active {
    transform: scale(0.96);
  }

  img {
    height: 38px;
    width: 38px;
  }
`;
