import React from "react";
import { Link } from "react-router-dom";
import Icon from "../components/AppIcon";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center">
        <div className="mb-6">
          <Icon name="FileQuestion" size={64} className="mx-auto text-primary" />
        </div>
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Page Not Found</h1>
        <p className="text-lg text-gray-600 mb-8">
          We couldn't find the page you're looking for.
        </p>
        <Link
          to="/course-creator-dashboard"
          className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        >
          <Icon name="ArrowLeft" size={20} className="mr-2" />
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default NotFound;