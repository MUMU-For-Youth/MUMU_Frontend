// Card 컴포넌트: 교육 카드 UI (북마크, 상세정보, 지도, 신청 등 포함)

import React, { useState } from "react";
import styled from "styled-components";
import GotoMapButtonSvg from "../assets/buttons/GotoMapButton.svg";
import UnBookmarkIcon from "../assets/icons/UnBookmarkIcon.svg";
import BookmarkIcon from "../assets/icons/BookmarkIcon.svg";
import CardTag from "./CardTag";
import EducationTextSection from "./EducationTextSection";
import SpaceTextSection from "./SpaceTextSection";
import GotoDetailButton from "./Button/GotoDetailButton";
import GotoApplyButton from "./Button/GotoApplyButton";
import { ApiEduResponse, ApiSpaceResponse } from "../types/responses";

// 제목이 너무 길면 ...으로 줄여주는 함수 (2줄 기준, 실제 줄바꿈은 CSS로 처리)
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
  const [bookmarked, setBookmarked] = useState(false);

  const handleBookmarkClick = () => {
    setBookmarked((prev) => {
      alert(!prev ? "북마크 했습니다" : "북마크를 해제했습니다");
      return !prev;
    });
  };

  // 제목 추출 및 줄임표 적용 (길이 제한은 40자로 넉넉히)
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
            <BookmarkButton
              type="button"
              aria-label={bookmarked ? "북마크 해제" : "북마크"}
              onClick={handleBookmarkClick}
            >
              <img
                src={bookmarked ? BookmarkIcon : UnBookmarkIcon}
                alt={bookmarked ? "북마크됨" : "북마크"}
                style={{ width: 28, height: 28 }}
              />
            </BookmarkButton>
          </CardTitleRow>

          <ImageWrapper>
            <CardImage
              src={type === "education" ? data.eduImage : data.spaceImage}
              alt="교육 or 공간 이미지"
            />
          </ImageWrapper>

          {type === "education" ? (
            <EducationTextSection data={data} />
          ) : (
            <SpaceTextSection data={data} />
          )}

          <CardButtonContainer>
            <IconButton type="button" aria-label="지도보기">
              <img src={GotoMapButtonSvg} alt="지도보기" />
            </IconButton>
            <GotoDetailButton />
            <GotoApplyButton
              type={type === "education" ? "apply" : "reserve"}
              url={type === "education" ? data.eduUrl : data.spaceUrl}
            />
          </CardButtonContainer>
        </CardContainer>
      </CardCenterWrapper>
    </CardOuter>
  );
};

export default Card;

// ================== styled-components ==================

// 카드 바깥쪽 패딩을 담당하는 래퍼
const CardOuter = styled.div`
  padding: 18px 10px 18px 10px;
  background: transparent;

  @media (max-width: 600px) {
    padding: 20px 12px 28px 12px;
    border-radius: 18px;
  }
`;

// 카드 가운데 정렬을 위한 래퍼
const CardCenterWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

// 카드 전체 컨테이너
const CardContainer = styled.div`
  background: white;
  border-radius: 16px;
  padding: 32px 24px 32px 24px;
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
    width: 100%;
    padding: 28px 18px 28px 18px; /* 모바일에서 카드 내부 패딩을 더 크게 */
    gap: 16px;
    border-radius: 18px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }
`;

// 제목 + 북마크 버튼 행
const CardTitleRow = styled.div`
  display: flex;
  align-items: center;
`;

// 카드 제목 (2줄까지 보이고, 넘치면 ... 처리)
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
  min-height: calc(1.35rem * 1.2 * 2); /* 2줄 높이 확보 (line-height 1.2) */

  @media (max-width: 600px) {
    color: #111;
  }
`;

// 북마크 버튼
const BookmarkButton = styled.button`
  background: none;
  border: none;
  padding: 0 0 0 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  height: 32px;
`;

// 대표 이미지 래퍼
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

// 대표 이미지
const CardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 12px;
  background: #f3f3f3;
  display: block;
`;

// 상세 정보 영역
const CardTextBox = styled.div`
  font-size: 1.05rem;
  line-height: 1.5;
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  gap: 2px;

  @media (max-width: 600px) {
    padding: 2px;
  }
`;

// 상세 정보 한 줄
const CardRow = styled.div`
  display: flex;
  align-items: start;
  margin-bottom: 6px;

  @media (max-width: 600px) {
    margin-bottom: 4px;
  }
`;

// 상세 정보 라벨
const CardLabel = styled.div`
  font-weight: bold;
  min-width: 56px;
  color: #b0b0b0;
  font-size: 1.02rem;
  margin-right: 12px;

  @media (max-width: 600px) {
    min-width: 48px;
    font-size: 0.98rem;
    margin-right: 8px;
  }
`;

// 상세 정보 텍스트
const CardText = styled.div`
  color: #222;
  font-size: 1.02rem;
  flex: 1;

  @media (max-width: 600px) {
    font-size: 0.98rem;
  }
`;

// 오른쪽 정렬 텍스트
const CardTextRight = styled(CardText)`
  text-align: right;
`;

// 하단 버튼 영역
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
    position: static;
    padding: 16px 0 0 0;
    background: transparent;
    border-radius: 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
  }
`;

// 하단 아이콘 버튼 (지도)
const IconButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 38px;
  min-width: 0;
  box-sizing: border-box;
  transition: transform 0.1s ease-in-out;
  &:active {
    transform: scale(0.95);
  }

  @media (max-width: 600px) {
    margin-right: 10px;
    flex-shrink: 0;
  }
`;
