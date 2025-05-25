import React from "react";
import Icon from "../../../components/AppIcon";

const NavigationControls = ({ onPrevious, onNext, hasPrevious, hasNext }) => {
  return (
    <div className="flex justify-between mt-8 mb-4">
      <button
        onClick={onPrevious}
        disabled={!hasPrevious}
        className={`flex items-center px-4 py-2 rounded-md ${
          hasPrevious
            ? 'text-gray-700 hover:bg-gray-100' :'text-gray-400 cursor-not-allowed'
        }`}
      >
        <Icon name="ChevronLeft" size={20} className="mr-1" />
        Previous
      </button>
      
      <button
        onClick={onNext}
        disabled={!hasNext}
        className={`flex items-center px-4 py-2 rounded-md ${
          hasNext
            ? 'bg-primary text-white hover:bg-primary-hover' :'bg-gray-200 text-gray-500 cursor-not-allowed'
        }`}
      >
        Next
        <Icon name="ChevronRight" size={20} className="ml-1" />
      </button>
    </div>
  );
};

export default NavigationControls;