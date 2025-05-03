import {
  DISTRICT_OPTIONS,
  SPACE_FACILITY_OPTIONS,
  SPACE_TARGET_OPTIONS,
  SpaceFilterType,
} from "../../types/filters";
import { Dropdown } from "./Dropdown";
import { useSpaceFilterStore } from "../../store/useSpaceFilterStore";

interface SpaceDropdownProps {
  type: SpaceFilterType;
}

export const SpaceDropdown = ({ type }: SpaceDropdownProps) => {
  const { district, target, facility, setDistrict, setTarget, setFacility } =
    useSpaceFilterStore();

  if (type === "district") {
    return (
      <Dropdown
        value={district}
        options={DISTRICT_OPTIONS}
        placeholder="지역구"
        onChange={setDistrict}
      />
    );
  }

  if (type === "target") {
    return (
      <Dropdown
        value={target}
        options={SPACE_TARGET_OPTIONS}
        placeholder="대상자"
        onChange={setTarget}
      />
    );
  }

  if (type === "facility") {
    return (
      <Dropdown
        value={facility}
        options={SPACE_FACILITY_OPTIONS}
        placeholder="시설유형"
        onChange={setFacility}
      />
    );
  }

  return null;
};
