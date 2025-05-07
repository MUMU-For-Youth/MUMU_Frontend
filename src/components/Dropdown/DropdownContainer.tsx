import React from "react";
import { EduDropdown } from "./EduDropdown";
import styled from "styled-components";
import { SpaceDropdown } from "./SpaceDropdown";

interface DropdownContainerProps {
  type: "education" | "space";
  absolute?: boolean; // 기본은 false
}
const DropdownContainer: React.FC<DropdownContainerProps> = ({
  type,
  absolute = false,
}) => {
  return (
    <>
      {type === "space" && (
        <Wrapper $absolute={absolute}>
          <SpaceDropdown type={"district"} />
          <SpaceDropdown type={"target"} />
          <SpaceDropdown type={"facility"} />
        </Wrapper>
      )}
      {type === "education" && (
        <Wrapper $absolute={absolute}>
          <EduDropdown type={"district"} />
          <EduDropdown type={"category"} />
          <EduDropdown type={"status"} />
        </Wrapper>
      )}
    </>
  );
};

const Wrapper = styled.div<{ $absolute?: boolean }>`
  position: ${({ $absolute }) => ($absolute ? "absolute" : "static")};
  top: ${({ $absolute }) => ($absolute ? "30px" : "unset")};
  left: ${({ $absolute }) => ($absolute ? "20px" : "unset")};
  z-index: 1000;
  display: flex;
  gap: 10px;
  width: 100%;
  @media (max-width: 600px) {
    left: ${({ $absolute }) => ($absolute ? "0" : "unset")};
  }
`;

export default DropdownContainer;
