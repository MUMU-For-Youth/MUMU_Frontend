import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import { colors, breakpoints } from "../styles/theme";
import { FlexContainer } from "../styles/common";
import { useAuthStore } from "../store/useAuthStore";
import { useScreenStore } from "../store/useScreenStore";
import EducationListIcon from "../assets/icons/EducationListIcon.svg";
import SpaceListIcon from "../assets/icons/SpaceListIcon.svg";
import EducationMapIcon from "../assets/icons/EducationMapIcon.svg";
import SpaceMapIcon from "../assets/icons/SpaceMapIcon.svg";
import MypageIcon from "../assets/icons/MypageIcon.svg";
import LoginIcon from "../assets/icons/LoginIcon.svg";
import LogoutIcon from "../assets/icons/LogoutIcon.svg";
import MUMULogo from "../assets/logo/Logo.svg";
import { baseURL } from "../api/api";
import axios from "axios";

//네비게이션 바 영역(desktop : width 80px, mobile : height 70px)
const NavContainer = styled.nav`
  width: 80px;
  height: 100vh;
  background-color: ${colors.white};
  border-right: 1px solid ${colors.gray[300]};
  display: flex;
  flex-direction: column;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 100;

  @media (max-width: ${breakpoints.md}) {
    width: 100%;
    height: 70px;
    flex-direction: row;
    bottom: 0;
    top: auto;
    border-right: none;
    border-top: 1px solid ${colors.gray[300]};
  }
`;

//로고 영역(데스크톱 : 80*100, 모바일 : 숨김)
const LogoContainer = styled(FlexContainer)`
  justify-content: center;
  align-items: center;
  height: 100px;

  @media (max-width: ${breakpoints.md}) {
    display: none;
  }
`;

//로고 텍스트(데스크톱 : 24px, 모바일 : 숨김) => 나중에 로고 이미지로 변경
const Logo = styled.div`
  font-size: 24px;
  font-weight: bold;
`;

//네비게이션 리스트(desktop : column, mobile : row)
const NavList = styled.div`
  list-style: none;
  padding: 0;
  margin: 0;
  flex: 1;
  display: flex;
  flex-direction: column;

  @media (max-width: ${breakpoints.md}) {
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    width: 100%;
  }
`;

//로그인 컨테이너(dexktop : 하단에 표시, 모바일 : NavList 내부에 표시하므로 숨김)
const LoginContainer = styled.div`
  @media (max-width: ${breakpoints.md}) {
    display: none;
  }
`;

//네비게이션 아이템(desktop : 80*80, mobile : 70*70)
const NavItem = styled.button<{ active: boolean }>`
  border: none;
  display: flex;
  flex-direction: column;
  gap: 8px;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 80px;
  cursor: pointer;
  font-weight: bold;
  background-color: ${(props) =>
    props.active ? colors.secondary : "transparent"};
  color: black;
  transition: all 0.2s ease;

  @media (max-width: ${breakpoints.md}) {
    width: 100%;
    height: 70px;
    flex: 1;
  }

  &:hover {
    background-color: ${colors.gray[200]};
    color: black;
  }
`;

const NavItemIcon = styled.img`
  width: 40px;
  height: 40px;
`;

const Navigation: React.FC = () => {
  const navigate = useNavigate(); // 페이지 이동을 위한 hook
  const location = useLocation(); // 현재 경로 확인을 위한 hook
  const { isAuthenticated } = useAuthStore(); // 로그인 여부 상태
  const { isMobile } = useScreenStore(); // 현재 화면이 모바일인지 여부

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

      useAuthStore.setState({ accessToken: null });
      localStorage.removeItem("accessToken");
      alert("로그아웃 되었습니다.");
      navigate("/", { replace: true });
      window.location.reload();
    } catch (err) {
      console.error("로그아웃 실패", err);
      alert("로그아웃 요청 중 오류가 발생했습니다.");
    }
  };

  // 기본 네비게이션 항목들 (공통)
  const navItems = [
    { path: "/", icon: EducationListIcon, label: "무료교육" },
    { path: "/space-list", icon: SpaceListIcon, label: "무료공간" },
    { path: "/education-map", icon: EducationMapIcon, label: "교육지도" },
    { path: "/space-map", icon: SpaceMapIcon, label: "공간지도" },
  ];

  // 로그인 여부에 따라 마이페이지 또는 로그인 항목 표시
  const signUpItem = { path: "/signup", icon: LoginIcon, label: "로그인" };
  const myPageItem = { path: "/mypage", icon: MypageIcon, label: "MY" };
  const logoutItem = { path: "/logout", icon: LogoutIcon, label: "로그아웃" };

  // 모바일 전용 네비게이션 항목
  const mobileExtraNavItem = isAuthenticated ? myPageItem : signUpItem;

  // 데스크톱 전용 네비게이션 항목 (하단에 표시)
  const desktopExtraNavItem = isAuthenticated ? logoutItem : signUpItem;

  return (
    <NavContainer>
      {/* 로고 영역 (데스크톱 전용) */}
      <LogoContainer>
        <Logo>
          <img src={MUMULogo} alt="MUMU" style={{ width: "70px" }} />
        </Logo>
      </LogoContainer>

      {/* 네비게이션 항목 영역 (화면 크기에 따라 column or row) */}
      <NavList>
        {/* 기본 네비게이션 항목 렌더링 */}
        {navItems.map((item) => (
          <NavItem
            key={item.path}
            active={location.pathname === item.path} // 현재 경로와 일치 시 강조
            onClick={() => navigate(item.path)} // 클릭 시 해당 경로로 이동
          >
            <NavItemIcon src={item.icon} alt={item.label} />
            {item.label}
          </NavItem>
        ))}
        {/* 데스크톱에서는 로그인 시 마이페이지 버튼 표시 */}
        {!isMobile && isAuthenticated && (
          <NavItem
            key={myPageItem.path}
            active={location.pathname === myPageItem.path}
            onClick={() => navigate(myPageItem.path)}
          >
            <NavItemIcon src={myPageItem.icon} alt={myPageItem.label} />
            {myPageItem.label}
          </NavItem>
        )}
        {/* 모바일에서는 로그인 상태에 따라 로그인 또는 마이페이지버튼 표시 */}
        {isMobile && (
          <NavItem
            key={mobileExtraNavItem.path}
            active={location.pathname === mobileExtraNavItem.path}
            onClick={() => navigate(mobileExtraNavItem.path)}
          >
            <NavItemIcon
              src={mobileExtraNavItem.icon}
              alt={mobileExtraNavItem.label}
            />
            {mobileExtraNavItem.label}
          </NavItem>
        )}
      </NavList>

      {/* 데스크톱: 로그인 버튼은 항상 하단 고정 */}
      {!isMobile && (
        <LoginContainer>
          <NavItem
            key={desktopExtraNavItem.path}
            active={location.pathname === desktopExtraNavItem.path}
            onClick={() => {
              if (desktopExtraNavItem.label === "로그아웃") {
                handleLogout();
              } else {
                navigate(desktopExtraNavItem.path);
              }
            }}
          >
            <NavItemIcon
              src={desktopExtraNavItem.icon}
              alt={desktopExtraNavItem.label}
            />
            {desktopExtraNavItem.label}
          </NavItem>
        </LoginContainer>
      )}
    </NavContainer>
  );
};

export default Navigation;
