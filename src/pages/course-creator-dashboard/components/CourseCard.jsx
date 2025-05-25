import React from "react";
import { formatDistanceToNow } from "date-fns";
import Icon from "../../../components/AppIcon";
import Image from "../../../components/AppImage";

const CourseCard = ({ course, onClick }) => {
  const {
    id,
    title,
    description,
    thumbnail,
    status,
    students,
    revenue,
    lastUpdated,
    progress
  } = course;

  // Format the last updated date
  const formattedDate = formatDistanceToNow(new Date(lastUpdated), { addSuffix: true });

  // Format revenue with currency
  const formattedRevenue = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(revenue);

  // Determine status color and icon
  const getStatusInfo = () => {
    switch (status) {
      case 'published':
        return {
          color: 'bg-success-light text-success',
          icon: 'CheckCircle',
          text: 'Published'
        };
      case 'draft':
        return {
          color: 'bg-warning-light text-warning',
          icon: 'Edit3',
          text: 'Draft'
        };
      case 'review':
        return {
          color: 'bg-info-light text-info',
          icon: 'Clock',
          text: 'In Review'
        };
      default:
        return {
          color: 'bg-gray-100 text-gray-600',
          icon: 'HelpCircle',
          text: status
        };
    }
  };

  const statusInfo = getStatusInfo();

  return (
    <div 
      className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200 cursor-pointer"
      onClick={onClick}
      tabIndex={0}
      role="button"
      aria-label={`Edit ${title} course`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onClick();
          e.preventDefault();
        }
      }}
    >
      <div className="relative h-40 overflow-hidden">
        <Image
          src={thumbnail}
          alt={title}
          className="w-full h-full object-cover"
        />
        
        {/* Progress overlay for draft courses */}
        {status === 'draft' && (
          <div className="absolute bottom-0 left-0 right-0 bg-gray-900 bg-opacity-70 px-3 py-1.5">
            <div className="flex items-center justify-between text-white text-xs">
              <span>Completion</span>
              <span>{progress}%</span>
            </div>
            <div className="w-full bg-gray-600 rounded-full h-1.5 mt-1">
              <div 
                className="bg-primary h-1.5 rounded-full" 
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        )}
      </div>
      
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">{title}</h3>
          <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${statusInfo.color} ml-2`}>
            <Icon name={statusInfo.icon} size={12} className="mr-1" />
            {statusInfo.text}
          </span>
        </div>
        
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">{description}</p>
        
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex flex-col">
            <span className="text-gray-500">Students</span>
            <span className="font-medium text-gray-900 flex items-center">
              <Icon name="Users" size={14} className="mr-1 text-gray-400" />
              {students}
            </span>
          </div>
          
          <div className="flex flex-col">
            <span className="text-gray-500">Revenue</span>
            <span className="font-medium text-gray-900 flex items-center">
              <Icon name="DollarSign" size={14} className="mr-1 text-gray-400" />
              {formattedRevenue}
            </span>
          </div>
        </div>
      </div>
      
      <div className="border-t border-gray-200 px-4 py-3 bg-gray-50 text-xs text-gray-500 flex items-center">
        <Icon name="Clock" size={12} className="mr-1" />
        Updated {formattedDate}
      </div>
    </div>
  );
};

export default CourseCard;