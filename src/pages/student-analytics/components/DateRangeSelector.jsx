import React, { useState, useRef, useEffect } from "react";
import Icon from "../../../components/AppIcon";

const DateRangeSelector = ({ dateRange, onDateRangeChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const displayDateRange = `${formatDate(dateRange.startDate)} - ${formatDate(
    dateRange.endDate
  )}`;

  // Predefined date ranges
  const dateRanges = [
    {
      label: "Last 7 days",
      range: {
        startDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        endDate: new Date(),
      },
    },
    {
      label: "Last 30 days",
      range: {
        startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
        endDate: new Date(),
      },
    },
    {
      label: "Last 90 days",
      range: {
        startDate: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000),
        endDate: new Date(),
      },
    },
    {
      label: "This month",
      range: {
        startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
        endDate: new Date(),
      },
    },
    {
      label: "Last month",
      range: {
        startDate: new Date(
          new Date().getFullYear(),
          new Date().getMonth() - 1,
          1
        ),
        endDate: new Date(
          new Date().getFullYear(),
          new Date().getMonth(),
          0
        ),
      },
    },
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className="flex items-center px-4 py-2 bg-white border border-border rounded-md shadow-sm text-sm font-medium text-text-primary hover:bg-surface focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <Icon name="Calendar" size={16} className="mr-2 text-text-secondary" />
        <span>{displayDateRange}</span>
        <Icon
          name={isOpen ? "ChevronUp" : "ChevronDown"}
          size={16}
          className="ml-2 text-text-secondary"
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10 animate-fade-in">
          <div className="py-1" role="menu" aria-orientation="vertical">
            {dateRanges.map((item, index) => (
              <button
                key={index}
                className="w-full text-left px-4 py-2 text-sm text-text-primary hover:bg-surface focus:outline-none focus:bg-surface"
                onClick={() => {
                  onDateRangeChange(item.range);
                  setIsOpen(false);
                }}
                role="menuitem"
              >
                {item.label}
              </button>
            ))}
            <div className="border-t border-border my-1"></div>
            <div className="px-4 py-2">
              <p className="text-xs font-medium text-text-secondary mb-2">
                Custom Range
              </p>
              <div className="flex flex-col space-y-2">
                <div>
                  <label
                    htmlFor="start-date"
                    className="block text-xs text-text-secondary mb-1"
                  >
                    Start Date
                  </label>
                  <input
                    type="date"
                    id="start-date"
                    className="w-full text-sm border border-border rounded-md px-2 py-1 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                    value={dateRange.startDate.toISOString().split("T")[0]}
                    onChange={(e) => {
                      const newStartDate = new Date(e.target.value);
                      onDateRangeChange({
                        ...dateRange,
                        startDate: newStartDate,
                      });
                    }}
                  />
                </div>
                <div>
                  <label
                    htmlFor="end-date"
                    className="block text-xs text-text-secondary mb-1"
                  >
                    End Date
                  </label>
                  <input
                    type="date"
                    id="end-date"
                    className="w-full text-sm border border-border rounded-md px-2 py-1 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                    value={dateRange.endDate.toISOString().split("T")[0]}
                    onChange={(e) => {
                      const newEndDate = new Date(e.target.value);
                      onDateRangeChange({
                        ...dateRange,
                        endDate: newEndDate,
                      });
                    }}
                  />
                </div>
                <button
                  className="w-full bg-primary text-white rounded-md py-1 text-sm font-medium hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  onClick={() => setIsOpen(false)}
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DateRangeSelector;