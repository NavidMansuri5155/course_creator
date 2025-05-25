import React, { useState, useEffect } from "react";

import Icon from "../../components/AppIcon";
import MetricCard from "./components/MetricCard";
import LineChart from "./components/LineChart";
import DataTable from "./components/DataTable";
import DateRangeSelector from "./components/DateRangeSelector";
import Pagination from "./components/Pagination";
import LoadingState from "./components/LoadingState";
import Header from "./components/Header";
import TimeRangeFilter from "./components/TimeRangeFilter";

const StudentAnalytics = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [metrics, setMetrics] = useState(null);
  const [students, setStudents] = useState([]);
  const [timeRange, setTimeRange] = useState("30"); // 7, 30, 90 days
  const [dateRange, setDateRange] = useState({
    startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    endDate: new Date(),
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortConfig, setSortConfig] = useState({
    key: "enrollmentDate",
    direction: "desc",
  });

  // Mock data for metrics
  const mockMetrics = {
    totalEnrollments: 1248,
    completionRate: 68,
    revenue: 24650,
    averageRating: 4.7,
  };

  // Mock data for enrollment trends
  const mockEnrollmentTrends = {
    "7": [
      { date: "May 1", enrollments: 12 },
      { date: "May 2", enrollments: 15 },
      { date: "May 3", enrollments: 10 },
      { date: "May 4", enrollments: 18 },
      { date: "May 5", enrollments: 22 },
      { date: "May 6", enrollments: 20 },
      { date: "May 7", enrollments: 25 },
    ],
    "30": [
      { date: "Apr 8", enrollments: 10 },
      { date: "Apr 12", enrollments: 15 },
      { date: "Apr 16", enrollments: 18 },
      { date: "Apr 20", enrollments: 22 },
      { date: "Apr 24", enrollments: 28 },
      { date: "Apr 28", enrollments: 32 },
      { date: "May 2", enrollments: 38 },
      { date: "May 6", enrollments: 42 },
    ],
    "90": [
      { date: "Feb 1", enrollments: 5 },
      { date: "Feb 15", enrollments: 12 },
      { date: "Mar 1", enrollments: 18 },
      { date: "Mar 15", enrollments: 25 },
      { date: "Apr 1", enrollments: 32 },
      { date: "Apr 15", enrollments: 40 },
      { date: "May 1", enrollments: 48 },
      { date: "May 7", enrollments: 55 },
    ],
  };

  // Mock data for students
  const mockStudents = [
    {
      id: 1,
      name: "Emma Johnson",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      enrollmentDate: new Date(2023, 4, 1),
      progress: 85,
      lastActivity: new Date(2023, 4, 6),
    },
    {
      id: 2,
      name: "Michael Chen",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      enrollmentDate: new Date(2023, 4, 2),
      progress: 62,
      lastActivity: new Date(2023, 4, 7),
    },
    {
      id: 3,
      name: "Sophia Rodriguez",
      avatar: "https://randomuser.me/api/portraits/women/68.jpg",
      enrollmentDate: new Date(2023, 3, 28),
      progress: 100,
      lastActivity: new Date(2023, 4, 5),
    },
    {
      id: 4,
      name: "James Wilson",
      avatar: "https://randomuser.me/api/portraits/men/78.jpg",
      enrollmentDate: new Date(2023, 3, 25),
      progress: 45,
      lastActivity: new Date(2023, 4, 3),
    },
    {
      id: 5,
      name: "Olivia Martinez",
      avatar: "https://randomuser.me/api/portraits/women/25.jpg",
      enrollmentDate: new Date(2023, 3, 20),
      progress: 92,
      lastActivity: new Date(2023, 4, 7),
    },
    {
      id: 6,
      name: "William Taylor",
      avatar: "https://randomuser.me/api/portraits/men/15.jpg",
      enrollmentDate: new Date(2023, 3, 15),
      progress: 78,
      lastActivity: new Date(2023, 4, 2),
    },
    {
      id: 7,
      name: "Ava Brown",
      avatar: "https://randomuser.me/api/portraits/women/33.jpg",
      enrollmentDate: new Date(2023, 3, 10),
      progress: 30,
      lastActivity: new Date(2023, 4, 1),
    },
    {
      id: 8,
      name: "Ethan Davis",
      avatar: "https://randomuser.me/api/portraits/men/42.jpg",
      enrollmentDate: new Date(2023, 3, 5),
      progress: 55,
      lastActivity: new Date(2023, 3, 30),
    },
    {
      id: 9,
      name: "Isabella Garcia",
      avatar: "https://randomuser.me/api/portraits/women/57.jpg",
      enrollmentDate: new Date(2023, 2, 28),
      progress: 88,
      lastActivity: new Date(2023, 4, 4),
    },
    {
      id: 10,
      name: "Alexander Lee",
      avatar: "https://randomuser.me/api/portraits/men/55.jpg",
      enrollmentDate: new Date(2023, 2, 20),
      progress: 72,
      lastActivity: new Date(2023, 3, 25),
    },
  ];

  // Simulate API call to fetch data
  useEffect(() => {
    setLoading(true);
    setError(null);

    // Simulate API delay
    const timer = setTimeout(() => {
      try {
        // Set metrics data
        setMetrics(mockMetrics);

        // Sort students based on current sort configuration
        const sortedStudents = [...mockStudents].sort((a, b) => {
          if (sortConfig.key === "name") {
            return sortConfig.direction === "asc"
              ? a.name.localeCompare(b.name)
              : b.name.localeCompare(a.name);
          } else if (sortConfig.key === "enrollmentDate") {
            return sortConfig.direction === "asc"
              ? a.enrollmentDate - b.enrollmentDate
              : b.enrollmentDate - a.enrollmentDate;
          } else if (sortConfig.key === "progress") {
            return sortConfig.direction === "asc"
              ? a.progress - b.progress
              : b.progress - a.progress;
          } else if (sortConfig.key === "lastActivity") {
            return sortConfig.direction === "asc"
              ? a.lastActivity - b.lastActivity
              : b.lastActivity - a.lastActivity;
          }
          return 0;
        });

        // Set students data with pagination
        setStudents(sortedStudents);
        setTotalPages(Math.ceil(sortedStudents.length / 5));
        setLoading(false);
      } catch (err) {
        setError("Failed to load analytics data. Please try again.");
        setLoading(false);
      }
    }, 1500);

    return () => clearTimeout(timer);
  }, [timeRange, dateRange, sortConfig]);

  const handleTimeRangeChange = (range) => {
    setTimeRange(range);
  };

  const handleDateRangeChange = (range) => {
    setDateRange(range);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSort = (key) => {
    setSortConfig((prevConfig) => ({
      key,
      direction:
        prevConfig.key === key && prevConfig.direction === "asc" ?"desc" :"asc",
    }));
  };

  const handleRetry = () => {
    setLoading(true);
    setError(null);
    // Simulate API call again
    setTimeout(() => {
      setMetrics(mockMetrics);
      setStudents(mockStudents);
      setTotalPages(Math.ceil(mockStudents.length / 5));
      setLoading(false);
    }, 1500);
  };

  // Calculate paginated students
  const paginatedStudents = students.slice(
    (currentPage - 1) * 5,
    currentPage * 5
  );

  return (
    <div className="min-h-screen bg-surface">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-h2 font-bold text-text-primary mb-2">
              Student Analytics
            </h1>
            <p className="text-text-secondary">
              Track student engagement and course performance
            </p>
          </div>
          
          <div className="mt-4 md:mt-0">
            <DateRangeSelector
              dateRange={dateRange}
              onDateRangeChange={handleDateRangeChange}
            />
          </div>
        </div>

        {loading ? (
          <LoadingState type="metrics" />
        ) : error ? (
          <div className="bg-error-light text-error p-4 rounded-lg mb-8">
            <p className="font-medium">{error}</p>
            <button
              onClick={handleRetry}
              className="mt-2 text-sm font-medium flex items-center"
            >
              <Icon name="RefreshCw" size={16} className="mr-1" /> Try Again
            </button>
          </div>
        ) : (
          <>
            {/* Metrics Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <MetricCard
                title="Total Enrollments"
                value={metrics.totalEnrollments}
                icon="Users"
                trend={+12}
                color="primary"
              />
              <MetricCard
                title="Completion Rate"
                value={`${metrics.completionRate}%`}
                icon="Award"
                trend={+5}
                color="success"
              />
              <MetricCard
                title="Revenue"
                value={`$${metrics.revenue.toLocaleString()}`}
                icon="DollarSign"
                trend={+8}
                color="info"
              />
              <MetricCard
                title="Average Rating"
                value={metrics.averageRating}
                icon="Star"
                trend={+0.2}
                color="warning"
              />
            </div>

            {/* Enrollment Trends Chart */}
            <div className="bg-white rounded-lg shadow-sm border border-border p-4 mb-8">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                <h2 className="text-h3 font-semibold text-text-primary">
                  Enrollment Trends
                </h2>
                <TimeRangeFilter
                  activeRange={timeRange}
                  onRangeChange={handleTimeRangeChange}
                />
              </div>
              <div className="h-80">
                <LineChart data={mockEnrollmentTrends[timeRange]} />
              </div>
            </div>

            {/* Students Table */}
            <div className="bg-white rounded-lg shadow-sm border border-border p-4">
              <h2 className="text-h3 font-semibold text-text-primary mb-4">
                Student Activity
              </h2>
              
              {students.length === 0 ? (
                <div className="text-center py-8">
                  <Icon
                    name="Users"
                    size={48}
                    className="mx-auto text-text-tertiary mb-4"
                  />
                  <h3 className="text-h4 font-medium text-text-primary mb-2">
                    No students found
                  </h3>
                  <p className="text-text-secondary mb-4">
                    There are no students enrolled during the selected time period.
                  </p>
                  <button className="bg-primary text-white px-4 py-2 rounded-md font-medium">
                    Adjust Filters
                  </button>
                </div>
              ) : (
                <>
                  <DataTable
                    students={paginatedStudents}
                    sortConfig={sortConfig}
                    onSort={handleSort}
                  />
                  <div className="mt-4">
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={handlePageChange}
                    />
                  </div>
                </>
              )}
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default StudentAnalytics;