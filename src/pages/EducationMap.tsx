import styled from "styled-components";
import NaverMap from "../components/NaverMap";

const EducationMap: React.FC = () => {
  return (
    <EducationMapContainer>
      <NaverMap />
    </EducationMapContainer>
  );
};

const EducationMapContainer = styled.div`
  width: 100%;
  height: 100vh;
`;

export default EducationMap;
