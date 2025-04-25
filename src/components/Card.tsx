// components/Card.tsx

import React, { useState } from "react";
import styled from "styled-components";
import GotoMapButtonSvg from "../assets/buttons/GotoMapButton.svg";
import LearnMoreButtonSvg from "../assets/buttons/LearnMoreButton.svg";
import ApplyButtonSvg from "../assets/buttons/ApplyButton.svg";
import EducationDummyImage from "../assets/dummyImage/EducationDummyImage.svg";
import UnBookmarkIcon from "../assets/icons/UnBookmarkIcon.svg";
import BookmarkIcon from "../assets/icons/BookmarkIcon.svg";

const Card: React.FC = () => {
  const [bookmarked, setBookmarked] = useState(false);

  const handleBookmarkClick = () => {
    setBookmarked((prev) => !prev);
  };

  return (
    <CardContainer>
      <CardTag>취업</CardTag>
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
      <CardImage src={EducationDummyImage} alt="워크숍 이미지" />
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

const CardTitleRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 12px;
`;

const CardTitle = styled.h2`
  font-size: 1.35rem;
  margin: 0;
  flex: 1;
`;

const BookmarkButton = styled.button`
  background: none;
  border: none;
  padding: 0 0 0 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  height: 32px;
`;

const CardImage = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: 12px;
  margin-bottom: 18px;
  background: #f3f3f3;
`;

const CardTextBox = styled.div`
  font-size: 1.05rem;
  line-height: 1.5;
  margin-bottom: 18px;
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const CardRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 6px;
`;

const CardLabel = styled.div`
  font-weight: bold;
  min-width: 56px;
  color: #b0b0b0;
  font-size: 1.02rem;
  margin-right: 12px;
`;

const CardText = styled.div`
  color: #222;
  font-size: 1.02rem;
  flex: 1;
`;

// 오른쪽 정렬 CardText
const CardTextRight = styled(CardText)`
  text-align: right;
`;

const CardButtonBox = styled.div`
  display: flex;
  align-items: center;
  margin-top: auto;
  padding-top: 8px;
  width: 100%;
  box-sizing: border-box;
`;

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
