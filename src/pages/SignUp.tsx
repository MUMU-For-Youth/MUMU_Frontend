import React, { useState } from "react";
import styled from "styled-components";
import { useAuthStore } from "../store/useAuthStore";

const SignUpContainer = styled.div`
  padding: 20px;
`;

const SignUp: React.FC = () => {
  const { setUser } = useAuthStore();

  return (
    <SignUpContainer>
      <h1>로그인</h1>
    </SignUpContainer>
  );
};

export default SignUp;
