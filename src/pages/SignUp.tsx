import React from "react";
import styled from "styled-components";
import { useAuthStore } from "../store/useAuthStore";
import { useScreenStore } from "../store/useScreenStore";
import KakaoLoginButton from "../assets/buttons/KakaoLoginButton.svg";
import GoogleLoginButton from "../assets/buttons/GoogleLoginButton.svg";
import { breakpoints, colors } from "../styles/theme";
import { baseURL } from "../api/api";
import LogoWithText from "../assets/logo/LogoWithText.svg";

const SignUpContainer = styled.div<{ $isMobile: boolean }>`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${({ $isMobile }) => ($isMobile ? "50px" : "100px")};
  height: 100vh;
  position: ${({ $isMobile }) => ($isMobile ? "fixed" : "relative")};
  top: ${({ $isMobile }) => ($isMobile ? "0" : "auto")};
  left: ${({ $isMobile }) => ($isMobile ? "0" : "auto")};
  overflow: ${({ $isMobile }) => ($isMobile ? "hidden" : "auto")};
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const LoginButton = styled.button`
  border: none;
  width: 300px;
  border-radius: 50px;
  overflow: hidden;
  padding: 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    height: auto;
    display: block;
  }
`;

const LoginText = styled.div`
  font-size: 25px;
  font-weight: bold;
  color: ${colors.primary};

  @media (max-width: ${breakpoints.md}) {
    width: 300px;
    font-size: 20px;
    text-align: center;
  }
`;

const SignUp: React.FC = () => {
  const { setUser } = useAuthStore();
  const { isMobile } = useScreenStore();

  const handleKakaoLogin = async () => {
    try {
      const res = await fetch(`${baseURL}/auth/kakao/url`);
      const { url } = await res.json();
      window.location.href = `${url}&redirect_uri=${window.location.origin}/kakao/callback`;
    } catch (err) {
      console.error("카카오 로그인 URL 요청 실패", err);
    }
  };

  return (
    <SignUpContainer $isMobile={isMobile}>
      <div
        style={{
          width: 180,
          height: 200,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img src={LogoWithText} style={{ width: "300px" }} />
      </div>
      <ButtonContainer>
        <LoginButton onClick={handleKakaoLogin}>
          <img src={KakaoLoginButton} alt="kakao login button" />
        </LoginButton>
        <LoginButton>
          <img src={GoogleLoginButton} alt="google login button" />
        </LoginButton>
      </ButtonContainer>
      <LoginText>
        무료 교육 및 무료 공간을 즐겨찾기 하고 싶다면 로그인을 해주세요!
      </LoginText>
    </SignUpContainer>
  );
};

export default SignUp;
