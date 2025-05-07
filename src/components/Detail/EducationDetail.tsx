import styled from "styled-components";
import { ApiEduDetailResponse } from "../../types/responses";
import CloseArrowIcon from "../../assets/icons/CloseArrowIcon.svg";
import GotoApplyButton from "../Button/GotoApplyButton";
import GotoMapButton from "../Button/GotoMapButton";
import { breakpoints } from "../../styles/theme";
import { useNavigate } from "react-router-dom";
import BookMarkIconButton from "../Button/BookMarkIconButton";
import { useAuthStore } from "../../store/useAuthStore";
import axios from "axios";
import { baseURL } from "../../api/api";
import { useState } from "react";

interface EducationDetailProps {
  data: ApiEduDetailResponse;
}

const EducationDetail: React.FC<EducationDetailProps> = ({ data }) => {
  const navigate = useNavigate();
  const [bookmarked, setBookmarked] = useState(data.bookmarked);

  const handleBookmark = async () => {
    const accessToken = useAuthStore.getState().accessToken;
    if (!accessToken) {
      alert("로그인이 필요합니다.");
      return;
    }

    try {
      const res = await axios.post(
        `${baseURL}/api/edu/bookmark?access_token=${accessToken}`,
        {
          eduId: data.eduId,
        }
      );
      setBookmarked(res.data.bookmarked); // API 응답 기준으로 동기화
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
          isBookmarked={bookmarked}
        />
      </Header>
      <Title>{data.eduName}</Title>
      <ContentContainer>
        <Image src={data.eduImage} alt="교육기관 이미지" />
        <Description>
          <div>일시</div>
          <div>{data.eduDate}</div>
        </Description>
        <Description>
          <div>분야</div>
          <div>{data.field}</div>
        </Description>
        <Description>
          <div>방식</div>
          <div>{data.eduMethod}</div>
        </Description>
        <Description>
          <div>장소</div>
          <div>{data.eduLocationName}</div>
        </Description>
        <Description>
          <div>일정</div>
          <div>{data.eduSchedule}</div>
        </Description>
        <Description>
          <div>대상</div>
          <div>{data.eduTarget}</div>
        </Description>
        <Description>
          <div>모집정원</div>
          <div>{data.max_capacity}</div>
        </Description>
        <Description>
          <div>강사명</div>
          <div>{data.eduTeacher}</div>
        </Description>
      </ContentContainer>
      <ButtonContainer>
        <GotoMapButton type="education" />
        <GotoApplyButton type="apply" url={data.eduUrl} />
      </ButtonContainer>
    </Wrapper>
  );
};

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

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  width: 100%;
  gap: 20px;
`;

export default EducationDetail;
