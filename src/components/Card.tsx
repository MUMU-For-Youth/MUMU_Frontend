import React from "react";
import styled from "styled-components";
import GotoMapButtonSvg from "../assets/buttons/GotoMapButton.svg";
import CardTag from "./CardTag";
import EducationTextSection from "./EducationTextSection";
import SpaceTextSection from "./SpaceTextSection";
import GotoDetailButton from "./Button/GotoDetailButton";
import GotoApplyButton from "./Button/GotoApplyButton";
import BookMarkIconButton from "./Button/BookMarkIconButton";
import { ApiEduResponse, ApiSpaceResponse } from "../types/responses";

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

const Card: React.FC<CardProps> = ({ type, data }) => {
  const title =
    type === "education"
      ? truncateTitle(data.eduName)
      : truncateTitle(data.spaceName);

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
            <BookMarkIconButton />
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
            <IconButton type="button" aria-label="지도보기">
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

// ================== styled-components ==================

const CardOuter = styled.div`
  padding: 18px 10px;
  background: transparent;

  @media (max-width: 600px) {
    padding: 20px 12px 28px;
    border-radius: 18px;
  }
`;

const CardCenterWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const CardContainer = styled.div`
  background: white;
  border-radius: 16px;
  padding: 32px 24px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
  max-width: 420px;
  min-width: 350px;
  min-height: 560px;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  position: relative;
  gap: 8px;

  @media (max-width: 600px) {
    max-width: 98vw;
    min-width: 0;
    padding: 28px 18px;
    gap: 16px;
    border-radius: 18px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }
`;

const CardTitleRow = styled.div`
  display: flex;
  align-items: center;
`;

const CardTitle = styled.h2`
  font-size: 1.35rem;
  margin: 0;
  flex: 1;
  color: #222;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-all;
  white-space: normal;
  min-height: calc(1.35rem * 1.2 * 2);

  @media (max-width: 600px) {
    color: #111;
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 180px;
  display: flex;
  align-items: stretch;
  overflow: hidden;

  @media (max-width: 600px) {
    height: 130px;
    border-radius: 10px;
  }
`;

const CardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 12px;
  background: #f3f3f3;
  display: block;
`;

const CardButtonContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 28px;
  padding-top: 8px;
  width: 100%;
  box-sizing: border-box;
  justify-content: space-between;
  gap: 5px;

  @media (max-width: 600px) {
    padding: 16px 0 0;
    gap: 10px;
  }
`;

const IconButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 38px;
  transition: transform 0.1s ease-in-out;
  &:active {
    transform: scale(0.95);
  }

  @media (max-width: 600px) {
    margin-right: 10px;
  }
`;
