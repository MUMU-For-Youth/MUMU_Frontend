import styled from "styled-components";
import NaverMap from "../components/NaverMap";

const SpaceMap: React.FC = () => {
  return (
    <SpaceMapContainer>
      <NaverMap />
    </SpaceMapContainer>
  );
};

const SpaceMapContainer = styled.div`
  width: 100%;
  height: 100vh;
`;

export default SpaceMap;
