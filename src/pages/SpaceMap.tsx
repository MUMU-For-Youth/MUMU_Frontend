import styled from "styled-components";
import NaverMap from "../components/NaverMap";
import SlidingPanel from "../components/SlidingPanel";
import DropdownContainer from "../components/Dropdown/DropdownContainer";

const SpaceMap: React.FC = () => {
  return (
    <SpaceMapContainer>
      <SlidingPanel />
      <DropdownContainer type="space" />
      <NaverMap />
    </SpaceMapContainer>
  );
};

const SpaceMapContainer = styled.div`
  width: 100%;
  height: 100vh;
  position: relative;
  overflow-y: hidden;
`;

export default SpaceMap;
