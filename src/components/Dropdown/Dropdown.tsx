import { colors } from "../../styles/theme";
import styled from "styled-components";

interface DropdownProps<T> {
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
  return (
    <Wrapper
      value={value || ""}
      onChange={(e) => onChange(e.target.value as T)}
    >
      <option value="">{placeholder}</option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </Wrapper>
  );
};

const Wrapper = styled.select`
  padding: 0;
  border: none;
  border-radius: 10px;
  width: 120px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  outline: ${colors.gray[500]} solid 1px;
`;
