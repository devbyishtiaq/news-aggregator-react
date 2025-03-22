import useClickOutside from "../../hooks/use-click-outside";
import { ChevronDown } from "../../assets/icons";
import React, { useState, useRef } from "react";

interface CustomDropdownProps {
  options: { value: string; label: string }[];
  selectedValue: string;
  onChange: (value: string) => void;
}

/**
 * CustomDropdown component provides a dropdown selection interface.
 *
 * It displays a list of options and allows the user to select one.
 * It also uses the `useClickOutside` hook to close the dropdown when
 * the user clicks outside of it.
 *
 * @param options - An array of options to display in the dropdown.
 * @param selectedValue - The currently selected value.
 * @param onChange - A function to call when the selected value changes.
 * @returns JSX.Element
 */

const CustomDropdown: React.FC<CustomDropdownProps> = ({
  options = [],
  selectedValue,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useClickOutside(dropdownRef, () => setIsOpen(false));

  return (
    <div className="relative w-48 cursor-pointer" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-white border border-gray-300 px-3 py-1 cursor-pointer rounded shadow w-full text-left flex justify-between items-center"
      >
        <span>
          {options.find((opt) => opt.value === selectedValue)?.label ||
            "Select an option"}
        </span>
        <ChevronDown />
      </button>

      {isOpen && (
        <div className="absolute mt-1 w-full bg-white border border-gray-300 rounded shadow-md z-10">
          {options?.map((option) => (
            <div
              key={option.value}
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
              className={`px-4 py-2 cursor-pointer hover:bg-gray-200 ${
                selectedValue === option.value ? "bg-gray-100" : ""
              }`}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;

/**
 * Usage example:
 *
 * import CustomDropdown from './CustomDropdown';
 *
 * function MyComponent() {
 * const [selected, setSelected] = useState('option1');
 * const options = [
 * { value: 'option1', label: 'Option 1' },
 * { value: 'option2', label: 'Option 2' },
 * { value: 'option3', label: 'Option 3' },
 * ];
 *
 * return (
 * <CustomDropdown
 * options={options}
 * selectedValue={selected}
 * onChange={setSelected}
 * />
 * );
 * }
 */
