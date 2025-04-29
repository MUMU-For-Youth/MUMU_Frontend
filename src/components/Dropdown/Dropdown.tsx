interface DropdownProps<T> {
  value: T | null;
  options: T[];
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
    <select value={value || ""} onChange={(e) => onChange(e.target.value as T)}>
      <option value="">{placeholder}</option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};
