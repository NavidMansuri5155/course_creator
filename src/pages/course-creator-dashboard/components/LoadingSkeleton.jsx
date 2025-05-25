import React from "react";

const LoadingSkeleton = () => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden animate-pulse">
      {/* Thumbnail skeleton */}
      <div className="h-40 bg-gray-200"></div>
      
      <div className="p-4">
        {/* Title and status skeleton */}
        <div className="flex items-start justify-between mb-4">
          <div className="h-6 bg-gray-200 rounded w-3/4"></div>
          <div className="h-5 bg-gray-200 rounded w-1/5"></div>
        </div>
        
        {/* Description skeleton */}
        <div className="space-y-2 mb-4">
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        </div>
        
        {/* Stats skeleton */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-5 bg-gray-200 rounded w-2/3"></div>
          </div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-5 bg-gray-200 rounded w-2/3"></div>
          </div>
        </div>
      </div>
      
      {/* Footer skeleton */}
      <div className="border-t border-gray-200 px-4 py-3 bg-gray-50">
        <div className="h-4 bg-gray-200 rounded w-1/3"></div>
      </div>
    </div>
  );
};

export default LoadingSkeleton;