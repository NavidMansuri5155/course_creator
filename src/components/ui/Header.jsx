import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Input from './Input';
import Dropdown from './Dropdown';

const Header = ({
  variant = 'default',
  title,
  subtitle,
  progress,
  onSearch,
  user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    avatar: '/assets/images/avatar.png'
  },
  notifications = [],
  className = '',
  ...props
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  const navigation = [
    { name: 'Dashboard', href: '/course-creator-dashboard', icon: 'LayoutDashboard' },
    { name: 'Course Editor', href: '/course-editor', icon: 'Edit3' },
    { name: 'Student Analytics', href: '/student-analytics', icon: 'BarChart2' },
    { name: 'Course Preview', href: '/course-preview', icon: 'Play' },
  ];
  
  const userMenuOptions = [
    { label: 'Your Profile', value: 'profile', icon: 'User' },
    { label: 'Settings', value: 'settings', icon: 'Settings' },
    { label: 'Help Center', value: 'help', icon: 'HelpCircle' },
    { label: 'Sign out', value: 'signout', icon: 'LogOut' },
  ];
  
  const handleUserMenuSelect = (option) => {
    setIsMenuOpen(false);
    // Handle menu item selection
    console.log('Selected:', option.value);
  };
  
  const handleNotificationClick = (notification) => {
    // Handle notification click
    console.log('Notification clicked:', notification);
  };
  
  const toggleUserMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (isNotificationsOpen) setIsNotificationsOpen(false);
  };
  
  const toggleNotifications = () => {
    setIsNotificationsOpen(!isNotificationsOpen);
    if (isMenuOpen) setIsMenuOpen(false);
  };
  
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  
  const renderDefaultHeader = () => {
    return (
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            {/* Logo and Navigation */}
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <Link to="/" className="flex items-center">
                  <Icon name="BookOpen" size={28} className="text-primary mr-2" />
                  <span className="text-xl font-bold text-gray-900">EduPlatform</span>
                </Link>
              </div>
              
              {/* Desktop Navigation */}
              <nav className="hidden md:ml-6 md:flex md:space-x-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`inline-flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                      location.pathname === item.href
                        ? 'text-primary bg-primary-light' :'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                    aria-current={location.pathname === item.href ? 'page' : undefined}
                  >
                    <Icon name={item.icon} size={18} className="mr-1.5" />
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>
            
            {/* Search, Notifications, and Profile */}
            <div className="flex items-center">
              <div className="w-64 max-w-xs hidden md:block">
                <Input
                  type="search"
                  placeholder="Search..."
                  onChange={(e) => onSearch && onSearch(e.target.value)}
                  icon="Search"
                  clearable
                />
              </div>
              
              {/* Notifications */}
              <div className="ml-4 relative">
                <button
                  type="button"
                  className="p-1 rounded-full text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                  onClick={toggleNotifications}
                >
                  <span className="sr-only">View notifications</span>
                  <div className="relative">
                    <Icon name="Bell" size={22} />
                    {notifications.length > 0 && (
                      <span className="absolute -top-1 -right-1 inline-flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-error rounded-full">
                        {notifications.length > 9 ? '9+' : notifications.length}
                      </span>
                    )}
                  </div>
                </button>
                
                {/* Notifications Dropdown */}
                {isNotificationsOpen && (
                  <div className="origin-top-right absolute right-0 mt-2 w-80 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                    <div className="py-2 px-3 border-b border-gray-200">
                      <h3 className="text-sm font-medium text-gray-900">Notifications</h3>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {notifications.length > 0 ? (
                        <div className="py-1">
                          {notifications.map((notification) => (
                            <button
                              key={notification.id}
                              className="w-full text-left px-4 py-2 hover:bg-gray-50 focus:outline-none focus:bg-gray-50"
                              onClick={() => handleNotificationClick(notification)}
                            >
                              <div className="flex items-start">
                                <div className={`flex-shrink-0 rounded-full p-1 ${
                                  notification.type === 'success' ? 'bg-success-light text-success' :
                                  notification.type === 'warning' ? 'bg-warning-light text-warning' :
                                  notification.type === 'error'? 'bg-error-light text-error' : 'bg-info-light text-info'
                                }`}>
                                  <Icon name={
                                    notification.type === 'success' ? 'CheckCircle' :
                                    notification.type === 'warning' ? 'AlertTriangle' :
                                    notification.type === 'error'? 'AlertCircle' : 'Info'
                                  } size={16} />
                                </div>
                                <div className="ml-3 flex-1">
                                  <p className="text-sm font-medium text-gray-900">{notification.title}</p>
                                  <p className="text-xs text-gray-500">{notification.message}</p>
                                  <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
                                </div>
                              </div>
                            </button>
                          ))}
                        </div>
                      ) : (
                        <div className="py-6 px-4 text-center">
                          <Icon name="Bell" size={24} className="mx-auto text-gray-400" />
                          <p className="mt-2 text-sm text-gray-500">No notifications yet</p>
                        </div>
                      )}
                    </div>
                    {notifications.length > 0 && (
                      <div className="py-1 border-t border-gray-200">
                        <button
                          className="block w-full text-center px-4 py-2 text-sm text-primary hover:bg-gray-50"
                          onClick={() => console.log('Mark all as read')}
                        >
                          Mark all as read
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
              
              {/* Profile dropdown */}
              <div className="ml-4 relative">
                <button
                  type="button"
                  className="flex items-center max-w-xs rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                  onClick={toggleUserMenu}
                >
                  <span className="sr-only">Open user menu</span>
                  <img
                    className="h-8 w-8 rounded-full"
                    src={user.avatar}
                    alt={user.name}
                    onError={(e) => {
                      e.target.src = '/assets/images/no_image.png';
                    }}
                  />
                  <span className="hidden md:flex md:items-center ml-2">
                    <span className="text-sm font-medium text-gray-700 truncate">{user.name}</span>
                    <Icon name="ChevronDown" size={16} className="ml-1 text-gray-400" />
                  </span>
                </button>
                
                {/* User Menu Dropdown */}
                {isMenuOpen && (
                  <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                    <div className="py-1">
                      {userMenuOptions.map((option) => (
                        <button
                          key={option.value}
                          className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                          onClick={() => handleUserMenuSelect(option)}
                        >
                          <Icon name={option.icon} size={16} className="mr-2" />
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              {/* Mobile menu button */}
              <div className="flex items-center md:hidden ml-4">
                <button
                  type="button"
                  className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
                  onClick={toggleMobileMenu}
                >
                  <span className="sr-only">Open main menu</span>
                  <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={24} />
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    location.pathname === item.href
                      ? 'bg-primary-light text-primary' :'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                  aria-current={location.pathname === item.href ? 'page' : undefined}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <div className="flex items-center">
                    <Icon name={item.icon} size={20} className="mr-2" />
                    {item.name}
                  </div>
                </Link>
              ))}
              <div className="pt-2">
                <Input
                  type="search"
                  placeholder="Search..."
                  onChange={(e) => onSearch && onSearch(e.target.value)}
                  icon="Search"
                  clearable
                />
              </div>
            </div>
          </div>
        )}
      </header>
    );
  };
  
  const renderCompactHeader = () => {
    return (
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-14">
            <div className="flex items-center">
              <Link to="/" className="flex items-center">
                <Icon name="BookOpen" size={24} className="text-primary" />
              </Link>
              
              <div className="hidden md:flex md:items-center md:ml-4 space-x-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`inline-flex items-center px-2 py-1 text-sm font-medium rounded-md ${
                      location.pathname === item.href
                        ? 'text-primary' :'text-gray-600 hover:text-gray-900'
                    }`}
                    aria-current={location.pathname === item.href ? 'page' : undefined}
                  >
                    <Icon name={item.icon} size={16} />
                    <span className="sr-only">{item.name}</span>
                  </Link>
                ))}
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <button
                type="button"
                className="p-1 rounded-full text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                onClick={() => console.log('Search')}
              >
                <Icon name="Search" size={20} />
              </button>
              
              <button
                type="button"
                className="p-1 rounded-full text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                onClick={toggleNotifications}
              >
                <div className="relative">
                  <Icon name="Bell" size={20} />
                  {notifications.length > 0 && (
                    <span className="absolute -top-1 -right-1 inline-flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-error rounded-full">
                      {notifications.length > 9 ? '9+' : notifications.length}
                    </span>
                  )}
                </div>
              </button>
              
              <button
                type="button"
                className="flex items-center rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                onClick={toggleUserMenu}
              >
                <img
                  className="h-8 w-8 rounded-full"
                  src={user.avatar}
                  alt={user.name}
                  onError={(e) => {
                    e.target.src = '/assets/images/no_image.png';
                  }}
                />
              </button>
              
              {/* Mobile menu button */}
              <div className="flex items-center md:hidden">
                <button
                  type="button"
                  className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
                  onClick={toggleMobileMenu}
                >
                  <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Notifications Dropdown */}
        {isNotificationsOpen && (
          <div className="origin-top-right absolute right-4 mt-2 w-80 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
            <div className="py-2 px-3 border-b border-gray-200">
              <h3 className="text-sm font-medium text-gray-900">Notifications</h3>
            </div>
            <div className="max-h-96 overflow-y-auto">
              {notifications.length > 0 ? (
                <div className="py-1">
                  {notifications.map((notification) => (
                    <button
                      key={notification.id}
                      className="w-full text-left px-4 py-2 hover:bg-gray-50"
                      onClick={() => handleNotificationClick(notification)}
                    >
                      <div className="flex items-start">
                        <div className={`flex-shrink-0 rounded-full p-1 ${
                          notification.type === 'success' ? 'bg-success-light text-success' :
                          notification.type === 'warning' ? 'bg-warning-light text-warning' :
                          notification.type === 'error'? 'bg-error-light text-error' : 'bg-info-light text-info'
                        }`}>
                          <Icon name={
                            notification.type === 'success' ? 'CheckCircle' :
                            notification.type === 'warning' ? 'AlertTriangle' :
                            notification.type === 'error'? 'AlertCircle' : 'Info'
                          } size={16} />
                        </div>
                        <div className="ml-3 flex-1">
                          <p className="text-sm font-medium text-gray-900">{notification.title}</p>
                          <p className="text-xs text-gray-500">{notification.message}</p>
                          <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="py-6 px-4 text-center">
                  <Icon name="Bell" size={24} className="mx-auto text-gray-400" />
                  <p className="mt-2 text-sm text-gray-500">No notifications yet</p>
                </div>
              )}
            </div>
          </div>
        )}
        
        {/* User Menu Dropdown */}
        {isMenuOpen && (
          <div className="origin-top-right absolute right-4 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
            <div className="py-1">
              {userMenuOptions.map((option) => (
                <button
                  key={option.value}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                  onClick={() => handleUserMenuSelect(option)}
                >
                  <Icon name={option.icon} size={16} className="mr-2" />
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        )}
        
        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    location.pathname === item.href
                      ? 'bg-primary-light text-primary' :'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                  aria-current={location.pathname === item.href ? 'page' : undefined}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <div className="flex items-center">
                    <Icon name={item.icon} size={20} className="mr-2" />
                    {item.name}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </header>
    );
  };
  
  const renderCourseViewHeader = () => {
    return (
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/course-creator-dashboard" className="flex items-center text-gray-500 hover:text-gray-700">
                <Icon name="ArrowLeft" size={20} className="mr-1" />
                <span className="text-sm font-medium">Back to Dashboard</span>
              </Link>
              
              <div className="ml-6">
                <h1 className="text-xl font-semibold text-gray-900">{title || 'Course Title'}</h1>
                {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {progress !== undefined && (
                <div className="hidden md:flex items-center">
                  <div className="w-48 bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-primary h-2.5 rounded-full" 
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                  <span className="ml-2 text-sm font-medium text-gray-700">{progress}%</span>
                </div>
              )}
              
              <button
                type="button"
                className="p-1 rounded-full text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                onClick={toggleNotifications}
              >
                <div className="relative">
                  <Icon name="Bell" size={20} />
                  {notifications.length > 0 && (
                    <span className="absolute -top-1 -right-1 inline-flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-error rounded-full">
                      {notifications.length > 9 ? '9+' : notifications.length}
                    </span>
                  )}
                </div>
              </button>
              
              <button
                type="button"
                className="flex items-center rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                onClick={toggleUserMenu}
              >
                <img
                  className="h-8 w-8 rounded-full"
                  src={user.avatar}
                  alt={user.name}
                  onError={(e) => {
                    e.target.src = '/assets/images/no_image.png';
                  }}
                />
              </button>
            </div>
          </div>
          
          {/* Mobile progress bar */}
          {progress !== undefined && (
            <div className="md:hidden pb-2">
              <div className="flex items-center">
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-primary h-2.5 rounded-full" 
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <span className="ml-2 text-sm font-medium text-gray-700">{progress}%</span>
              </div>
            </div>
          )}
        </div>
        
        {/* Notifications Dropdown */}
        {isNotificationsOpen && (
          <div className="origin-top-right absolute right-4 mt-2 w-80 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
            <div className="py-2 px-3 border-b border-gray-200">
              <h3 className="text-sm font-medium text-gray-900">Notifications</h3>
            </div>
            <div className="max-h-96 overflow-y-auto">
              {notifications.length > 0 ? (
                <div className="py-1">
                  {notifications.map((notification) => (
                    <button
                      key={notification.id}
                      className="w-full text-left px-4 py-2 hover:bg-gray-50"
                      onClick={() => handleNotificationClick(notification)}
                    >
                      <div className="flex items-start">
                        <div className={`flex-shrink-0 rounded-full p-1 ${
                          notification.type === 'success' ? 'bg-success-light text-success' :
                          notification.type === 'warning' ? 'bg-warning-light text-warning' :
                          notification.type === 'error'? 'bg-error-light text-error' : 'bg-info-light text-info'
                        }`}>
                          <Icon name={
                            notification.type === 'success' ? 'CheckCircle' :
                            notification.type === 'warning' ? 'AlertTriangle' :
                            notification.type === 'error'? 'AlertCircle' : 'Info'
                          } size={16} />
                        </div>
                        <div className="ml-3 flex-1">
                          <p className="text-sm font-medium text-gray-900">{notification.title}</p>
                          <p className="text-xs text-gray-500">{notification.message}</p>
                          <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="py-6 px-4 text-center">
                  <Icon name="Bell" size={24} className="mx-auto text-gray-400" />
                  <p className="mt-2 text-sm text-gray-500">No notifications yet</p>
                </div>
              )}
            </div>
          </div>
        )}
        
        {/* User Menu Dropdown */}
        {isMenuOpen && (
          <div className="origin-top-right absolute right-4 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
            <div className="py-1">
              {userMenuOptions.map((option) => (
                <button
                  key={option.value}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                  onClick={() => handleUserMenuSelect(option)}
                >
                  <Icon name={option.icon} size={16} className="mr-2" />
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </header>
    );
  };
  
  // Render the appropriate header variant
  const renderHeader = () => {
    switch (variant) {
      case 'compact':
        return renderCompactHeader();
      case 'course-view':
        return renderCourseViewHeader();
      default:
        return renderDefaultHeader();
    }
  };
  
  return (
    <div className={className} {...props}>
      {/* Skip to content link for accessibility */}
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:p-4 focus:bg-white focus:z-50 focus:text-primary">
        Skip to content
      </a>
      
      {renderHeader()}
    </div>
  );
};

export default Header;