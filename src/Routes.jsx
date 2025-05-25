import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import ErrorBoundary from "./components/ErrorBoundary";
import NotFound from "./pages/NotFound";
import CourseCreatorDashboard from "./pages/course-creator-dashboard";
import CourseEditor from "./pages/course-editor";
import CoursePreview from "./pages/course-preview";
import StudentAnalytics from "./pages/student-analytics";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ScrollToTop />
        <RouterRoutes>
          <Route path="/" element={<CourseCreatorDashboard />} />
          <Route path="/course-creator-dashboard" element={<CourseCreatorDashboard />} />
          <Route path="/course-editor" element={<CourseEditor />} />
          <Route path="/course-preview" element={<CoursePreview />} />
          <Route path="/student-analytics" element={<StudentAnalytics />} />
          <Route path="*" element={<NotFound />} />
        </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;