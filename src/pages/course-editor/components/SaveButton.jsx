import React from "react";
import Icon from "../../../components/AppIcon";

const SaveButton = ({ onClick, isLoading }) => {
  return (
    <button
      onClick={onClick}
      disabled={isLoading}
      className={`inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
        isLoading 
          ? "bg-primary bg-opacity-70 cursor-not-allowed" :"bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
      }`}
    >
      {isLoading ? (
        <>
          <Icon name="Loader" size={16} className="mr-2 animate-spin" />
          Saving...
        </>
      ) : (
        <>
          <Icon name="Save" size={16} className="mr-2" />
          Save
        </>
      )}
    </button>
  );
};

export default SaveButton;