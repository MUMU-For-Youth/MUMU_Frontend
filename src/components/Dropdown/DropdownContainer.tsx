import React from "react";
import { EduDropdown } from "./EduDropdown";
import styled from "styled-components";
import { SpaceDropdown } from "./SpaceDropdown";
import SelectedFiltersEducation from "./SelectedFilteresEducation";
import SelectedFiltersSpace from "./SelectedFilteresSpace";

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

      {/* 선택된 필터 출력은 드롭다운 아래에 항상 보여줌 */}
      {type === "education" && <SelectedFiltersEducation absolute={absolute} />}
      {type === "space" && <SelectedFiltersSpace absolute={absolute} />}
    </>
  );
};

const Wrapper = styled.div<{ $absolute?: boolean }>`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  margin-top: 16px;
  justify-content: ${({ $absolute }) =>
    $absolute ? "flex-end" : "start"}; // ✅ 오른쪽 정렬

  ${({ $absolute }) =>
    $absolute &&
    `
    position: absolute;
    top: 30px;
    right: 20px;
    z-index: 999;
  `};
`;

export default DropdownContainer;
