import React from "react";
import Icon from "../../../components/AppIcon";

const ValidationErrors = ({ errors, onDismiss }) => {
  if (!errors || errors.length === 0) {
    return null;
  }

  return (
    <div className="mb-6 bg-error-light border-l-4 border-error rounded-md p-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <Icon name="AlertTriangle" className="h-5 w-5 text-error" aria-hidden="true" />
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-error">
            Please fix the following issues:
          </h3>
          <div className="mt-2 text-sm text-error">
            <ul className="list-disc pl-5 space-y-1">
              {errors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="ml-auto pl-3">
          <div className="-mx-1.5 -my-1.5">
            <button
              onClick={onDismiss}
              className="inline-flex bg-error-light rounded-md p-1.5 text-error hover:bg-error hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-error"
            >
              <span className="sr-only">Dismiss</span>
              <Icon name="X" className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ValidationErrors;