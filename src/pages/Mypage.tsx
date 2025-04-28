import React from "react";
import styled from "styled-components";
import { useAuthStore } from "../store/useAuthStore";
import SlidingPanel from "../components/SlidingPanel";
import CalendarComponent from "../components/Calendar/CalendarComponent";

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
      <h1>마이페이지</h1>
    </MypageContainer>
  );
};

const MypageContainer = styled.div`
  position: relative;
`;

export default Mypage;
