import React, { useState, useRef, useEffect } from 'react';
import Icon from '../AppIcon';

const Dropdown = ({
  options = [],
  value,
  onChange,
  placeholder = 'Select an option',
  label,
  error,
  disabled = false,
  required = false,
  className = '',
  renderOption,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  // Find the selected option
  const selectedOption = options.find(option => 
    typeof option === 'object' ? option.value === value : option === value
  );
  
  const toggleDropdown = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };
  
  const handleSelect = (option) => {
    if (onChange) {
      onChange(typeof option === 'object' ? option.value : option);
    }
    setIsOpen(false);
  };
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  // Handle keyboard navigation
  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
    } else if (e.key === 'ArrowDown' && !isOpen) {
      setIsOpen(true);
    }
  };
  
  return (
    <div className={`relative ${className}`} ref={dropdownRef} {...props}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
          {required && <span className="text-error ml-1">*</span>}
        </label>
      )}
      
      <button
        type="button"
        className={`
          relative w-full bg-white border rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm
          ${error ? 'border-error' : 'border-gray-300'}
          ${disabled ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : ''}
        `}
        onClick={toggleDropdown}
        onKeyDown={handleKeyDown}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        disabled={disabled}
      >
        <span className="block truncate">
          {selectedOption ? 
            (typeof selectedOption === 'object' ? selectedOption.label : selectedOption) : 
            <span className="text-gray-400">{placeholder}</span>
          }
        </span>
        <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
          <Icon name="ChevronDown" size={16} className="text-gray-400" />
        </span>
      </button>
      
      {isOpen && (
        <div className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
          <ul tabIndex="-1" role="listbox" aria-labelledby="listbox-label" aria-activedescendant="listbox-option-0">
            {options.map((option, index) => {
              const optionValue = typeof option === 'object' ? option.value : option;
              const optionLabel = typeof option === 'object' ? option.label : option;
              const isSelected = optionValue === value;
              
              return (
                <li
                  key={index}
                  id={`listbox-option-${index}`}
                  className={`
                    cursor-default select-none relative py-2 pl-3 pr-9 hover:bg-gray-100
                    ${isSelected ? 'text-primary bg-primary-light' : 'text-gray-900'}
                  `}
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => handleSelect(option)}
                >
                  {renderOption ? (
                    renderOption(option, isSelected)
                  ) : (
                    <>
                      <span className={`block truncate ${isSelected ? 'font-medium' : 'font-normal'}`}>
                        {optionLabel}
                      </span>
                      
                      {isSelected && (
                        <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-primary">
                          <Icon name="Check" size={16} />
                        </span>
                      )}
                    </>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      )}
      
      {error && (
        <p className="mt-1 text-sm text-error">{error}</p>
      )}
    </div>
  );
};

export default Dropdown;