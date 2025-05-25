import React from 'react';
import Button from './Button';
import Icon from '../AppIcon';
import Image from '../AppImage';

const Card = ({
  variant = 'standard',
  title,
  subtitle,
  children,
  image,
  imageAlt,
  imagePosition = 'top',
  footer,
  actions,
  icon,
  iconColor,
  onClick,
  className = '',
  headerClassName = '',
  bodyClassName = '',
  footerClassName = '',
  badge,
  badgeColor = 'primary',
  metrics,
  interactive = false,
  selected = false,
  loading = false,
  ...props
}) => {
  const baseClasses = 'rounded-lg overflow-hidden';
  
  const variantClasses = {
    standard: 'bg-white border border-gray-200 shadow-sm',
    interactive: 'bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer',
    course: 'bg-white border border-gray-200 shadow-sm',
    analytics: 'bg-white border border-gray-200 shadow-sm',
    student: 'bg-white border border-gray-200 shadow-sm',
    revenue: 'bg-white border border-gray-200 shadow-sm',
  };
  
  const selectedClasses = selected ? 'ring-2 ring-primary' : '';
  
  const badgeClasses = {
    primary: 'bg-primary text-white',
    secondary: 'bg-gray-100 text-gray-800',
    success: 'bg-success-light text-success',
    error: 'bg-error-light text-error',
    warning: 'bg-warning-light text-warning',
    info: 'bg-info-light text-info',
  };
  
  const handleClick = (e) => {
    if (interactive && onClick) {
      onClick(e);
    }
  };
  
  const renderHeader = () => {
    if (!title && !subtitle && !icon && !badge) return null;
    
    return (
      <div className={`px-4 pt-4 pb-2 flex items-start justify-between ${headerClassName}`}>
        <div className="flex items-center space-x-3">
          {icon && (
            <div className={`rounded-full p-2 ${iconColor || 'bg-primary-light'}`}>
              <Icon name={icon} size={20} className={iconColor ? 'text-white' : 'text-primary'} />
            </div>
          )}
          <div>
            {title && <h3 className="text-lg font-medium text-gray-900">{title}</h3>}
            {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
          </div>
        </div>
        {badge && (
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${badgeClasses[badgeColor]}`}>
            {badge}
          </span>
        )}
      </div>
    );
  };
  
  const renderImage = () => {
    if (!image) return null;
    
    return (
      <div className={imagePosition === 'top' ? 'w-full' : 'w-1/3'}>
        <Image 
          src={image} 
          alt={imageAlt || title || 'Card image'} 
          className={`w-full h-full object-cover ${imagePosition === 'left' ? 'rounded-l-lg' : imagePosition === 'right' ? 'rounded-r-lg' : ''}`}
        />
      </div>
    );
  };
  
  const renderMetrics = () => {
    if (!metrics || !Array.isArray(metrics) || metrics.length === 0) return null;
    
    return (
      <div className="grid grid-cols-2 gap-4 px-4 py-3 bg-gray-50 border-t border-gray-100">
        {metrics.map((metric, index) => (
          <div key={index} className="flex flex-col">
            <span className="text-sm font-medium text-gray-500">{metric.label}</span>
            <span className="text-lg font-semibold text-gray-900">{metric.value}</span>
            {metric.trend && (
              <div className="flex items-center mt-1">
                <Icon 
                  name={metric.trend > 0 ? "TrendingUp" : "TrendingDown"} 
                  size={16} 
                  className={metric.trend > 0 ? "text-success" : "text-error"} 
                />
                <span className={`text-xs ml-1 ${metric.trend > 0 ? "text-success" : "text-error"}`}>
                  {Math.abs(metric.trend)}%
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };
  
  const renderFooter = () => {
    if (!footer && !actions) return null;
    
    return (
      <div className={`px-4 py-3 bg-gray-50 border-t border-gray-100 ${footerClassName}`}>
        {footer || (
          <div className="flex justify-end space-x-2">
            {Array.isArray(actions) && actions.map((action, index) => (
              <Button
                key={index}
                variant={action.variant || (index === actions.length - 1 ? 'primary' : 'secondary')}
                size="sm"
                onClick={action.onClick}
                icon={action.icon}
                disabled={action.disabled}
              >
                {action.label}
              </Button>
            ))}
          </div>
        )}
      </div>
    );
  };
  
  // Determine the layout based on image position
  const getLayoutClasses = () => {
    if (imagePosition === 'left') {
      return 'flex flex-row';
    } else if (imagePosition === 'right') {
      return 'flex flex-row-reverse';
    }
    return '';
  };
  
  if (loading) {
    return (
      <div className={`${baseClasses} ${variantClasses[variant]} ${className} animate-pulse`}>
        <div className="h-48 bg-gray-200"></div>
        <div className="p-4 space-y-3">
          <div className="h-6 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
          </div>
        </div>
        <div className="px-4 py-3 bg-gray-100">
          <div className="h-8 bg-gray-200 rounded w-1/4 ml-auto"></div>
        </div>
      </div>
    );
  }
  
  return (
    <div 
      className={`${baseClasses} ${variantClasses[interactive ? 'interactive' : variant]} ${selectedClasses} ${getLayoutClasses()} ${className}`}
      onClick={handleClick}
      {...props}
    >
      {imagePosition === 'left' || imagePosition === 'right' ? (
        <>
          {renderImage()}
          <div className="flex-1 flex flex-col">
            {renderHeader()}
            <div className={`px-4 py-3 flex-1 ${bodyClassName}`}>{children}</div>
            {renderMetrics()}
            {renderFooter()}
          </div>
        </>
      ) : (
        <>
          {imagePosition === 'top' && renderImage()}
          {renderHeader()}
          <div className={`px-4 py-3 ${bodyClassName}`}>{children}</div>
          {renderMetrics()}
          {renderFooter()}
          {imagePosition === 'bottom' && renderImage()}
        </>
      )}
    </div>
  );
};

export default Card;