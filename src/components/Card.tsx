// components/Card.tsx

import React, { useState } from "react";
import styled from "styled-components";
// 버튼, 이미지, 아이콘 등 외부 리소스 import
import GotoMapButtonSvg from "../assets/buttons/GotoMapButton.svg";
import EducationDummyImage from "../assets/dummyImage/EducationDummyImage.svg";
import UnBookmarkIcon from "../assets/icons/UnBookmarkIcon.svg";
import BookmarkIcon from "../assets/icons/BookmarkIcon.svg";
import CardTag from "./CardTag";

// 자세히 보기/신청하기 버튼 타입 정의
type ActionButtonType = "learnMore" | "apply";

interface ActionButtonProps {
  type: ActionButtonType;
  onClick?: () => void;
}

const ActionButton: React.FC<ActionButtonProps> = ({ type, onClick }) => {
  // 버튼별 텍스트 및 스타일 분기
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

// Card 컴포넌트: 교육 카드 UI를 렌더링
const Card: React.FC = () => {
  // 북마크 상태 관리
  const [bookmarked, setBookmarked] = useState(false);

  // 북마크 버튼 클릭 핸들러
  const handleBookmarkClick = () => {
    if (!bookmarked) {
      setBookmarked(true);
      alert("북마크 했습니다");
    } else {
      setBookmarked(false);
      alert("북마크를 해제했습니다");
    }
  };

  // 각 버튼 클릭 핸들러 예시
  const handleLearnMore = () => {
    alert("자세히 보기 클릭!");
  };

  const handleApply = () => {
    alert("신청하기 클릭!");
  };

  return (
    <CardContainer>
      {/* 카드 상단 태그 (예: 취업, 교육 등) */}
      <CardTag>취업</CardTag>
      {/* 카드 제목 및 북마크 버튼 */}
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
      {/* 카드 대표 이미지 + 오버레이 텍스트 */}
      <ImageWrapper>
        <CardImage src={EducationDummyImage} alt="워크숍 이미지" />
      </ImageWrapper>
      {/* 카드 상세 정보 영역 */}
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
      {/* 카드 하단 버튼 영역 (지도, 자세히 보기, 신청하기) */}
      <CardButtonBox>
        <IconButton
          as="button"
          type="button"
          tabIndex={0}
          aria-label="지도보기"
        >
          <img src={GotoMapButtonSvg} alt="지도보기" />
        </IconButton>
        <ActionButton type="learnMore" onClick={handleLearnMore} />
        <ActionButton type="apply" onClick={handleApply} />
      </CardButtonBox>
    </CardContainer>
  );
};

export default Card;

// 카드 전체 컨테이너 스타일
const CardContainer = styled.div`
  background: white;
  border-radius: 16px;
  padding: 28px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
  width: 250px;
  max-width: 500px;
  min-width: 400px;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  position: relative;
  gap: 18px;
`;

// 카드 제목 및 북마크 버튼 행 스타일
const CardTitleRow = styled.div`
  display: flex;
  align-items: center;
`;

// 카드 제목 스타일
const CardTitle = styled.h2`
  font-size: 1.35rem;
  margin: 0;
  flex: 1;
`;

// 북마크 버튼 스타일
const BookmarkButton = styled.button`
  background: none;
  border: none;
  padding: 0 0 0 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  height: 32px;
`;

// 카드 대표 이미지 + 오버레이 텍스트 래퍼
const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 180px;
  display: flex;
  align-items: stretch;
`;

// 카드 대표 이미지 스타일
const CardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 12px;
  background: #f3f3f3;
`;

// 이미지 오버레이 텍스트 스타일
const ImageOverlay = styled.div`
  position: absolute;
  left: 12px;
  top: 18px;
  background: #7a29fa;
  color: #fff;
  font-size: 1.35rem;
  font-weight: 700;
  border-radius: 8px;
  padding: 10px 18px 8px 18px;
  line-height: 1.25;
  z-index: 2;
  box-shadow: 0 2px 8px rgba(122, 41, 250, 0.08);
  white-space: pre-line;
`;

// 카드 상세 정보 영역 스타일
const CardTextBox = styled.div`
  font-size: 1.05rem;
  line-height: 1.5;
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

// 카드 상세 정보 한 줄 스타일
const CardRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 6px;
`;

// 카드 상세 정보 라벨 스타일
const CardLabel = styled.div`
  font-weight: bold;
  min-width: 56px;
  color: #b0b0b0;
  font-size: 1.02rem;
  margin-right: 12px;
`;

// 카드 상세 정보 텍스트 스타일
const CardText = styled.div`
  color: #222;
  font-size: 1.02rem;
  flex: 1;
`;

// 오른쪽 정렬 CardText
const CardTextRight = styled(CardText)`
  text-align: right;
`;

// 카드 하단 버튼 영역 스타일
const CardButtonBox = styled.div`
  display: flex;
  align-items: center;
  margin-top: auto;
  padding-top: 8px;
  width: 100%;
  box-sizing: border-box;
  gap: 20px;
`;

// 카드 하단 아이콘 버튼 스타일
const IconButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 44px;
  min-width: 0;
  box-sizing: border-box;
  transition: transform 0.1s ease-in-out;
  &:active {
    transform: scale(0.95);
  }
`;

// 자세히 보기/신청하기 버튼 스타일
const StyledActionButton = styled.button<{ $buttonType?: ActionButtonType }>`
  background: #6287fa;
  color: #fff;
  border: none;
  border-radius: 999px;
  font-size: 1rem;
  font-weight: 600;
  padding: 0 26px;
  height: 38px;
  min-width: ${({ $buttonType }) =>
    $buttonType === "learnMore"
      ? "144px"
      : $buttonType === "apply"
      ? "144px"
      : "110px"};
  cursor: pointer;
  transition: background 0.15s, color 0.15s, transform 0.1s;
  display: flex;
  align-items: center;
  justify-content: center;
  &:active {
    transform: scale(0.97);
  }
`;
