// components/Card.tsx

import React, { useState } from "react";
import styled from "styled-components";
// 버튼, 이미지, 아이콘 등 외부 리소스 import
import GotoMapButtonSvg from "../assets/buttons/GotoMapButton.svg";
import LearnMoreButtonSvg from "../assets/buttons/LearnMoreButton.svg";
import ApplyButtonSvg from "../assets/buttons/ApplyButton.svg";
import EducationDummyImage from "../assets/dummyImage/EducationDummyImage.svg";
import UnBookmarkIcon from "../assets/icons/UnBookmarkIcon.svg";
import BookmarkIcon from "../assets/icons/BookmarkIcon.svg";

// Card 컴포넌트: 교육 카드 UI를 렌더링
const Card: React.FC = () => {
  // 북마크 상태 관리
  const [bookmarked, setBookmarked] = useState(false);

  // 북마크 버튼 클릭 핸들러
  const handleBookmarkClick = () => {
    setBookmarked((prev) => !prev);
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
      {/* 카드 대표 이미지 */}
      <CardImage src={EducationDummyImage} alt="워크숍 이미지" />
      {/* 카드 상세 정보 영역 */}
      <CardTextBox>
        <CardRow>
          <CardLabel>일시</CardLabel>
          <CardTextRight>2025.04.22 (화)</CardTextRight>
        </CardRow>
        <CardRow>
          <CardLabel>방식</CardLabel>
          <CardTextRight>오프라인</CardTextRight>
        </CardRow>
        <CardRow>
          <CardLabel>주소</CardLabel>
          <CardTextRight>서울특별시 성수구</CardTextRight>
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
        <IconButton
          as="button"
          type="button"
          tabIndex={0}
          aria-label="자세히 보기"
        >
          <img src={LearnMoreButtonSvg} alt="자세히 보기" />
        </IconButton>
        <IconButton
          as="button"
          type="button"
          tabIndex={0}
          aria-label="신청하기"
        >
          <img src={ApplyButtonSvg} alt="신청하기" />
        </IconButton>
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
  width: 100%;
  max-width: 500px;
  min-width: 400px;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  position: relative;
  height: 100%;
`;

// 카드 상단 태그 스타일
const CardTag = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #5c7cfd;
  font-weight: 600;
  font-size: 0.9rem;
  border: 1.5px solid #5c7cfd;
  border-radius: 999px;
  padding: 0.15em 1.1em;
  background: #fff;
  margin-bottom: 10px;
  letter-spacing: 0.01em;
  box-sizing: border-box;
  min-width: 32px;
  min-height: 22px;
  line-height: 1;
  user-select: none;
  /* 가로 길이 최소화 */
  width: 80px;
  max-width: 120px;
`;

// 카드 제목 및 북마크 버튼 행 스타일
const CardTitleRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 12px;
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

// 카드 대표 이미지 스타일
const CardImage = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: 12px;
  margin-bottom: 18px;
  background: #f3f3f3;
`;

// 카드 상세 정보 영역 스타일
const CardTextBox = styled.div`
  font-size: 1.05rem;
  line-height: 1.5;
  margin-bottom: 18px;
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
  &:not(:first-child) {
    margin-left: auto;
  }
  &:not(:last-child) {
    margin-right: 8px;
  }
  &:active {
    transform: scale(0.95);
  }
`;
