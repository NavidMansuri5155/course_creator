import React from "react";

const PublishToggle = ({ isPublished, onChange }) => {
  return (
    <div className="flex items-center">
      <span className="mr-3 text-sm font-medium text-gray-700">
        {isPublished ? "Published" : "Draft"}
      </span>
      <button
        type="button"
        onClick={onChange}
        className={`
          relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer 
          transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary
          ${isPublished ? "bg-primary" : "bg-gray-200"}
        `}
        role="switch"
        aria-checked={isPublished}
      >
        <span className="sr-only">
          {isPublished ? "Unpublish course" : "Publish course"}
        </span>
        <span
          aria-hidden="true"
          className={`
            pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 
            transition ease-in-out duration-200
            ${isPublished ? "translate-x-5" : "translate-x-0"}
          `}
        ></span>
      </button>
    </div>
  );
};

export default PublishToggle;