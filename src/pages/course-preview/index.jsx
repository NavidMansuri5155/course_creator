import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CourseHeader from "./components/CourseHeader";
import LessonSidebar from "./components/LessonSidebar";
import ContentViewer from "./components/ContentViewer";
import NavigationControls from "./components/NavigationControls";


const CoursePreview = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [currentModuleIndex, setCurrentModuleIndex] = useState(0);
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [courseProgress, setCourseProgress] = useState({});

  // Mock course data that would normally come from Redux store
  const courseData = {
    id: "course-123",
    title: "Advanced Web Development with React",
    description: "Master modern web development techniques with React and related technologies.",
    modules: [
      {
        id: "module-1",
        title: "Getting Started with React",
        lessons: [
          {
            id: "lesson-1-1",
            title: "Introduction to React",
            type: "text",
            content: `React is a JavaScript library for building user interfaces. It was developed by Facebook and is now maintained by Facebook and a community of individual developers and companies.

React allows developers to create large web applications that can change data, without reloading the page. The main purpose of React is to be fast, scalable, and simple. It works only on user interfaces in the application. This corresponds to the view in the MVC template.

Key features of React include:
- Virtual DOM for better performance
- Component-based architecture
- Declarative UI
- Unidirectional data flow

In this course, we'll explore these concepts in depth and learn how to build powerful, interactive web applications using React.`,
            duration: 15,
            completed: true
          },
          {
            id: "lesson-1-2",
            title: "Setting Up Your Development Environment",
            type: "text",
            content: `Before we start coding with React, we need to set up our development environment. This lesson will guide you through the process of installing and configuring the necessary tools.

First, you'll need Node.js and npm (Node Package Manager) installed on your computer. These tools are essential for modern web development with React.

Next, we'll use Create React App, a tool that sets up a new React project with a good default configuration. It's the recommended way to start new React applications. Finally, we'll explore the structure of a React project and understand the purpose of each file and directory.By the end of this lesson, you'll have a fully functional React development environment ready for building applications.`,
            duration: 20,
            completed: false
          }
        ]
      },
      {
        id: "module-2",
        title: "React Components and Props",
        lessons: [
          {
            id: "lesson-2-1",
            title: "Understanding React Components",
            type: "video",
            videoUrl: "https://www.example.com/videos/react-components.mp4",
            thumbnailUrl: "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
            duration: 25,
            completed: false
          },
          {
            id: "lesson-2-2",
            title: "Working with Props",
            type: "text",
            content: `Props (short for properties) are a way of passing data from parent to child components in React. They are read-only and help make your components reusable.

In this lesson, we'll learn how to:
- Pass props to components
- Access and use props within components
- Use default props
- Validate props with PropTypes

Understanding props is fundamental to building React applications, as they enable the flow of data throughout your component tree.`,
            duration: 20,
            completed: false
          }
        ]
      },
      {
        id: "module-3",
        title: "State and Lifecycle",
        lessons: [
          {
            id: "lesson-3-1",
            title: "Introduction to State",
            type: "text",
            content: `State is a JavaScript object that stores component data that may change over time. Unlike props, state is managed within the component and can be updated using the setState() method.

In this lesson, we'll cover:
- How to initialize state
- How to update state correctly
- Common pitfalls when working with state
- When to use state vs props

Understanding state is crucial for creating interactive React applications that respond to user input and other events.`,
            duration: 30,
            completed: false
          },
          {
            id: "lesson-3-2",
            title: "Component Lifecycle",
            type: "video",
            videoUrl: "https://www.example.com/videos/component-lifecycle.mp4",
            thumbnailUrl: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?ixlib=rb-1.2.1&auto=format&fit=crop&w=1489&q=80",
            duration: 35,
            completed: false
          }
        ]
      },
      {
        id: "module-4",
        title: "Handling Events and Forms",
        lessons: [
          {
            id: "lesson-4-1",
            title: "Event Handling in React",
            type: "text",
            content: `React has a synthetic event system that normalizes events across different browsers. This makes it easier to handle events consistently regardless of which browser your users are using.

In this lesson, we'll learn:
- How to handle common events like onClick, onChange, etc.
- The differences between React events and DOM events
- Best practices for event handling in React

Proper event handling is essential for creating interactive user interfaces that respond to user actions.`,
            duration: 25,
            completed: false
          },
          {
            id: "lesson-4-2",
            title: "Working with Forms",
            type: "text",
            content: `Forms are a fundamental part of many web applications. React provides a way to handle form inputs and submissions in a more controlled and predictable manner.

In this lesson, we'll cover:
- Controlled vs uncontrolled components
- Handling form submission
- Validating form inputs
- Managing complex form state

By the end of this lesson, you'll be able to create and manage forms effectively in your React applications.`,
            duration: 30,
            completed: false
          }
        ]
      },
      {
        id: "module-5",
        title: "Assessment",
        lessons: [
          {
            id: "lesson-5-1",
            title: "React Fundamentals Quiz",
            type: "quiz",
            questions: [
              {
                id: "q1",
                question: "What is React?",
                options: [
                  "A JavaScript framework for building user interfaces",
                  "A JavaScript library for building user interfaces",
                  "A programming language",
                  "A database management system"
                ],
                correctAnswer: 1,
                userAnswer: null
              },
              {
                id: "q2",
                question: "Which of the following is NOT a key feature of React?",
                options: [
                  "Virtual DOM",
                  "Two-way data binding",
                  "Component-based architecture",
                  "JSX"
                ],
                correctAnswer: 1,
                userAnswer: null
              },
              {
                id: "q3",
                question: "In React, props are:",
                options: [
                  "Mutable and can be changed within a component",
                  "Immutable and are passed from parent to child",
                  "Used for storing component state",
                  "Only available in class components"
                ],
                correctAnswer: 1,
                userAnswer: null
              },
              {
                id: "q4",
                question: "What is the purpose of state in React?",
                options: [
                  "To pass data between components",
                  "To store data that may change over time within a component",
                  "To define the structure of the component",
                  "To connect to external APIs"
                ],
                correctAnswer: 1,
                userAnswer: null
              }
            ],
            duration: 15,
            completed: false
          }
        ]
      }
    ]
  };

  // Initialize course progress
  useEffect(() => {
    const initialProgress = {};
    courseData.modules.forEach((module, moduleIndex) => {
      initialProgress[module.id] = {};
      module.lessons.forEach((lesson) => {
        initialProgress[module.id][lesson.id] = lesson.completed || false;
      });
    });
    setCourseProgress(initialProgress);
  }, []);

  // Get current lesson
  const currentModule = courseData.modules[currentModuleIndex];
  const currentLesson = currentModule?.lessons[currentLessonIndex];

  // Handle navigation
  const navigateToLesson = (moduleIndex, lessonIndex) => {
    setIsLoading(true);
    // Simulate loading time
    setTimeout(() => {
      setCurrentModuleIndex(moduleIndex);
      setCurrentLessonIndex(lessonIndex);
      setIsLoading(false);
    }, 800);
  };

  const handleNext = () => {
    if (currentLessonIndex < currentModule.lessons.length - 1) {
      // Next lesson in same module
      navigateToLesson(currentModuleIndex, currentLessonIndex + 1);
    } else if (currentModuleIndex < courseData.modules.length - 1) {
      // First lesson in next module
      navigateToLesson(currentModuleIndex + 1, 0);
    }
  };

  const handlePrevious = () => {
    if (currentLessonIndex > 0) {
      // Previous lesson in same module
      navigateToLesson(currentModuleIndex, currentLessonIndex - 1);
    } else if (currentModuleIndex > 0) {
      // Last lesson in previous module
      const prevModule = courseData.modules[currentModuleIndex - 1];
      navigateToLesson(currentModuleIndex - 1, prevModule.lessons.length - 1);
    }
  };

  const handleLessonCompletion = (moduleId, lessonId, isCompleted) => {
    setCourseProgress((prevProgress) => ({
      ...prevProgress,
      [moduleId]: {
        ...prevProgress[moduleId],
        [lessonId]: isCompleted,
      },
    }));
  };

  const handleQuizSubmission = (answers) => {
    // In a real app, this would send the answers to the backend
    // and update the progress based on the result
    const updatedLesson = { ...currentLesson };
    updatedLesson.questions = updatedLesson.questions.map((q, index) => ({
      ...q,
      userAnswer: answers[index],
    }));
    
    // Mark lesson as completed
    handleLessonCompletion(currentModule.id, currentLesson.id, true);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const exitPreview = () => {
    navigate("/course-editor");
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight") {
        handleNext();
      } else if (e.key === "ArrowLeft") {
        handlePrevious();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentModuleIndex, currentLessonIndex]);

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <CourseHeader 
        title={courseData.title} 
        onExit={exitPreview} 
        onToggleSidebar={toggleSidebar} 
      />
      
      <div className="flex flex-1 overflow-hidden">
        <LessonSidebar 
          modules={courseData.modules}
          currentModuleIndex={currentModuleIndex}
          currentLessonIndex={currentLessonIndex}
          onSelectLesson={navigateToLesson}
          isOpen={isSidebarOpen}
          progress={courseProgress}
        />
        
        <main className="flex-1 overflow-auto p-4 md:p-6 lg:p-8">
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : (
            <>
              <ContentViewer 
                lesson={currentLesson} 
                onComplete={(isCompleted) => 
                  handleLessonCompletion(currentModule.id, currentLesson.id, isCompleted)
                }
                onQuizSubmit={handleQuizSubmission}
              />
              
              <NavigationControls 
                onPrevious={handlePrevious}
                onNext={handleNext}
                hasPrevious={currentLessonIndex > 0 || currentModuleIndex > 0}
                hasNext={
                  currentLessonIndex < currentModule.lessons.length - 1 || 
                  currentModuleIndex < courseData.modules.length - 1
                }
              />
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default CoursePreview;