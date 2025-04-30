import React from "react";
import { EduDropdown } from "./EduDropdown";
import styled from "styled-components";
import { SpaceDropdown } from "./SpaceDropdown";

interface DropdownContainerProps {
  type: "education" | "space";
}

const DropdownContainer: React.FC<DropdownContainerProps> = ({ type }) => {
  return (
    <>
      {type === "space" && (
        <Wrapper>
          <SpaceDropdown type={"district"} />
          <SpaceDropdown type={"target"} />
          <SpaceDropdown type={"facility"} />
        </Wrapper>
      )}
      {type === "education" && (
        <Wrapper>
          <EduDropdown type={"district"} />
          <EduDropdown type={"category"} />
          <EduDropdown type={"status"} />
        </Wrapper>
      )}
    </>
  );
};

const Wrapper = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  z-index: 10;
  display: flex;
  gap: 10px;
`;

export default DropdownContainer;
