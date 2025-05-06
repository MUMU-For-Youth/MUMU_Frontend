import React, { useState } from "react";
import styled from "styled-components";
import BookmarkOff from "../../assets/icons/UnBookmarkIcon.svg";
import BookmarkOn from "../../assets/icons/BookmarkIcon.svg";
import { useAuthStore } from "../../store/useAuthStore";

interface BookMarkIconButtonProps {
  handleBookmark: () => void; // 외부에서 전달받을 클릭 핸들러
  isBookmarked: boolean;
}

const BookMarkIconButton: React.FC<BookMarkIconButtonProps> = ({
  handleBookmark,
  isBookmarked,
}) => {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  const handleClick = () => {
    if (!isAuthenticated) {
      alert("로그인 후 사용 가능합니다.");
      return;
    }

    handleBookmark(); // 전달받은 핸들러 실행 (API 호출 등)
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
