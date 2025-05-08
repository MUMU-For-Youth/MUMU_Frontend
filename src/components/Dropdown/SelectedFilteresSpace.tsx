import React from "react";
import styled from "styled-components";
import { useSpaceFilterStore } from "../../store/useSpaceFilterStore";
import { colors } from "../../styles/theme";

interface SelectedFiltersSpaceProps {
  absolute?: boolean;
}

const SelectedFiltersSpace: React.FC<SelectedFiltersSpaceProps> = ({
  absolute,
}) => {
  const {
    district,
    target,
    facility,
    setDistrict,
    setTarget,
    setFacility,
    resetFilters,
  } = useSpaceFilterStore();

  const removeFilter = (
    type: "district" | "target" | "facility",
    value: string
  ) => {
    if (type === "district") setDistrict(district.filter((d) => d !== value));
    if (type === "target") setTarget(target.filter((t) => t !== value));
    if (type === "facility") setFacility(facility.filter((f) => f !== value));
  };

  const renderChips = (
    type: "district" | "target" | "facility",
    values: string[]
  ) =>
    values.map((val) => (
      <Chip key={`${type}-${val}`}>
        {val}
        <RemoveButton onClick={() => removeFilter(type, val)}>×</RemoveButton>
      </Chip>
    ));

  return (
    <Wrapper $absolute={absolute}>
      {[
        ...renderChips("district", district),
        ...renderChips("target", target),
        ...renderChips("facility", facility),
      ]}

      {district.length + target.length + facility.length > 0 && (
        <ResetButton onClick={resetFilters}>전체 초기화</ResetButton>
      )}
    </Wrapper>
  );
};

export default SelectedFiltersSpace;

const Wrapper = styled.div<{ $absolute?: boolean }>`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 16px;
  justify-content: ${({ $absolute }) =>
    $absolute ? "flex-end" : "start"}; // ✅ 오른쪽 정렬

  ${({ $absolute }) =>
    $absolute &&
    `
    position: absolute;
    top: 80px;
    right: 20px;
    z-index: 999;
  `};
`;

const Chip = styled.div`
  background-color: ${colors.white};
  border: 1px solid ${colors.primary};
  color: ${colors.primary};
  padding: 6px 10px;
  border-radius: 16px;
  font-size: 13px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
`;

const RemoveButton = styled.button`
  background: none;
  border: none;
  color: ${colors.primary};
  margin-left: 6px;
  font-size: 14px;
  cursor: pointer;
`;

const ResetButton = styled.button`
  background-color: ${colors.white};
  border: 1px solid ${colors.primary};
  color: ${colors.primary};
  padding: 6px 10px;
  border-radius: 16px;
  font-size: 13px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  cursor: pointer;
`;
