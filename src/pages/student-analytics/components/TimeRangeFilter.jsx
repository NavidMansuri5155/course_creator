import React from "react";

const TimeRangeFilter = ({ activeRange, onRangeChange }) => {
  const ranges = [
    { value: "7", label: "7 Days" },
    { value: "30", label: "30 Days" },
    { value: "90", label: "90 Days" },
  ];

  return (
    <div className="inline-flex rounded-md shadow-sm mt-2 sm:mt-0" role="group">
      {ranges.map((range) => (
        <button
          key={range.value}
          type="button"
          onClick={() => onRangeChange(range.value)}
          className={`px-4 py-2 text-sm font-medium ${
            activeRange === range.value
              ? "bg-primary text-white" :"bg-white text-text-secondary hover:bg-surface"
          } ${
            range.value === "7" ?"rounded-l-md"
              : range.value === "90" ?"rounded-r-md" :""
          } border border-border focus:z-10 focus:ring-2 focus:ring-primary focus:outline-none`}
          aria-pressed={activeRange === range.value}
        >
          {range.label}
        </button>
      ))}
    </div>
  );
};

export default TimeRangeFilter;