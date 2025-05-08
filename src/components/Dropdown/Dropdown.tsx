import { useScreenStore } from "../../store/useScreenStore";
import Select from "react-select";

interface OptionType {
  label: string;
  value: string;
}

interface DropdownProps<T extends string> {
  value: T[];
  options: readonly T[];
  placeholder: string;
  onChange: (value: T[]) => void;
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

  const selectedOptions = selectOptions.filter((opt) =>
    value.includes(opt.value as T)
  );

  const isMobile = useScreenStore();

  return (
    <Select<OptionType, true>
      isMulti={true}
      value={selectedOptions}
      onChange={(selected) =>
        onChange(
          (selected as unknown as OptionType[]).map((opt) => opt.value as T)
        )
      }
      options={selectOptions}
      placeholder={placeholder}
      isClearable
      closeMenuOnSelect={false}
      components={{
        MultiValue: () => null,
      }}
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
                padding: "0px",
              }),
              valueContainer: (base) => ({
                ...base,
                padding: "0 5px",
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
