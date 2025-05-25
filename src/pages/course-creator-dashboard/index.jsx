import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "../../components/AppIcon";
import Header from "../../components/ui/Header";
import CourseCard from "./components/CourseCard";
import CreateButton from "./components/CreateButton";
import EmptyState from "./components/EmptyState";
import LoadingSkeleton from "./components/LoadingSkeleton";

const CourseCreatorDashboard = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // Mock notifications for the header
  const notifications = [
    {
      id: 1,
      type: "success",
      title: "Course Published",
      message: "Your course \'React Fundamentals\' has been published successfully.",
      time: "2 hours ago"
    },
    {
      id: 2,
      type: "info",
      title: "New Enrollment",
      message: "A new student has enrolled in \'Advanced JavaScript Patterns\'.",
      time: "5 hours ago"
    },
    {
      id: 3,
      type: "warning",
      title: "Review Pending",
      message: "Your course \'Data Structures\' is pending review. Please check requirements.",
      time: "1 day ago"
    }
  ];

  // Mock course data
  const mockCourses = [
    {
      id: 1,
      title: "React Fundamentals",
      description: "Learn the core concepts of React including components, state, props, and hooks.",
      thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      status: "published",
      students: 128,
      revenue: 3840,
      lastUpdated: "2023-11-15T14:48:00.000Z",
      progress: 100
    },
    {
      id: 2,
      title: "Advanced JavaScript Patterns",
      description: "Master advanced JavaScript patterns and techniques used by professional developers.",
      thumbnail: "https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg?auto=compress&cs=tinysrgb&w=800",
      status: "published",
      students: 85,
      revenue: 2550,
      lastUpdated: "2023-10-22T09:30:00.000Z",
      progress: 100
    },
    {
      id: 3,
      title: "Data Structures & Algorithms",
      description: "Comprehensive guide to data structures and algorithms with practical examples.",
      thumbnail: "https://images.pixabay.com/photo/2016/11/19/14/00/code-1839406_1280.jpg",
      status: "draft",
      students: 0,
      revenue: 0,
      lastUpdated: "2023-12-01T16:20:00.000Z",
      progress: 65
    },
    {
      id: 4,
      title: "Full Stack Web Development",
      description: "Build complete web applications with modern frontend and backend technologies.",
      thumbnail: "https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      status: "draft",
      students: 0,
      revenue: 0,
      lastUpdated: "2023-11-28T11:15:00.000Z",
      progress: 42
    },
    {
      id: 5,
      title: "UI/UX Design Principles",
      description: "Learn the fundamental principles of creating effective and beautiful user interfaces.",
      thumbnail: "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800",
      status: "published",
      students: 56,
      revenue: 1680,
      lastUpdated: "2023-09-18T08:45:00.000Z",
      progress: 100
    },
    {
      id: 6,
      title: "Machine Learning Basics",
      description: "Introduction to machine learning concepts, algorithms, and practical applications.",
      thumbnail: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      status: "draft",
      students: 0,
      revenue: 0,
      lastUpdated: "2023-12-05T13:20:00.000Z",
      progress: 28
    }
  ];

  // Fetch courses (simulated with setTimeout)
  useEffect(() => {
    const fetchCourses = async () => {
      setIsLoading(true);
      setHasError(false);
      
      try {
        // Simulate API call with delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Simulate pagination
        const startIndex = (page - 1) * 10;
        const endIndex = startIndex + 10;
        const paginatedCourses = mockCourses.slice(startIndex, endIndex);
        
        if (page === 1) {
          setCourses(paginatedCourses);
        } else {
          setCourses(prevCourses => [...prevCourses, ...paginatedCourses]);
        }
        
        // Check if there are more courses to load
        setHasMore(endIndex < mockCourses.length);
      } catch (error) {
        console.error("Error fetching courses:", error);
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourses();
  }, [page]);

  // Handle search
  const handleSearch = (query) => {
    setSearchQuery(query);
    // Reset pagination when searching
    setPage(1);
  };

  // Filter courses based on search query
  const filteredCourses = courses.filter(course => 
    course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle load more
  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  // Navigate to course editor
  const handleEditCourse = (courseId) => {
    navigate(`/course-editor?id=${courseId}`);
  };

  // Create new course
  const handleCreateCourse = () => {
    navigate("/course-editor");
  };

  // Retry loading courses
  const handleRetry = () => {
    setPage(1);
    setHasError(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        onSearch={handleSearch}
        notifications={notifications}
      />
      
      <main id="main-content" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">My Courses</h1>
            <p className="mt-1 text-sm text-gray-500">
              Manage and track all your courses in one place
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <CreateButton onClick={handleCreateCourse} />
          </div>
        </div>

        {/* Error state */}
        {hasError && (
          <div className="bg-error-light border-l-4 border-error p-4 mb-6 rounded-md">
            <div className="flex">
              <div className="flex-shrink-0">
                <Icon name="AlertCircle" className="h-5 w-5 text-error" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-error">
                  There was an error loading your courses. Please try again.
                </p>
                <div className="mt-2">
                  <button
                    type="button"
                    onClick={handleRetry}
                    className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-error bg-error-light hover:bg-error-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-error"
                  >
                    <Icon name="RefreshCw" size={14} className="mr-1" />
                    Retry
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Loading state */}
        {isLoading && page === 1 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <LoadingSkeleton key={index} />
            ))}
          </div>
        )}

        {/* Empty state */}
        {!isLoading && filteredCourses.length === 0 && !hasError && (
          <EmptyState 
            searchQuery={searchQuery}
            onClear={() => setSearchQuery("")}
            onCreate={handleCreateCourse}
          />
        )}

        {/* Course grid */}
        {!isLoading && filteredCourses.length > 0 && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map(course => (
                <CourseCard
                  key={course.id}
                  course={course}
                  onClick={() => handleEditCourse(course.id)}
                />
              ))}
            </div>
            
            {/* Load more */}
            {hasMore && (
              <div className="mt-8 text-center">
                <button
                  onClick={handleLoadMore}
                  disabled={isLoading}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                >
                  {isLoading ? (
                    <>
                      <Icon name="Loader" size={16} className="animate-spin mr-2" />
                      Loading...
                    </>
                  ) : (
                    <>
                      Load More
                      <Icon name="ChevronDown" size={16} className="ml-2" />
                    </>
                  )}
                </button>
              </div>
            )}
          </>
        )}
      </main>
      
      <footer className="bg-white border-t border-gray-200 mt-auto">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Course Creator. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default CourseCreatorDashboard;