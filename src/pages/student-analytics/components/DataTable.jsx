import React from "react";
import Icon from "../../../components/AppIcon";
import Image from "../../../components/AppImage";

const DataTable = ({ students, sortConfig, onSort }) => {
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getTimeAgo = (date) => {
    const now = new Date();
    const diffInDays = Math.floor(
      (now - new Date(date)) / (1000 * 60 * 60 * 24)
    );

    if (diffInDays === 0) {
      return "Today";
    } else if (diffInDays === 1) {
      return "Yesterday";
    } else if (diffInDays < 7) {
      return `${diffInDays} days ago`;
    } else if (diffInDays < 30) {
      const weeks = Math.floor(diffInDays / 7);
      return `${weeks} ${weeks === 1 ? "week" : "weeks"} ago`;
    } else {
      return formatDate(date);
    }
  };

  const getSortIcon = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === "asc" ? "ArrowUp" : "ArrowDown";
    }
    return "ArrowUpDown";
  };

  const getProgressColor = (progress) => {
    if (progress < 30) return "bg-error";
    if (progress < 70) return "bg-warning";
    return "bg-success";
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-border">
        <thead className="bg-surface">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider"
            >
              <button
                className="flex items-center focus:outline-none focus:text-primary"
                onClick={() => onSort("name")}
                aria-label="Sort by student name"
              >
                Student
                <Icon
                  name={getSortIcon("name")}
                  size={16}
                  className="ml-1 text-text-tertiary"
                />
              </button>
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider"
            >
              <button
                className="flex items-center focus:outline-none focus:text-primary"
                onClick={() => onSort("enrollmentDate")}
                aria-label="Sort by enrollment date"
              >
                Enrollment Date
                <Icon
                  name={getSortIcon("enrollmentDate")}
                  size={16}
                  className="ml-1 text-text-tertiary"
                />
              </button>
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider"
            >
              <button
                className="flex items-center focus:outline-none focus:text-primary"
                onClick={() => onSort("progress")}
                aria-label="Sort by progress"
              >
                Progress
                <Icon
                  name={getSortIcon("progress")}
                  size={16}
                  className="ml-1 text-text-tertiary"
                />
              </button>
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider"
            >
              <button
                className="flex items-center focus:outline-none focus:text-primary"
                onClick={() => onSort("lastActivity")}
                aria-label="Sort by last activity"
              >
                Last Activity
                <Icon
                  name={getSortIcon("lastActivity")}
                  size={16}
                  className="ml-1 text-text-tertiary"
                />
              </button>
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-border">
          {students.map((student) => (
            <tr key={student.id} className="hover:bg-surface">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full overflow-hidden">
                    <Image
                      src={student.avatar}
                      alt={student.name}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-text-primary">
                      {student.name}
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-text-secondary">
                  {formatDate(student.enrollmentDate)}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2 max-w-[100px]">
                    <div
                      className={`h-2.5 rounded-full ${getProgressColor(
                        student.progress
                      )}`}
                      style={{ width: `${student.progress}%` }}
                      aria-label={`${student.progress}% complete`}
                      role="progressbar"
                      aria-valuenow={student.progress}
                      aria-valuemin="0"
                      aria-valuemax="100"
                    ></div>
                  </div>
                  <span className="text-sm text-text-secondary">
                    {student.progress}%
                  </span>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">
                {getTimeAgo(student.lastActivity)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;