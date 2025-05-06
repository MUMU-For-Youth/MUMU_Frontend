import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { baseURL } from "../api/api";
import { useAuthStore } from "../store/useAuthStore";
import axios from "axios";

const KakaoCallback: React.FC = () => {
  const navigate = useNavigate();
  const { setAccessToken } = useAuthStore();

  useEffect(() => {
    const handleCallback = async () => {
      const code = new URL(window.location.href).searchParams.get("code");
      if (!code) return;

      try {
        const res = await axios.post(`${baseURL}/auth/kakao/callback`, {
          code,
        });
        const { accessToken } = res.data;

        // 상태에 저장
        setAccessToken(accessToken);
        localStorage.setItem("accessToken", accessToken); // 새로고침 대비

        navigate("/"); // 로그인 후 홈으로 이동
      } catch (err) {
        console.error("카카오 로그인 콜백 처리 실패", err);
      }
    };

    handleCallback();
  }, [navigate, setAccessToken]);

  return <div>로그인 처리 중입니다...</div>;
};

export default KakaoCallback;
