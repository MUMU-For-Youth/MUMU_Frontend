// pages/EducationList.tsx

import React from "react";
import styled from "styled-components";
import Card from "../components/Card";

const EducationList: React.FC = () => {
  return (
    <EducationListContainer>
      <h1>무료 교육 목록</h1>
      <CardGrid>
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </CardGrid>
    </EducationListContainer>
  );
};

export default EducationList;

const EducationListContainer = styled.div`
  padding: 20px;
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
  margin-top: 20px;

  @media (min-width: 600px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 960px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
`;
