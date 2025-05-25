import React from "react";
import { Link } from "react-router-dom";
import Icon from "../../../components/AppIcon";

const Header = () => {
  return (
    <header className="bg-white border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Icon
                name="BookOpen"
                size={24}
                className="text-primary mr-2"
              />
              <span className="font-bold text-lg text-text-primary">
                Course Creator
              </span>
            </Link>
            
            <nav className="hidden md:ml-10 md:flex md:space-x-8">
              <Link
                to="/course-creator-dashboard"
                className="text-text-secondary hover:text-primary px-3 py-2 text-sm font-medium"
              >
                Dashboard
              </Link>
              <Link
                to="/student-analytics"
                className="text-primary border-b-2 border-primary px-3 py-2 text-sm font-medium"
                aria-current="page"
              >
                Analytics
              </Link>
              <Link
                to="#"
                className="text-text-secondary hover:text-primary px-3 py-2 text-sm font-medium"
              >
                Courses
              </Link>
              <Link
                to="#"
                className="text-text-secondary hover:text-primary px-3 py-2 text-sm font-medium"
              >
                Students
              </Link>
            </nav>
          </div>
          
          <div className="flex items-center">
            <button
              type="button"
              className="p-2 rounded-full text-text-secondary hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <Icon name="Bell" size={20} />
            </button>
            <button
              type="button"
              className="ml-3 p-2 rounded-full text-text-secondary hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <Icon name="HelpCircle" size={20} />
            </button>
            <div className="ml-3 relative">
              <div className="flex items-center">
                <button
                  type="button"
                  className="flex items-center max-w-xs rounded-full focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <img
                    className="h-8 w-8 rounded-full object-cover"
                    src="https://randomuser.me/api/portraits/women/81.jpg"
                    alt="User profile"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className="md:hidden border-t border-border">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link
            to="/course-creator-dashboard"
            className="text-text-secondary hover:text-primary block px-3 py-2 rounded-md text-base font-medium"
          >
            Dashboard
          </Link>
          <Link
            to="/student-analytics"
            className="bg-primary-light text-primary block px-3 py-2 rounded-md text-base font-medium"
            aria-current="page"
          >
            Analytics
          </Link>
          <Link
            to="#"
            className="text-text-secondary hover:text-primary block px-3 py-2 rounded-md text-base font-medium"
          >
            Courses
          </Link>
          <Link
            to="#"
            className="text-text-secondary hover:text-primary block px-3 py-2 rounded-md text-base font-medium"
          >
            Students
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;