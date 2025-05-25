import React from "react";
import Icon from "../../../components/AppIcon";

const CourseHeader = ({ title, onExit, onToggleSidebar }) => {
  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center">
          <button
            onClick={onToggleSidebar}
            className="mr-4 p-2 rounded-md hover:bg-gray-100 lg:hidden"
            aria-label="Toggle sidebar"
          >
            <Icon name="Menu" size={20} />
          </button>
          <div className="flex items-center">
            <h1 className="text-xl font-semibold text-gray-800 truncate">
              {title}
            </h1>
            <span className="ml-3 px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
              Preview Mode
            </span>
          </div>
        </div>
        <button
          onClick={onExit}
          className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        >
          <Icon name="X" size={18} className="mr-1" />
          Exit Preview
        </button>
      </div>
    </header>
  );
};

export default CourseHeader;