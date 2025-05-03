import React, { useState } from "react";
import styled from "styled-components";
import BookmarkOff from "../../assets/icons/UnBookmarkIcon.svg";
import BookmarkOn from "../../assets/icons/BookmarkIcon.svg";

const BookMarkIconButton: React.FC = () => {
  const [isBookmarked, setIsBookmarked] = useState(false);

  const handleClick = () => {
    setIsBookmarked((prev) => !prev);
    // TODO: 여기에 북마크 API 연동 추가 가능
  };

  return (
    <Button onClick={handleClick} aria-label="북마크 토글 버튼">
      {isBookmarked ? (
        <img src={BookmarkOn} alt="북마크됨" />
      ) : (
        <img src={BookmarkOff} alt="북마크 안 됨" />
      )}
    </Button>
  );
};

export default BookMarkIconButton;

// ================== styled-components ==================

const Button = styled.button`
  background: none;
  border: none;
  padding: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 10px;

  img {
    width: 24px;
    height: 24px;
  }

  &:active {
    transform: scale(0.95);
  }
`;
