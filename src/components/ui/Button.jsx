import React from 'react';
import Icon from '../AppIcon';

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'left',
  fullWidth = false,
  disabled = false,
  loading = false,
  type = 'button',
  onClick,
  className = '',
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-md transition-colors focus-ring';
  
  const variantStyles = {
    primary: 'bg-primary text-white hover:bg-primary-hover active:bg-primary-700 disabled:bg-primary-300 disabled:text-white/70',
    secondary: 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 active:bg-gray-100 disabled:bg-gray-50 disabled:text-gray-400 disabled:border-gray-200',
    tertiary: 'bg-transparent text-primary hover:bg-primary-light hover:bg-opacity-50 active:bg-primary-light disabled:text-gray-400',
    danger: 'bg-error text-white hover:bg-error/90 active:bg-red-700 disabled:bg-red-300 disabled:text-white/70',
    success: 'bg-success text-white hover:bg-success/90 active:bg-green-700 disabled:bg-green-300 disabled:text-white/70',
    icon: 'bg-transparent text-gray-700 hover:bg-gray-100 active:bg-gray-200 disabled:text-gray-400',
  };
  
  const sizeStyles = {
    sm: 'text-xs px-2.5 py-1.5 gap-1.5',
    md: 'text-sm px-4 py-2 gap-2',
    lg: 'text-base px-6 py-3 gap-2.5',
    xl: 'text-lg px-7 py-4 gap-3',
  };
  
  // Special case for icon-only buttons
  const iconOnlyStyles = {
    sm: '!p-1.5',
    md: '!p-2',
    lg: '!p-2.5',
    xl: '!p-3',
  };
  
  const isIconOnly = icon && !children;
  
  const buttonClasses = [
    baseStyles,
    variantStyles[variant],
    isIconOnly ? iconOnlyStyles[size] : sizeStyles[size],
    fullWidth ? 'w-full' : '',
    disabled || loading ? 'cursor-not-allowed' : 'cursor-pointer',
    className
  ].join(' ');
  
  const iconSize = {
    sm: 16,
    md: 18,
    lg: 20,
    xl: 24,
  }[size];
  
  const renderIcon = () => {
    if (loading) {
      return <Icon name="Loader2" className="animate-spin" size={iconSize} />;
    }
    if (icon) {
      return <Icon name={icon} size={iconSize} />;
    }
    return null;
  };
  
  return (
    <button
      type={type}
      className={buttonClasses}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {loading && !icon && iconPosition === 'left' && renderIcon()}
      {icon && iconPosition === 'left' && renderIcon()}
      {children}
      {icon && iconPosition === 'right' && renderIcon()}
      {loading && !icon && iconPosition === 'right' && renderIcon()}
    </button>
  );
};

export default Button;