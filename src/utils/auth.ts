// utils/auth.ts
import axios from "axios";
import { baseURL, loginURL } from "../api/api";

export async function handleKakaoCallback(code: string): Promise<string> {
  const res = await axios.get(`${baseURL}/auth/kakao/callback`, {
    params: { code },
  });
  return res.data.accessToken;
}

// utils/auth.ts
export async function redirectToKakaoLogin() {
  window.location.href = `${loginURL}`;
}
