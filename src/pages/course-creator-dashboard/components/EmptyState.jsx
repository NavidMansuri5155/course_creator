import React from "react";
import Icon from "../../../components/AppIcon";

const EmptyState = ({ searchQuery, onClear, onCreate }) => {
  // If there's a search query, show "no results" state
  if (searchQuery) {
    return (
      <div className="text-center py-12 px-4 bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 mb-4">
          <Icon name="Search" size={24} className="text-gray-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No courses found</h3>
        <p className="text-sm text-gray-500 mb-6 max-w-md mx-auto">
          We couldn't find any courses matching "{searchQuery}". Try adjusting your search terms.
        </p>
        <button
          onClick={onClear}
          className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        >
          <Icon name="X" size={16} className="mr-2" />
          Clear Search
        </button>
      </div>
    );
  }

  // Default empty state for no courses
  return (
    <div className="text-center py-16 px-4 bg-white rounded-lg border border-gray-200 shadow-sm">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-light mb-6">
        <Icon name="BookOpen" size={32} className="text-primary" />
      </div>
      <h3 className="text-xl font-medium text-gray-900 mb-2">Create your first course</h3>
      <p className="text-base text-gray-500 mb-8 max-w-md mx-auto">
        Get started by creating your first course. You'll be able to add content, quizzes, and publish it to your students.
      </p>
      
      <div className="space-y-4 max-w-md mx-auto mb-8">
        <div className="flex items-start">
          <div className="flex-shrink-0 inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary-light text-primary">
            1
          </div>
          <div className="ml-4 text-left">
            <h4 className="text-sm font-medium text-gray-900">Create a course</h4>
            <p className="text-sm text-gray-500">Start with a title and basic information about your course.</p>
          </div>
        </div>
        
        <div className="flex items-start">
          <div className="flex-shrink-0 inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary-light text-primary">
            2
          </div>
          <div className="ml-4 text-left">
            <h4 className="text-sm font-medium text-gray-900">Add content</h4>
            <p className="text-sm text-gray-500">Upload videos, create quizzes, and organize your curriculum.</p>
          </div>
        </div>
        
        <div className="flex items-start">
          <div className="flex-shrink-0 inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary-light text-primary">
            3
          </div>
          <div className="ml-4 text-left">
            <h4 className="text-sm font-medium text-gray-900">Publish and share</h4>
            <p className="text-sm text-gray-500">Make your course available to students and start earning.</p>
          </div>
        </div>
      </div>
      
      <button
        onClick={onCreate}
        className="inline-flex items-center px-5 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors duration-200"
      >
        <Icon name="Plus" size={20} className="mr-2" />
        Create Your First Course
      </button>
    </div>
  );
};

export default EmptyState;