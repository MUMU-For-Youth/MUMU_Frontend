import styled from "styled-components";
import { ApiEduDetailResponse } from "../../types/responses";
import CloseArrowIcon from "../../assets/icons/CloseArrowIcon.svg";
import GotoApplyButton from "../Button/GotoApplyButton";
import GotoMapButton from "../Button/GotoMapButton";
import { breakpoints, colors } from "../../styles/theme";
import { useNavigate } from "react-router-dom";
import BookMarkIconButton from "../Button/BookMarkIconButton";
import { useAuthStore } from "../../store/useAuthStore";
import axios from "axios";
import { baseURL } from "../../api/api";
import { useEffect } from "react";

interface EducationDetailProps {
  data: ApiEduDetailResponse;
  onBookmarkChange?: () => void;
}

// 공백이거나 null이면 "미제공" 표시
const getDisplayValue = (value?: string) =>
  value && value.trim() !== "" ? value : "미제공";

const isMissing = (value?: string) => !value || value.trim() === "";

const EducationDetail: React.FC<EducationDetailProps> = ({
  data,
  onBookmarkChange,
}) => {
  const navigate = useNavigate();

  const handleBookmark = async () => {
    const accessToken = useAuthStore.getState().accessToken;
    if (!accessToken) {
      alert("로그인이 필요합니다.");
      return;
    }

    try {
      await axios.post(
        `${baseURL}/api/edu/bookmark?access_token=${accessToken}`,
        { eduId: data.eduId }
      );
      onBookmarkChange?.();
    } catch (err) {
      console.error("북마크 실패", err);
      alert("북마크 요청 중 오류가 발생했습니다.");
    }
  };

  return (
    <Wrapper>
      <Header>
        <img
          src={CloseArrowIcon}
          alt="닫기"
          onClick={() => navigate(-1)}
          style={{ cursor: "pointer" }}
        />
        <HeaderText>무료교육</HeaderText>
        <BookMarkIconButton
          handleBookmark={handleBookmark}
          isBookmarked={data.bookmarked}
        />
      </Header>
      <Title>{getDisplayValue(data.eduName)}</Title>
      <ContentContainer>
        <Image
          src={data.eduImage || ""}
          alt="교육기관 이미지"
          style={{
            backgroundColor: isMissing(data.eduImage)
              ? colors.gray[100]
              : undefined,
          }}
        />
        <Description>
          <div>일시</div>
          <DescriptionText isEmpty={isMissing(data.eduDate)}>
            {getDisplayValue(data.eduDate)}
          </DescriptionText>
        </Description>
        <Description>
          <div>분야</div>
          <DescriptionText isEmpty={isMissing(data.field)}>
            {getDisplayValue(data.field)}
          </DescriptionText>
        </Description>
        <Description>
          <div>방식</div>
          <DescriptionText isEmpty={isMissing(data.eduMethod)}>
            {getDisplayValue(data.eduMethod)}
          </DescriptionText>
        </Description>
        <Description>
          <div>장소</div>
          <DescriptionText isEmpty={isMissing(data.eduLocationName)}>
            {getDisplayValue(data.eduLocationName)}
          </DescriptionText>
        </Description>
        <Description>
          <div>일정</div>
          <DescriptionText isEmpty={isMissing(data.eduSchedule)}>
            {getDisplayValue(data.eduSchedule)}
          </DescriptionText>
        </Description>
        <Description>
          <div>대상</div>
          <DescriptionText isEmpty={isMissing(data.eduTarget)}>
            {getDisplayValue(data.eduTarget)}
          </DescriptionText>
        </Description>
        <Description>
          <div>모집정원</div>
          <DescriptionText isEmpty={isMissing(data.max_capacity?.toString())}>
            {getDisplayValue(data.max_capacity?.toString())}
          </DescriptionText>
        </Description>
        <Description>
          <div>강사명</div>
          <DescriptionText isEmpty={isMissing(data.eduTeacher)}>
            {getDisplayValue(data.eduTeacher)}
          </DescriptionText>
        </Description>
      </ContentContainer>
      <ButtonContainer>
        <GotoMapButton type="education" eduId={data.eduId} />
        <GotoApplyButton type="apply" url={data.eduUrl} />
      </ButtonContainer>
    </Wrapper>
  );
};

export default EducationDetail;

// styled-components

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
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const DescriptionText = styled.div<{ isEmpty?: boolean }>`
  color: ${({ isEmpty }) => (isEmpty ? colors.gray[400] : "#222")};
  font-size: 1rem;
  text-align: right;
  max-width: 70%;
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  width: 100%;
  gap: 20px;
`;
