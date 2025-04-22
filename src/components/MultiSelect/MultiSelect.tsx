import React, { useState, useRef, useEffect } from "react";
import "./MultiSelect.scss";

export interface Option {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

interface MultiSelectProps {
  options: Option[];
  placeholder?: string;
  onSelectionChange?: (selectedOptions: Option[]) => void;
  allowAddNew?: boolean;
}

const MultiSelect: React.FC<MultiSelectProps> = ({
  options: initialOptions,
  placeholder = "Select...",
  onSelectionChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);
  const [options, setOptions] = useState<Option[]>(initialOptions);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (onSelectionChange) {
      onSelectionChange(selectedOptions);
    }
  }, [selectedOptions, onSelectionChange]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const toggleOption = (option: Option) => {
    setSelectedOptions((prev) => {
      const isSelected = prev.some((item) => item.id === option.id);
      if (isSelected) {
        return prev.filter((item) => item.id !== option.id);
      } else {
        return [...prev, option];
      }
    });
  };

  const isOptionSelected = (option: Option) => {
    return selectedOptions.some((item) => item.id === option.id);
  };

  return (
    <div className="multi-select-container" ref={dropdownRef}>
      <div className="multi-select-header" onClick={toggleDropdown}>
        <div className="multi-select-placeholder">
          {selectedOptions.length > 0
            ? selectedOptions.map((option) => option.label).join(", ")
            : placeholder}
        </div>
        <div className="multi-select-arrow">{isOpen ? "▲" : "▼"}</div>
      </div>

      {isOpen && (
        <div className="multi-select-dropdown">
          {options.map((option) => (
            <div
              key={option.id}
              className={`multi-select-option ${
                isOptionSelected(option) ? "selected" : ""
              }`}
              onClick={() => toggleOption(option)}
            >
              {option.icon && (
                <span className="option-icon">{option.icon}</span>
              )}
              <span className="option-label">{option.label}</span>
              {isOptionSelected(option) && (
                <span className="check-mark">✓</span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MultiSelect;
