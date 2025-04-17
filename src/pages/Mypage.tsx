import React from "react";
import styled from "styled-components";
import { useAuthStore } from "../store/useAuthStore";

const Mypage: React.FC = () => {
  const { user } = useAuthStore();

  return (
    <MypageContainer>
      <h1>마이페이지</h1>
    </MypageContainer>
  );
};

const MypageContainer = styled.div`
  padding: 20px;
`;

export default Mypage;
