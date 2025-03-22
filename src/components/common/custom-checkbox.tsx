interface CustomCheckboxProps<T> {
  label: string;
  value: T;
  isChecked: boolean;
  onChange: (value: T) => void;
}

const CustomCheckbox = <T,>({
  label,
  value,
  isChecked,
  onChange,
}: CustomCheckboxProps<T>) => {
  return (
    <label className="flex items-center space-x-2 cursor-pointer">
      <input
        type="checkbox"
        checked={isChecked}
        onChange={() => onChange(value)}
        className="w-4 h-4 accent-blue-600 cursor-pointer"
      />
      <span className="text-gray-700">{label}</span>
    </label>
  );
};

export default CustomCheckbox;
