import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const SideBar = ({
  variant = 'expanded',
  items = [],
  courseModules = [],
  onModuleClick,
  onToggleCollapse,
  className = '',
  ...props
}) => {
  const [isCollapsed, setIsCollapsed] = useState(variant === 'collapsed');
  const location = useLocation();
  
  // Default navigation items if none provided
  const defaultItems = [
    { name: 'Dashboard', href: '/course-creator-dashboard', icon: 'LayoutDashboard' },
    { name: 'Course Editor', href: '/course-editor', icon: 'Edit3' },
    { name: 'Student Analytics', href: '/student-analytics', icon: 'BarChart2' },
    { name: 'Course Preview', href: '/course-preview', icon: 'Play' },
    { name: 'Settings', href: '/settings', icon: 'Settings' },
    { name: 'Help', href: '/help', icon: 'HelpCircle' },
  ];
  
  const navigationItems = items.length > 0 ? items : defaultItems;
  
  // Default course modules if none provided
  const defaultCourseModules = [
    { id: 1, title: 'Introduction', lessons: 3, completed: 3, progress: 100 },
    { id: 2, title: 'Getting Started', lessons: 5, completed: 3, progress: 60 },
    { id: 3, title: 'Core Concepts', lessons: 8, completed: 2, progress: 25 },
    { id: 4, title: 'Advanced Topics', lessons: 6, completed: 0, progress: 0 },
    { id: 5, title: 'Final Project', lessons: 4, completed: 0, progress: 0 },
  ];
  
  const modules = courseModules.length > 0 ? courseModules : defaultCourseModules;
  
  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
    if (onToggleCollapse) {
      onToggleCollapse(!isCollapsed);
    }
  };
  
  const handleModuleClick = (module) => {
    if (onModuleClick) {
      onModuleClick(module);
    }
  };
  
  const renderExpandedSidebar = () => {
    return (
      <div className={`h-full flex flex-col bg-white border-r border-gray-200 ${className}`} {...props}>
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
          <Link to="/" className="flex items-center">
            <Icon name="BookOpen" size={24} className="text-primary mr-2" />
            <span className="text-lg font-bold text-gray-900">EduPlatform</span>
          </Link>
          <button
            type="button"
            className="p-1 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary"
            onClick={toggleCollapse}
          >
            <span className="sr-only">Collapse sidebar</span>
            <Icon name="ChevronsLeft" size={20} />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          <nav className="px-2 py-4 space-y-1">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`group flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                  location.pathname === item.href
                    ? 'bg-primary-light text-primary border-l-4 border-primary' :'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                }`}
                aria-current={location.pathname === item.href ? 'page' : undefined}
              >
                <Icon 
                  name={item.icon} 
                  size={20} 
                  className={`mr-3 flex-shrink-0 ${
                    location.pathname === item.href ? 'text-primary' : 'text-gray-500 group-hover:text-gray-700'
                  }`} 
                />
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
        
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center">
            <img
              className="h-8 w-8 rounded-full"
              src="/assets/images/avatar.png"
              alt="User avatar"
              onError={(e) => {
                e.target.src = '/assets/images/no_image.png';
              }}
            />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-700">John Doe</p>
              <p className="text-xs text-gray-500">Instructor</p>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  const renderCollapsedSidebar = () => {
    return (
      <div className={`h-full flex flex-col bg-white border-r border-gray-200 ${className}`} {...props}>
        <div className="flex items-center justify-center h-16 border-b border-gray-200">
          <button
            type="button"
            className="p-1 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary"
            onClick={toggleCollapse}
          >
            <span className="sr-only">Expand sidebar</span>
            <Icon name="ChevronsRight" size={20} />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          <nav className="px-2 py-4 space-y-1">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`group flex flex-col items-center px-2 py-3 text-xs font-medium rounded-md ${
                  location.pathname === item.href
                    ? 'bg-primary-light text-primary' :'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                }`}
                aria-current={location.pathname === item.href ? 'page' : undefined}
              >
                <Icon 
                  name={item.icon} 
                  size={20} 
                  className={`mb-1 ${
                    location.pathname === item.href ? 'text-primary' : 'text-gray-500 group-hover:text-gray-700'
                  }`} 
                />
                <span className="sr-only">{item.name}</span>
              </Link>
            ))}
          </nav>
        </div>
        
        <div className="p-2 border-t border-gray-200 flex justify-center">
          <img
            className="h-8 w-8 rounded-full"
            src="/assets/images/avatar.png"
            alt="User avatar"
            onError={(e) => {
              e.target.src = '/assets/images/no_image.png';
            }}
          />
        </div>
      </div>
    );
  };
  
  const renderCourseNavigationSidebar = () => {
    return (
      <div className={`h-full flex flex-col bg-white border-r border-gray-200 ${className}`} {...props}>
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Course Content</h2>
          <button
            type="button"
            className="p-1 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary"
            onClick={toggleCollapse}
          >
            <span className="sr-only">Collapse sidebar</span>
            <Icon name="ChevronsLeft" size={20} />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          <div className="px-4 py-5">
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-gray-700">Course Progress</h3>
                <span className="text-sm font-medium text-primary">42%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-primary h-2 rounded-full" style={{ width: '42%' }}></div>
              </div>
            </div>
            
            <div className="space-y-4">
              {modules.map((module) => (
                <div key={module.id} className="border border-gray-200 rounded-md overflow-hidden">
                  <button
                    className={`w-full flex items-center justify-between px-4 py-3 text-left ${
                      module.progress === 100 ? 'bg-success-light' : 'bg-white'
                    }`}
                    onClick={() => handleModuleClick(module)}
                  >
                    <div className="flex items-center">
                      {module.progress === 100 ? (
                        <Icon name="CheckCircle" size={18} className="text-success mr-2" />
                      ) : (
                        <div className="w-5 h-5 rounded-full border-2 border-gray-300 flex items-center justify-center mr-2">
                          <div 
                            className="w-3 h-3 rounded-full bg-primary" 
                            style={{ opacity: module.progress > 0 ? 1 : 0 }}
                          ></div>
                        </div>
                      )}
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">{module.title}</h4>
                        <p className="text-xs text-gray-500">{module.lessons} lessons</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      {module.progress > 0 && module.progress < 100 && (
                        <span className="text-xs font-medium text-gray-500 mr-2">{module.progress}%</span>
                      )}
                      <Icon name="ChevronDown" size={16} className="text-gray-400" />
                    </div>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="p-4 border-t border-gray-200">
          <button
            type="button"
            className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            <Icon name="BookOpen" size={18} className="mr-2" />
            Continue Learning
          </button>
        </div>
      </div>
    );
  };
  
  // Render the appropriate sidebar variant
  if (variant === 'course-navigation') {
    return renderCourseNavigationSidebar();
  }
  
  return isCollapsed ? renderCollapsedSidebar() : renderExpandedSidebar();
};

export default SideBar;