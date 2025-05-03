import {
  DISTRICT_OPTIONS,
  EDU_CATEGORY_OPTIONS,
  EDU_STATUS_OPTIONS,
  EduFilterType,
} from "../../types/filters";
import { useEduFilterStore } from "../../store/useEduFilterStore";
import { Dropdown } from "./Dropdown";

interface EduDropdownProps {
  type: EduFilterType;
}

export const EduDropdown = ({ type }: EduDropdownProps) => {
  const { district, category, status, setDistrict, setCategory, setStatus } =
    useEduFilterStore();

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

  if (type === "category") {
    return (
      <Dropdown
        value={category}
        options={EDU_CATEGORY_OPTIONS}
        placeholder="분야"
        onChange={setCategory}
      />
    );
  }

  if (type === "status") {
    return (
      <Dropdown
        value={status}
        options={EDU_STATUS_OPTIONS}
        placeholder="모집상태"
        onChange={setStatus}
      />
    );
  }

  return null;
};
