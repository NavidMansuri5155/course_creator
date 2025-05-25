import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Icon from "../../components/AppIcon";
import EditorSidebar from "./components/EditorSidebar";
import RichTextEditor from "./components/RichTextEditor";
import MediaUploader from "./components/MediaUploader";
import SaveButton from "./components/SaveButton";
import PublishToggle from "./components/PublishToggle";
import ValidationErrors from "./components/ValidationErrors";
import QuizCreator from "./components/QuizCreator";

const CourseEditor = () => {
  // Mock course data
  const [course, setCourse] = useState({
    id: "course-123",
    title: "Introduction to Web Development",
    description: "Learn the fundamentals of web development including HTML, CSS, and JavaScript.",
    sections: [
      {
        id: "section-1",
        title: "Getting Started with HTML",
        lessons: [
          {
            id: "lesson-1-1",
            title: "HTML Basics",
            content: "<h2>Introduction to HTML</h2><p>HTML (HyperText Markup Language) is the standard markup language for documents designed to be displayed in a web browser.</p>",
            type: "text",
          },
          {
            id: "lesson-1-2",
            title: "HTML Elements",
            content: "<h2>Common HTML Elements</h2><p>Learn about paragraphs, headings, links, images, and more.</p>",
            type: "text",
          }
        ]
      },
      {
        id: "section-2",
        title: "CSS Fundamentals",
        lessons: [
          {
            id: "lesson-2-1",
            title: "CSS Syntax",
            content: "<h2>CSS Syntax and Selectors</h2><p>Learn how to style HTML elements using CSS selectors.</p>",
            type: "text",
          },
          {
            id: "lesson-2-2",
            title: "CSS Box Model",
            content: "<h2>Understanding the Box Model</h2><p>Learn about margins, padding, borders, and content areas.</p>",
            type: "text",
          },
          {
            id: "lesson-2-3",
            title: "CSS Quiz",
            type: "quiz",
            questions: [
              {
                id: "q1",
                question: "Which property is used to change the text color?",
                options: ["color", "text-color", "font-color", "text-style"],
                correctAnswer: "color"
              },
              {
                id: "q2",
                question: "Which CSS property controls the text size?",
                options: ["font-size", "text-size", "font-style", "text-style"],
                correctAnswer: "font-size"
              }
            ]
          }
        ]
      },
      {
        id: "section-3",
        title: "JavaScript Basics",
        lessons: [
          {
            id: "lesson-3-1",
            title: "JavaScript Introduction",
            content: "<h2>Introduction to JavaScript</h2><p>Learn the basics of JavaScript programming language.</p>",
            type: "text",
          },
          {
            id: "lesson-3-2",
            title: "JavaScript Variables",
            content: "<h2>Variables in JavaScript</h2><p>Learn how to declare and use variables in JavaScript.</p>",
            type: "text",
          }
        ]
      }
    ],
    pricing: {
      price: 49.99,
      currency: "USD",
      hasTrial: true,
      trialDays: 7
    },
    isPublished: false,
    lastSaved: new Date().toISOString(),
    createdAt: "2023-05-15T10:30:00Z",
    updatedAt: "2023-06-20T14:45:00Z"
  });

  const [activeSection, setActiveSection] = useState(course.sections[0].id);
  const [activeLesson, setActiveLesson] = useState(course.sections[0].lessons[0].id);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState(new Date());
  const [validationErrors, setValidationErrors] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  // Find active lesson object
  const activeLessonObj = course.sections
    .flatMap(section => section.lessons)
    .find(lesson => lesson.id === activeLesson);

  // Auto-save functionality
  useEffect(() => {
    const autoSaveInterval = setInterval(() => {
      handleSave(true);
    }, 30000); // Auto-save every 30 seconds

    return () => clearInterval(autoSaveInterval);
  }, [course]);

  // Handle course title change
  const handleTitleChange = (e) => {
    setCourse({
      ...course,
      title: e.target.value
    });
  };

  // Handle lesson content change
  const handleContentChange = (content) => {
    const updatedSections = course.sections.map(section => {
      const updatedLessons = section.lessons.map(lesson => {
        if (lesson.id === activeLesson) {
          return { ...lesson, content };
        }
        return lesson;
      });
      return { ...section, lessons: updatedLessons };
    });

    setCourse({
      ...course,
      sections: updatedSections
    });
  };

  // Handle save
  const handleSave = (isAutoSave = false) => {
    // Validate course data
    const errors = [];
    if (!course.title.trim()) {
      errors.push("Course title cannot be empty");
    }
    if (course.sections.length === 0) {
      errors.push("Course must have at least one section");
    }
    if (course.sections.some(section => section.lessons.length === 0)) {
      errors.push("Each section must have at least one lesson");
    }

    if (errors.length > 0) {
      setValidationErrors(errors);
      return;
    }

    setValidationErrors([]);
    setIsSaving(true);

    // Simulate API call
    setTimeout(() => {
      const now = new Date();
      setCourse({
        ...course,
        lastSaved: now.toISOString(),
        updatedAt: now.toISOString()
      });
      setLastSaved(now);
      setIsSaving(false);
      
      if (!isAutoSave) {
        // Show success message for manual saves
        alert("Course saved successfully!");
      }
    }, 1000);
  };

  // Handle publish toggle
  const handlePublishToggle = () => {
    setCourse({
      ...course,
      isPublished: !course.isPublished
    });
  };

  // Handle section/lesson selection
  const handleItemSelect = (sectionId, lessonId) => {
    setActiveSection(sectionId);
    setActiveLesson(lessonId);
  };

  // Handle drag and drop reordering
  const handleReorder = (reorderedSections) => {
    setCourse({
      ...course,
      sections: reorderedSections
    });
  };

  // Add new section
  const handleAddSection = () => {
    const newSection = {
      id: `section-${Date.now()}`,
      title: "New Section",
      lessons: [
        {
          id: `lesson-${Date.now()}`,
          title: "New Lesson",
          content: "<p>Enter your content here...</p>",
          type: "text"
        }
      ]
    };

    setCourse({
      ...course,
      sections: [...course.sections, newSection]
    });
    
    // Set the new section and lesson as active
    setActiveSection(newSection.id);
    setActiveLesson(newSection.lessons[0].id);
  };

  // Add new lesson to a section
  const handleAddLesson = (sectionId, lessonType = "text") => {
    const newLesson = {
      id: `lesson-${Date.now()}`,
      title: "New Lesson",
      content: lessonType === "text" ? "<p>Enter your content here...</p>" : "",
      type: lessonType
    };

    if (lessonType === "quiz") {
      newLesson.questions = [];
    }

    const updatedSections = course.sections.map(section => {
      if (section.id === sectionId) {
        return {
          ...section,
          lessons: [...section.lessons, newLesson]
        };
      }
      return section;
    });

    setCourse({
      ...course,
      sections: updatedSections
    });
    
    // Set the new lesson as active
    setActiveSection(sectionId);
    setActiveLesson(newLesson.id);
  };

  // Delete a lesson
  const handleDeleteLesson = (sectionId, lessonId) => {
    // Find the section
    const sectionIndex = course.sections.findIndex(s => s.id === sectionId);
    if (sectionIndex === -1) return;
    
    // Check if this is the only lesson in the section
    if (course.sections[sectionIndex].lessons.length === 1) {
      alert("Cannot delete the only lesson in a section. Delete the section instead.");
      return;
    }

    // Create updated lessons array without the deleted lesson
    const updatedLessons = course.sections[sectionIndex].lessons.filter(
      lesson => lesson.id !== lessonId
    );

    // Create updated sections array
    const updatedSections = [...course.sections];
    updatedSections[sectionIndex] = {
      ...updatedSections[sectionIndex],
      lessons: updatedLessons
    };

    // Update course state
    setCourse({
      ...course,
      sections: updatedSections
    });

    // If the active lesson was deleted, set a new active lesson
    if (activeLesson === lessonId) {
      const newActiveLesson = updatedLessons[0]?.id;
      if (newActiveLesson) {
        setActiveLesson(newActiveLesson);
      }
    }
  };

  // Delete a section
  const handleDeleteSection = (sectionId) => {
    // Check if this is the only section
    if (course.sections.length === 1) {
      alert("Cannot delete the only section in the course.");
      return;
    }

    // Create updated sections array without the deleted section
    const updatedSections = course.sections.filter(
      section => section.id !== sectionId
    );

    // Update course state
    setCourse({
      ...course,
      sections: updatedSections
    });

    // If the active section was deleted, set a new active section and lesson
    if (activeSection === sectionId) {
      const newActiveSection = updatedSections[0];
      setActiveSection(newActiveSection.id);
      setActiveLesson(newActiveSection.lessons[0].id);
    }
  };

  // Update lesson title
  const handleLessonTitleChange = (lessonId, newTitle) => {
    const updatedSections = course.sections.map(section => {
      const updatedLessons = section.lessons.map(lesson => {
        if (lesson.id === lessonId) {
          return { ...lesson, title: newTitle };
        }
        return lesson;
      });
      return { ...section, lessons: updatedLessons };
    });

    setCourse({
      ...course,
      sections: updatedSections
    });
  };

  // Update section title
  const handleSectionTitleChange = (sectionId, newTitle) => {
    const updatedSections = course.sections.map(section => {
      if (section.id === sectionId) {
        return { ...section, title: newTitle };
      }
      return section;
    });

    setCourse({
      ...course,
      sections: updatedSections
    });
  };

  // Handle quiz update
  const handleQuizUpdate = (questions) => {
    const updatedSections = course.sections.map(section => {
      const updatedLessons = section.lessons.map(lesson => {
        if (lesson.id === activeLesson) {
          return { ...lesson, questions };
        }
        return lesson;
      });
      return { ...section, lessons: updatedLessons };
    });

    setCourse({
      ...course,
      sections: updatedSections
    });
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Top Navigation Bar */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center">
            <Link 
              to="/course-creator-dashboard" 
              className="mr-4 text-gray-600 hover:text-gray-900"
              aria-label="Back to dashboard"
            >
              <Icon name="ArrowLeft" size={20} />
            </Link>
            
            {isEditing ? (
              <input
                type="text"
                value={course.title}
                onChange={handleTitleChange}
                onBlur={() => setIsEditing(false)}
                autoFocus
                className="text-xl font-semibold focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded px-2 py-1"
              />
            ) : (
              <h1 
                className="text-xl font-semibold cursor-pointer" 
                onClick={() => setIsEditing(true)}
              >
                {course.title}
                <Icon name="Edit" size={16} className="inline ml-2 text-gray-400" />
              </h1>
            )}
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-500">
              {isSaving ? (
                <span className="flex items-center">
                  <Icon name="Loader" size={16} className="animate-spin mr-1" />
                  Saving...
                </span>
              ) : (
                <span>Last saved: {new Date(lastSaved).toLocaleTimeString()}</span>
              )}
            </div>
            
            <SaveButton onClick={() => handleSave()} isLoading={isSaving} />
            
            <PublishToggle 
              isPublished={course.isPublished} 
              onChange={handlePublishToggle} 
            />
            
            <Link 
              to="/course-preview" 
              className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              <Icon name="Eye" size={16} className="mr-2" />
              Preview
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar Toggle for Mobile */}
        <div className="lg:hidden absolute top-16 left-4 z-10">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 rounded-md bg-white shadow-md text-gray-600 hover:text-gray-900"
          >
            <Icon name={isSidebarOpen ? "PanelLeftClose" : "PanelLeftOpen"} size={20} />
          </button>
        </div>

        {/* Sidebar */}
        <div className={`${isSidebarOpen ? 'block' : 'hidden'} lg:block w-full lg:w-80 bg-white border-r border-gray-200 overflow-y-auto`}>
          <EditorSidebar
            sections={course.sections}
            activeSection={activeSection}
            activeLesson={activeLesson}
            onItemSelect={handleItemSelect}
            onReorder={handleReorder}
            onAddSection={handleAddSection}
            onAddLesson={handleAddLesson}
            onDeleteLesson={handleDeleteLesson}
            onDeleteSection={handleDeleteSection}
            onSectionTitleChange={handleSectionTitleChange}
            onLessonTitleChange={handleLessonTitleChange}
          />
        </div>

        {/* Main Editor Area */}
        <div className="flex-1 overflow-y-auto p-6">
          {validationErrors.length > 0 && (
            <ValidationErrors errors={validationErrors} onDismiss={() => setValidationErrors([])} />
          )}

          {activeLessonObj && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-medium mb-4">{activeLessonObj.title}</h2>
              
              {activeLessonObj.type === "text" && (
                <RichTextEditor 
                  initialContent={activeLessonObj.content} 
                  onChange={handleContentChange} 
                />
              )}
              
              {activeLessonObj.type === "quiz" && (
                <QuizCreator 
                  questions={activeLessonObj.questions || []} 
                  onChange={handleQuizUpdate} 
                />
              )}
              
              <div className="mt-6">
                <h3 className="text-lg font-medium mb-3">Media Resources</h3>
                <MediaUploader 
                  onUploadComplete={(url) => {
                    // Insert media URL into editor content
                    const mediaTag = url.endsWith('.mp4') || url.endsWith('.webm') 
                      ? `<video controls src="${url}" class="w-full h-auto"></video>` 
                      : `<img src="${url}" alt="Uploaded media" class="w-full h-auto" />`;
                    
                    handleContentChange(activeLessonObj.content + mediaTag);
                  }} 
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseEditor;