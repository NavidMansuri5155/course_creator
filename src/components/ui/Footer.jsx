import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../AppIcon';

const Footer = ({
  variant = 'standard',
  className = '',
  ...props
}) => {
  const currentYear = new Date().getFullYear();
  
  // Footer navigation links
  const companyLinks = [
    { name: 'About', href: '/about' },
    { name: 'Careers', href: '/careers' },
    { name: 'Blog', href: '/blog' },
    { name: 'Press', href: '/press' },
  ];
  
  const productLinks = [
    { name: 'Features', href: '/features' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Integrations', href: '/integrations' },
    { name: 'Enterprise', href: '/enterprise' },
  ];
  
  const resourceLinks = [
    { name: 'Documentation', href: '/docs' },
    { name: 'Guides', href: '/guides' },
    { name: 'Webinars', href: '/webinars' },
    { name: 'API Reference', href: '/api' },
  ];
  
  const supportLinks = [
    { name: 'Help Center', href: '/help' },
    { name: 'Contact Us', href: '/contact' },
    { name: 'Community', href: '/community' },
    { name: 'Status', href: '/status' },
  ];
  
  const studentLinks = [
    { name: 'Learning Resources', href: '/resources' },
    { name: 'Study Groups', href: '/study-groups' },
    { name: 'Career Services', href: '/career-services' },
    { name: 'Student Support', href: '/support' },
  ];
  
  const socialLinks = [
    { name: 'Twitter', href: 'https://twitter.com', icon: 'Twitter' },
    { name: 'Facebook', href: 'https://facebook.com', icon: 'Facebook' },
    { name: 'Instagram', href: 'https://instagram.com', icon: 'Instagram' },
    { name: 'LinkedIn', href: 'https://linkedin.com', icon: 'Linkedin' },
    { name: 'YouTube', href: 'https://youtube.com', icon: 'Youtube' },
  ];
  
  const legalLinks = [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Cookie Policy', href: '/cookies' },
    { name: 'Accessibility', href: '/accessibility' },
  ];
  
  const renderStandardFooter = () => {
    return (
      <footer className="bg-white border-t border-gray-200" aria-labelledby="footer-heading">
        <h2 id="footer-heading" className="sr-only">Footer</h2>
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
          <div className="xl:grid xl:grid-cols-5 xl:gap-8">
            <div className="space-y-8 xl:col-span-1">
              <div className="flex items-center">
                <Icon name="BookOpen" size={28} className="text-primary mr-2" />
                <span className="text-xl font-bold text-gray-900">EduPlatform</span>
              </div>
              <p className="text-gray-500 text-base">
                Making education accessible, engaging, and effective for everyone.
              </p>
              <div className="flex space-x-6">
                {socialLinks.map((item) => (
                  <a key={item.name} href={item.href} className="text-gray-400 hover:text-gray-500" target="_blank" rel="noopener noreferrer">
                    <span className="sr-only">{item.name}</span>
                    <Icon name={item.icon} size={20} />
                  </a>
                ))}
              </div>
            </div>
            <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-4">
              <div className="md:grid md:grid-cols-2 md:gap-8">
                <div>
                  <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Company</h3>
                  <ul role="list" className="mt-4 space-y-4">
                    {companyLinks.map((item) => (
                      <li key={item.name}>
                        <Link to={item.href} className="text-base text-gray-500 hover:text-gray-900">
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-12 md:mt-0">
                  <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Product</h3>
                  <ul role="list" className="mt-4 space-y-4">
                    {productLinks.map((item) => (
                      <li key={item.name}>
                        <Link to={item.href} className="text-base text-gray-500 hover:text-gray-900">
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="md:grid md:grid-cols-2 md:gap-8">
                <div>
                  <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Resources</h3>
                  <ul role="list" className="mt-4 space-y-4">
                    {resourceLinks.map((item) => (
                      <li key={item.name}>
                        <Link to={item.href} className="text-base text-gray-500 hover:text-gray-900">
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-12 md:mt-0">
                  <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Support</h3>
                  <ul role="list" className="mt-4 space-y-4">
                    {supportLinks.map((item) => (
                      <li key={item.name}>
                        <Link to={item.href} className="text-base text-gray-500 hover:text-gray-900">
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-12 border-t border-gray-200 pt-8">
            <div className="flex flex-col md:flex-row justify-between">
              <p className="text-base text-gray-400">&copy; {currentYear} EduPlatform, Inc. All rights reserved.</p>
              <div className="mt-4 md:mt-0 flex space-x-6">
                {legalLinks.map((item) => (
                  <Link key={item.name} to={item.href} className="text-sm text-gray-500 hover:text-gray-900">
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  };
  
  const renderMinimalFooter = () => {
    return (
      <footer className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center">
              <Icon name="BookOpen" size={20} className="text-primary mr-2" />
              <span className="text-sm font-medium text-gray-900">EduPlatform</span>
            </div>
            <div className="mt-4 md:mt-0">
              <p className="text-sm text-gray-500">&copy; {currentYear} EduPlatform, Inc. All rights reserved.</p>
            </div>
            <div className="mt-4 md:mt-0 flex space-x-6">
              {legalLinks.map((item) => (
                <Link key={item.name} to={item.href} className="text-xs text-gray-500 hover:text-gray-900">
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </footer>
    );
  };
  
  const renderStudentViewFooter = () => {
    return (
      <footer className="bg-white border-t border-gray-200" aria-labelledby="footer-heading">
        <h2 id="footer-heading" className="sr-only">Footer</h2>
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
          <div className="xl:grid xl:grid-cols-3 xl:gap-8">
            <div className="space-y-8 xl:col-span-1">
              <div className="flex items-center">
                <Icon name="BookOpen" size={28} className="text-primary mr-2" />
                <span className="text-xl font-bold text-gray-900">EduPlatform</span>
              </div>
              <p className="text-gray-500 text-base">
                Your learning journey starts here. Access world-class education anytime, anywhere.
              </p>
              <div className="flex space-x-6">
                {socialLinks.map((item) => (
                  <a key={item.name} href={item.href} className="text-gray-400 hover:text-gray-500" target="_blank" rel="noopener noreferrer">
                    <span className="sr-only">{item.name}</span>
                    <Icon name={item.icon} size={20} />
                  </a>
                ))}
              </div>
            </div>
            <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
              <div>
                <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Student Resources</h3>
                <ul role="list" className="mt-4 space-y-4">
                  {studentLinks.map((item) => (
                    <li key={item.name}>
                      <Link to={item.href} className="text-base text-gray-500 hover:text-gray-900">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Support</h3>
                <ul role="list" className="mt-4 space-y-4">
                  {supportLinks.map((item) => (
                    <li key={item.name}>
                      <Link to={item.href} className="text-base text-gray-500 hover:text-gray-900">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          
          <div className="mt-12 border-t border-gray-200 pt-8">
            <div className="flex flex-col md:flex-row justify-between">
              <p className="text-base text-gray-400">&copy; {currentYear} EduPlatform, Inc. All rights reserved.</p>
              <div className="mt-4 md:mt-0 flex space-x-6">
                {legalLinks.map((item) => (
                  <Link key={item.name} to={item.href} className="text-sm text-gray-500 hover:text-gray-900">
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          
          <div className="mt-8 border-t border-gray-200 pt-8">
            <div className="bg-primary-light rounded-lg p-6">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="mb-4 md:mb-0">
                  <h3 className="text-lg font-medium text-gray-900">Need help with your courses?</h3>
                  <p className="mt-1 text-sm text-gray-500">Our support team is here to assist you 24/7.</p>
                </div>
                <div className="flex space-x-4">
                  <Link
                    to="/help"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                  >
                    <Icon name="HelpCircle" size={18} className="mr-2" />
                    Get Help
                  </Link>
                  <Link
                    to="/contact"
                    className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                  >
                    <Icon name="MessageCircle" size={18} className="mr-2" />
                    Contact Us
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  };
  
  // Render the appropriate footer variant
  switch (variant) {
    case 'minimal':
      return renderMinimalFooter();
    case 'student-view':
      return renderStudentViewFooter();
    default:
      return renderStandardFooter();
  }
};

export default Footer;