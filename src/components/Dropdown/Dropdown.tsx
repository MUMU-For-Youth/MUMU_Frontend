import { useScreenStore } from "../../store/useScreenStore";
import Select from "react-select";

interface OptionType {
  label: string;
  value: string;
}

interface DropdownProps<T extends string> {
  value: T | null;
  options: readonly T[];
  placeholder: string;
  onChange: (value: T) => void;
}

export const Dropdown = <T extends string>({
  value,
  options,
  placeholder,
  onChange,
}: DropdownProps<T>) => {
  const selectOptions: OptionType[] = options.map((opt) => ({
    label: opt,
    value: opt,
  }));
  const isMobile = useScreenStore();

  const selectedOption =
    selectOptions.find((opt) => opt.value === value) || null;

  return (
    <Select
      value={selectedOption}
      onChange={(option) => onChange(option?.value as T)}
      options={selectOptions}
      placeholder={placeholder}
      isClearable
      styles={
        isMobile
          ? {
              control: (base) => ({
                ...base,
                width: "110px",
                fontSize: "11px",
                borderRadius: "10px",
                minHeight: "40px",
              }),
              clearIndicator: (base) => ({
                ...base,
                padding: "0px", // ← 여기서 패딩 조절
              }),
              valueContainer: (base) => ({
                ...base,
                padding: "0 5px", // 여기서 선택된 값 영역 padding 조절
              }),
              option: (base, state) => ({
                ...base,
                fontSize: "11px",
                backgroundColor: state.isSelected
                  ? "#007bff"
                  : state.isFocused
                  ? "#e6f0ff"
                  : "white",
                color: state.isSelected ? "white" : "#333",
              }),
            }
          : {
              control: (base) => ({
                ...base,
                width: "150px",
                fontSize: "14px",
                borderRadius: "10px",
                minHeight: "40px",
              }),
              option: (base, state) => ({
                ...base,
                backgroundColor: state.isSelected
                  ? "#007bff"
                  : state.isFocused
                  ? "#e6f0ff"
                  : "white",
                color: state.isSelected ? "white" : "#333",
              }),
            }
      }
    />
  );
};
