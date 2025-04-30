// Card 컴포넌트: 교육 카드 UI (북마크, 상세정보, 지도, 신청 등 포함)

import React, { useState } from "react";
import styled from "styled-components";
import GotoMapButtonSvg from "../assets/buttons/GotoMapButton.svg";
import EducationDummyImage from "../assets/dummyImage/EducationDummyImage.svg";
import UnBookmarkIcon from "../assets/icons/UnBookmarkIcon.svg";
import BookmarkIcon from "../assets/icons/BookmarkIcon.svg";
import CardTag from "./CardTag";

// ActionButton 타입 정의
type ActionButtonType = "learnMore" | "apply";

// ActionButton 컴포넌트: 자세히 보기/신청하기 버튼
interface ActionButtonProps {
  type: ActionButtonType;
  onClick?: () => void;
}
const ActionButton: React.FC<ActionButtonProps> = ({ type, onClick }) => {
  const isLearnMore = type === "learnMore";
  return (
    <StyledActionButton
      type="button"
      aria-label={isLearnMore ? "자세히 보기" : "신청하기"}
      onClick={onClick}
      $buttonType={type}
    >
      {isLearnMore ? "자세히 보기" : "신청하기"}
    </StyledActionButton>
  );
};

// Card 컴포넌트 본문
const Card: React.FC = () => {
  // 북마크 상태
  const [bookmarked, setBookmarked] = useState(false);

  // 북마크 버튼 클릭 핸들러
  const handleBookmarkClick = () => {
    setBookmarked((prev) => {
      alert(!prev ? "북마크 했습니다" : "북마크를 해제했습니다");
      return !prev;
    });
  };

  // 자세히 보기 버튼 클릭 핸들러
  const handleLearnMore = () => {
    alert("자세히 보기 클릭!");
  };

  // 신청하기 버튼 클릭 핸들러
  const handleApply = () => {
    alert("신청하기 클릭!");
  };

  return (
    <CardContainer>
      {/* 상단 태그 */}
      <CardTag>취업</CardTag>
      {/* 제목 + 북마크 */}
      <CardTitleRow>
        <CardTitle>감각적인 UIUX 디자인 워크숍</CardTitle>
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
      {/* 대표 이미지 */}
      <ImageWrapper>
        <CardImage src={EducationDummyImage} alt="워크숍 이미지" />
      </ImageWrapper>
      {/* 상세 정보 */}
      <CardTextBox>
        <CardRow>
          <CardLabel>일시</CardLabel>
          <CardTextRight>2025.04.22(화)</CardTextRight>
        </CardRow>
        <CardRow>
          <CardLabel>방식</CardLabel>
          <CardTextRight>오프라인</CardTextRight>
        </CardRow>
        <CardRow>
          <CardLabel>주소</CardLabel>
          <CardTextRight>서울특별시 용산구</CardTextRight>
        </CardRow>
        <CardRow>
          <CardLabel>일정</CardLabel>
          <CardTextRight>10:00~12:00, 12:00~18:00</CardTextRight>
        </CardRow>
        <CardRow>
          <CardLabel>대상</CardLabel>
          <CardTextRight>UXUI 입문에 관심이 있는 비전공자</CardTextRight>
        </CardRow>
      </CardTextBox>
      {/* 하단 버튼 영역 */}
      <CardButtonContainer>
        <IconButton type="button" aria-label="지도보기">
          <img src={GotoMapButtonSvg} alt="지도보기" />
        </IconButton>
        <ButtonGroup>
          <ActionButton type="learnMore" onClick={handleLearnMore} />
          <ActionButton type="apply" onClick={handleApply} />
        </ButtonGroup>
      </CardButtonContainer>
    </CardContainer>
  );
};

export default Card;

// ================== styled-components ==================

// 카드 전체 컨테이너
const CardContainer = styled.div`
  background: white;
  border-radius: 16px;
  padding: 32px 24px 32px 24px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
  max-width: 440px;
  min-width: 400px;
  min-height: 560px;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  position: relative;
  gap: 18px;

  @media (max-width: 600px) {
    max-width: 98vw;
    min-width: 0;
    width: 100%;
    padding: 18px 12px 24px 12px;
    gap: 14px;
  }
`;

// 제목 + 북마크 버튼 행
const CardTitleRow = styled.div`
  display: flex;
  align-items: center;
`;

// 카드 제목
const CardTitle = styled.h2`
  font-size: 1.35rem;
  margin: 0;
  flex: 1;
  color: #222;

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
  align-items: center;
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
  gap: 0;

  @media (max-width: 600px) {
    position: static;
    padding: 12px 0 0 0;
    background: transparent;
    border-radius: 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 0;
  }
`;

// 버튼 그룹 (자세히 보기/신청하기)
const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;

  @media (max-width: 600px) {
    flex: 1;
    gap: 10px;
    justify-content: flex-end;
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

// 자세히 보기/신청하기 버튼
const StyledActionButton = styled.button<{ $buttonType?: ActionButtonType }>`
  background: #6287fa;
  color: #fff;
  border: none;
  border-radius: 999px;
  font-size: 1rem;
  font-weight: 600;
  height: 34px;
  min-width: ${({ $buttonType }) =>
    $buttonType === "learnMore"
      ? "140px"
      : $buttonType === "apply"
      ? "140px"
      : "90px"};
  cursor: pointer;
  transition: background 0.15s, color 0.15s, transform 0.1s;
  display: flex;
  align-items: center;
  justify-content: center;
  &:active {
    transform: scale(0.97);
  }

  @media (max-width: 600px) {
    min-width: 0;
    flex: 1;
    font-size: 0.98rem;
    padding: 0 8px;
    height: 32px;
  }
`;
