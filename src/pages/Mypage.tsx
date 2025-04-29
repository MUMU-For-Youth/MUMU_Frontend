import React from "react";
import styled from "styled-components";
import { useAuthStore } from "../store/useAuthStore";
import SlidingPanel from "../components/SlidingPanel";
import SlidingTopBar from "../components/SlidingTopBar";

const Mypage: React.FC = () => {
  const { user } = useAuthStore();

  return (
    <MypageContainer>
      <SlidingTopBar />
      <SlidingPanel />
    </MypageContainer>
  );
};

const MypageContainer = styled.div`
  position: relative;
`;

export default Mypage;
