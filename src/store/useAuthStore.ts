import { create } from "zustand";

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  accessToken: string | null;
  setUser: (user: User | null) => void;
  setAccessToken: (token: string | null) => void;
  logout: () => void;
}

//frontend에서 user 로그인 시 useAuthStore 사용법
//useAuthStore.getState().setAccessToken(res.data.accessToken);
//useAuthStore.getState().setUser(res.data.user);

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  accessToken: null,
  isAuthenticated: false,

  setUser: (user) =>
    set((state) => ({
      user,
      isAuthenticated: !!user && !!state.accessToken,
    })),

  setAccessToken: (token) =>
    set((state) => ({
      accessToken: token,
      isAuthenticated: !!token && !!state.user,
    })),

  //frontend에서 로그아웃 시 useAuthStore 사용법
  //useAuthStore.getState().logout();
  logout: () =>
    set({
      user: null,
      accessToken: null,
      isAuthenticated: false,
    }),
}));
