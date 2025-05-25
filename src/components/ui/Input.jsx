import React, { useState } from 'react';
import Icon from '../AppIcon';

const Input = ({
  type = 'text',
  label,
  placeholder,
  value,
  onChange,
  error,
  helperText,
  icon,
  iconPosition = 'left',
  clearable = false,
  disabled = false,
  required = false,
  className = '',
  ...props
}) => {
  const [localValue, setLocalValue] = useState(value || '');
  
  const handleChange = (e) => {
    setLocalValue(e.target.value);
    if (onChange) onChange(e);
  };
  
  const handleClear = () => {
    setLocalValue('');
    if (onChange) {
      const event = {
        target: {
          value: ''
        }
      };
      onChange(event);
    }
  };
  
  const inputClasses = `
    block w-full rounded-md shadow-sm
    ${error ? 'border-error focus:ring-error focus:border-error' : 'border-gray-300 focus:ring-primary focus:border-primary'}
    ${disabled ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : ''}
    ${icon && iconPosition === 'left' ? 'pl-10' : ''}
    ${icon && iconPosition === 'right' || (clearable && localValue) ? 'pr-10' : ''}
    ${className}
  `;
  
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={props.id} className="block text-sm font-medium text-gray-700 mb-1">
          {label}
          {required && <span className="text-error ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        {icon && iconPosition === 'left' && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon name={icon} size={18} className="text-gray-400" />
          </div>
        )}
        
        <input
          type={type}
          className={inputClasses}
          placeholder={placeholder}
          value={localValue}
          onChange={handleChange}
          disabled={disabled}
          required={required}
          {...props}
        />
        
        {icon && iconPosition === 'right' && !clearable && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <Icon name={icon} size={18} className="text-gray-400" />
          </div>
        )}
        
        {clearable && localValue && (
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
            onClick={handleClear}
            aria-label="Clear input"
          >
            <Icon name="X" size={16} className="text-gray-400 hover:text-gray-600" />
          </button>
        )}
      </div>
      
      {(error || helperText) && (
        <p className={`mt-1 text-sm ${error ? 'text-error' : 'text-gray-500'}`}>
          {error || helperText}
        </p>
      )}
    </div>
  );
};

export default Input;