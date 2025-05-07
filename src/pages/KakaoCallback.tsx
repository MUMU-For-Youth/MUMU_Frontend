// pages/KakaoCallback.tsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { handleKakaoCallback } from "../utils/auth";

const KakaoCallback: React.FC = () => {
  const navigate = useNavigate();
  const { setAccessToken } = useAuthStore();

  useEffect(() => {
    const code = new URLSearchParams(window.location.hash.split("?")[1]).get(
      "code"
    );
    console.log("code:", code);
    if (!code) return;

    handleKakaoCallback(code)
      .then((accessToken) => {
        setAccessToken(accessToken);
        localStorage.setItem("accessToken", accessToken);
        navigate("/");
      })
      .catch((err) => {
        console.error("카카오 로그인 콜백 처리 실패", err);
        // 사용자에게 피드백도 고려 가능
      });
  }, [navigate, setAccessToken]);

  return <div>로그인 처리 중입니다...</div>;
};

export default KakaoCallback;
