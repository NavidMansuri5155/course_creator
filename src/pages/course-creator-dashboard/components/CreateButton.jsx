import React from "react";
import Icon from "../../../components/AppIcon";

const CreateButton = ({ onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors duration-200"
      aria-label="Create new course"
    >
      <Icon name="Plus" size={18} className="mr-2" />
      Create Course
    </button>
  );
};

export default CreateButton;