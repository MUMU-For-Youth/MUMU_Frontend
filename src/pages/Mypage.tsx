import React from "react";
import styled from "styled-components";
import { useAuthStore } from "../store/useAuthStore";
import SlidingPanel from "../components/SlidingPanel";
import CalendarComponent from "../components/Calendar/CalendarComponent";
import SlidingTopBar from "../components/SlidingTopBar";

const Mypage: React.FC = () => {
  const { user } = useAuthStore();

  return (
    <MypageContainer>
      <SlidingPanel
        content={
          <>
            <CalendarComponent />
          </>
        }
      />
      <SlidingTopBar />
      <SlidingPanel />
    </MypageContainer>
  );
};

const MypageContainer = styled.div`
  position: relative;
`;

export default Mypage;
