import styled from "styled-components";
import NaverMap from "../components/NaverMap";
import SlidingPanel from "../components/SlidingPanel";
import DropdownContainer from "../components/Dropdown/DropdownContainer";

const EducationMap: React.FC = () => {
  return (
    <EducationMapContainer>
      <SlidingPanel />
      {/* <Dropdown /> */}
      <DropdownContainer type="education" />
      <NaverMap />
    </EducationMapContainer>
  );
};

const EducationMapContainer = styled.div`
  width: 100%;
  height: 100vh;
  position: relative;
`;

export default EducationMap;
