import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useAuthStore } from "../store/useAuthStore";
import SlidingPanel from "../components/SlidingPanel";
import CalendarComponent from "../components/Calendar/CalendarComponent";
import SlidingTopBar from "../components/SlidingTopBar";
import Card from "../components/Card";
import axios from "axios";
import { baseURL } from "../api/api";
import { colors } from "../styles/theme";
import LogoutIcon from "../assets/icons/LogoutIcon.svg";
import { useNavigate } from "react-router-dom";

const Mypage: React.FC = () => {
  const [showEdu, setShowEdu] = useState(true);
  const [eduList, setEduList] = React.useState([]);
  const [spaceList, setSpaceList] = React.useState([]);

  const navigate = useNavigate();

  const fetch = async () => {
    const accessToken = useAuthStore.getState().accessToken;
    if (!accessToken) return;

    try {
      const eduRes = await axios.get(
        `${baseURL}/api/edu/bookmark?access_token=${accessToken}`
      );
      const spaceRes = await axios.get(
        `${baseURL}/api/space/bookmark?access_token=${accessToken}`
      );

      //bookmarked: true 추가
      const eduWithBookmark = eduRes.data.map((edu: any) => ({
        ...edu,
        bookmarked: true,
      }));

      const spaceWithBookmark = spaceRes.data.map((space: any) => ({
        ...space,
        bookmarked: true,
      }));
      setEduList(eduWithBookmark);
      setSpaceList(spaceWithBookmark);
    } catch (err) {
      console.error("즐겨찾기 여부 확인 실패", err);
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  const handleLogout = async () => {
    const accessToken = useAuthStore.getState().accessToken;
    if (!accessToken) return;
    try {
      await axios.post(
        `${baseURL}/auth/kakao/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      useAuthStore.setState({ accessToken: null }); // 메모리 상태도 초기화
      localStorage.removeItem("accessToken");
      alert("로그아웃 되었습니다.");
      navigate("/", { replace: true });
      window.location.reload();
    } catch (err) {
      console.error("로그아웃 실패", err);
      alert("로그아웃 요청 중 오류가 발생했습니다.");
    }
  };

  return (
    <MypageContainer>
      {/* <SlidingPanel
        content={
          <>
            <CalendarComponent />
          </>
        }
      /> */}

      <SlidingTopBar
        onTabChange={(tabKey) => setShowEdu(tabKey === "Education")}
      />

      <ListContainer>
        {showEdu ? (
          eduList.length > 0 ? (
            <CardGrid>
              {eduList.map((edu) => (
                <GridCardWrapper>
                  <Card data={edu} type="education" onBookmarkChange={fetch} />
                </GridCardWrapper>
              ))}
            </CardGrid>
          ) : (
            <EmptyState>북마크한 교육 정보가 없습니다.</EmptyState>
          )
        ) : spaceList.length > 0 ? (
          <CardGrid>
            {spaceList.map((space) => (
              <GridCardWrapper>
                <Card type="space" data={space} onBookmarkChange={fetch} />
              </GridCardWrapper>
            ))}
          </CardGrid>
        ) : (
          <EmptyState>북마크한 공간 정보가 없습니다.</EmptyState>
        )}

        <Logout onClick={handleLogout}>
          <img src={LogoutIcon} style={{ width: "25px" }} />
          로그아웃
        </Logout>
      </ListContainer>
    </MypageContainer>
  );
};

const MypageContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  overflow-y: auto;
  box-sizing: border-box;
  position: relative;

  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const GridCardWrapper = styled.div`
  width: 360px; // 또는 원하는 고정값
  flex-shrink: 0;
`;

const StyledSlidingPanelWrapper = styled.div`
  position: sticky;
  top: 0;
  z-index: 30;
`;

const StyledSlidingPanel = styled(SlidingPanel)`
  position: relative;
  z-index: inherit;
`;

const StyledTopBarWrapper = styled.div`
  width: 100%;
  position: sticky;
  top: 0;
  z-index: 10;
  background: #fff;
  padding: 0 20px;

  @media (max-width: 768px) {
    padding: 0 16px;
  }
`;

const ListContainer = styled.div`
  padding: 32px 20px;
  max-width: 1200px;
  margin: 0 auto;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 24px 16px;
  }
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
  gap: 24px;
`;

const EmptyState = styled.div`
  width: 100%;
  text-align: center;
  font-size: 18px;
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${colors.gray[400]};
  margin: 40px 0;
`;

const Logout = styled.div`
  width: 100%;
  height: 50px;
  color: ${colors.gray}
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  margin-top: 20px;
  display: flex;
  justify-content: end;
  align-items: center;
  gap: 10px;
`;
export default Mypage;
