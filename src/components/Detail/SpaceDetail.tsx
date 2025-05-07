import styled from "styled-components";
import { ApiSpaceDetailResponse } from "../../types/responses";
import CloseArrowIcon from "../../assets/icons/CloseArrowIcon.svg";
import BookMarkIconButton from "../Button/BookMarkIconButton";
import GotoApplyButton from "../Button/GotoApplyButton";
import GotoMapButton from "../Button/GotoMapButton";
import { breakpoints, colors } from "../../styles/theme";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useAuthStore } from "../../store/useAuthStore";
import { baseURL } from "../../api/api";

interface SpaceDetailProps {
  data: ApiSpaceDetailResponse;
}

const SpaceDetail: React.FC<
  SpaceDetailProps & { onBookmarkChange?: () => void }
> = ({ data, onBookmarkChange }) => {
  const navigate = useNavigate();
  const accessToken = useAuthStore.getState().accessToken;

  const handleBookmark = async () => {
    if (!accessToken) {
      alert("로그인이 필요합니다.");
      return;
    }

    try {
      await axios.post(
        `${baseURL}/api/space/bookmark?access_token=${accessToken}`,
        { spaceId: data.spaceId }
      );

      onBookmarkChange?.();
    } catch (error) {
      console.error("북마크 실패", error);
      alert("북마크 요청 중 오류가 발생했습니다.");
    }
  };

  return (
    <Wrapper>
      <Header>
        <img
          src={CloseArrowIcon}
          alt=""
          onClick={() => navigate(-1)}
          style={{ cursor: "pointer" }}
        />
        <HeaderText>무료공간</HeaderText>
        <BookMarkIconButton
          handleBookmark={handleBookmark}
          isBookmarked={data.bookmarked}
        />
      </Header>
      <Title>{data.spaceName}</Title>
      <ContentContainer>
        <Image src={data.spaceImage} alt="공간 이미지" />
        <Description>
          <LeftText>이용시간</LeftText>
          <RightText>{data.spaceTime}</RightText>
        </Description>
        <Description>
          <LeftText>대상자</LeftText>
          <RightText>{data.spaceTarget}</RightText>
        </Description>
        <Description>
          <LeftText>주소</LeftText>
          <RightText>{data.spaceLocation}</RightText>
        </Description>
        <Description>
          <LeftText>전화번호</LeftText>
          <RightText>{data.contactNumber}</RightText>
        </Description>
        <Description>
          <LeftText>상세설명</LeftText>
        </Description>
        <div>{data.spaceContent}</div>
      </ContentContainer>
      <ButtonContainer>
        <GotoMapButton type="space" />
        <GotoApplyButton type="apply" url={data.spaceUrl} />
      </ButtonContainer>
    </Wrapper>
  );
};

// styled-components 그대로 유지
// ...

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 600px;
  gap: 30px;

  @media (max-width: ${breakpoints.md}) {
    width: 100%;
  }
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const Title = styled.div`
  font-size: 24px;
  font-weight: bold;

  @media (max-width: ${breakpoints.md}) {
    font-size: 18px;
  }
`;

const HeaderText = styled.div`
  font-size: 24px;

  @media (max-width: ${breakpoints.md}) {
    font-size: 18px;
  }
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 20px;
`;

const Image = styled.img`
  width: 100%;
  height: 350px;
  object-fit: cover;
  border-radius: 10px;
`;

const Description = styled.div`
  display: flex;
  align-items: start;
  justify-content: space-between;
  width: 100%;
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  width: 100%;
  gap: 20px;
`;

const LeftText = styled.div`
  width: 60px;
  flex-shrink: 0;
  color: ${colors.gray[500]};
`;

const RightText = styled.div`
  flex: 1;
  word-break: break-word;
  white-space: pre-wrap;
  text-align: right;
`;
export default SpaceDetail;
