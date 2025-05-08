import { HashRouter as Router } from "react-router-dom";
import styled from "styled-components";
import { createGlobalStyle } from "styled-components";
import Navigation from "./components/Navigation";
import { colors, fonts, breakpoints } from "./styles/theme";
import { FlexContainer } from "./styles/common";
import { GlobalFonts } from "./styles/fonts";
import AppRoutes from "./routes/AppRoutes";
import { useWindowResizeStoreSync } from "./hooks/useWindowResizeStoreSync";
import { useEffect } from "react";
import { initializeAuth, useAuthStore } from "./store/useAuthStore";
import FilterResetOnRouteChange from "./components/Dropdown/FilterResetOnRouteChange";

//전역 스타일, 폰트 적용
const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
    
  html, body {
    //overflow: hidden;   /* 최악의 경우 body에도 */
  }

  body {
    font-family: ${fonts.body};
    color: ${colors.gray[700]};
    background-color: white;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: ${fonts.heading};
    font-weight: bold;
  }
`;

//전체 페이지 영역(네비게이션 바 포함)
const AppContainer = styled(FlexContainer)`
  min-height: 100vh;
  padding-left: 80px;

  @media (max-width: ${breakpoints.md}) {
    padding-left: 0;
    padding-bottom: 70px;
  }
`;

function App() {
  // 화면 크기 변경 감지 훅 사용
  useWindowResizeStoreSync();

  useEffect(() => {
    initializeAuth(); // auth 상태를 zustand store와 동기화
  }, []);

  return (
    <Router>
      <GlobalStyle />
      <GlobalFonts />
      <FilterResetOnRouteChange />
      {/* 여기부터가 실질적으로 화면에 띄워지는 영역 */}
      <AppContainer>
        {/* 네비게이션 바 */}
        <Navigation />

        {/* 메인 컨텐츠 영역 */}
        <AppRoutes />
      </AppContainer>
    </Router>
  );
}

export default App;
