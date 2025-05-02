import { createGlobalStyle } from "styled-components";

//나중에 woff2로 변경(성능 최적화를 위함)
export const GlobalFonts = createGlobalStyle`
  @font-face {
    font-family: 'NanumSquareRound';
    src: url('./fonts/YourFont.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'NanumSquareRound';
   src: url('./fonts/NanumSquareRoundB.ttf') format('truetype');
    font-weight: bold;
    font-style: normal;
    font-display: swap;
  }
`;
