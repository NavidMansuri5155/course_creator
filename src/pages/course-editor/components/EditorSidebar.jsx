import React, { useState } from "react";
import Icon from "../../../components/AppIcon";

const EditorSidebar = ({
  sections,
  activeSection,
  activeLesson,
  onItemSelect,
  onReorder,
  onAddSection,
  onAddLesson,
  onDeleteLesson,
  onDeleteSection,
  onSectionTitleChange,
  onLessonTitleChange
}) => {
  const [expandedSections, setExpandedSections] = useState(
    sections.reduce((acc, section) => {
      acc[section.id] = true;
      return acc;
    }, {})
  );
  
  const [draggedItem, setDraggedItem] = useState(null);
  const [editingSectionId, setEditingSectionId] = useState(null);
  const [editingLessonId, setEditingLessonId] = useState(null);

  // Toggle section expansion
  const toggleSection = (sectionId) => {
    setExpandedSections({
      ...expandedSections,
      [sectionId]: !expandedSections[sectionId]
    });
  };

  // Handle drag start
  const handleDragStart = (e, sectionId) => {
    setDraggedItem(sectionId);
    e.dataTransfer.effectAllowed = "move";
  };

  // Handle drag over
  const handleDragOver = (e, targetSectionId) => {
    e.preventDefault();
    if (draggedItem && draggedItem !== targetSectionId) {
      const draggedIndex = sections.findIndex(s => s.id === draggedItem);
      const targetIndex = sections.findIndex(s => s.id === targetSectionId);
      
      if (draggedIndex !== -1 && targetIndex !== -1) {
        const reorderedSections = [...sections];
        const [removed] = reorderedSections.splice(draggedIndex, 1);
        reorderedSections.splice(targetIndex, 0, removed);
        
        onReorder(reorderedSections);
      }
    }
  };

  // Handle drag end
  const handleDragEnd = () => {
    setDraggedItem(null);
  };

  // Get icon for lesson type
  const getLessonTypeIcon = (type) => {
    switch (type) {
      case "text":
        return "FileText";
      case "quiz":
        return "ListChecks";
      case "video":
        return "Video";
      default:
        return "File";
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-medium">Course Structure</h2>
        <p className="text-sm text-gray-500 mt-1">Drag sections to reorder</p>
      </div>
      
      <div className="flex-1 overflow-y-auto p-2">
        {sections.map((section) => (
          <div
            key={section.id}
            className={`mb-2 rounded-md border ${
              activeSection === section.id ? "border-primary bg-primary-light" : "border-gray-200"
            }`}
            draggable
            onDragStart={(e) => handleDragStart(e, section.id)}
            onDragOver={(e) => handleDragOver(e, section.id)}
            onDragEnd={handleDragEnd}
          >
            <div className="flex items-center justify-between p-3 cursor-pointer">
              <div className="flex items-center flex-1">
                <Icon name="GripVertical" size={16} className="mr-2 text-gray-400 cursor-grab" />
                
                {editingSectionId === section.id ? (
                  <input
                    type="text"
                    value={section.title}
                    onChange={(e) => onSectionTitleChange(section.id, e.target.value)}
                    onBlur={() => setEditingSectionId(null)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        setEditingSectionId(null);
                      }
                    }}
                    autoFocus
                    className="flex-1 p-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                ) : (
                  <div 
                    className="flex-1 font-medium text-gray-800"
                    onClick={() => setEditingSectionId(section.id)}
                  >
                    {section.title}
                  </div>
                )}
              </div>
              
              <div className="flex items-center">
                <button
                  onClick={() => toggleSection(section.id)}
                  className="p-1 text-gray-500 hover:text-gray-700"
                  aria-label={expandedSections[section.id] ? "Collapse section" : "Expand section"}
                >
                  <Icon 
                    name={expandedSections[section.id] ? "ChevronDown" : "ChevronRight"} 
                    size={16} 
                  />
                </button>
                
                <div className="relative ml-1 group">
                  <button
                    className="p-1 text-gray-500 hover:text-gray-700"
                    aria-label="Section options"
                  >
                    <Icon name="MoreVertical" size={16} />
                  </button>
                  
                  <div className="absolute right-0 mt-1 w-48 bg-white rounded-md shadow-lg border border-gray-200 hidden group-hover:block z-10">
                    <div className="py-1">
                      <button
                        onClick={() => onAddLesson(section.id, "text")}
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <Icon name="Plus" size={14} className="mr-2" />
                        Add Text Lesson
                      </button>
                      <button
                        onClick={() => onAddLesson(section.id, "quiz")}
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <Icon name="ListChecks" size={14} className="mr-2" />
                        Add Quiz
                      </button>
                      <button
                        onClick={() => onDeleteSection(section.id)}
                        className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                      >
                        <Icon name="Trash2" size={14} className="mr-2" />
                        Delete Section
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {expandedSections[section.id] && (
              <div className="pl-8 pr-3 pb-3">
                {section.lessons.map((lesson) => (
                  <div
                    key={lesson.id}
                    className={`flex items-center justify-between p-2 my-1 rounded ${
                      activeLesson === lesson.id
                        ? "bg-primary text-white" :"bg-white hover:bg-gray-50 text-gray-700"
                    }`}
                    onClick={() => onItemSelect(section.id, lesson.id)}
                  >
                    <div className="flex items-center flex-1">
                      <Icon 
                        name={getLessonTypeIcon(lesson.type)} 
                        size={14} 
                        className="mr-2" 
                      />
                      
                      {editingLessonId === lesson.id ? (
                        <input
                          type="text"
                          value={lesson.title}
                          onChange={(e) => onLessonTitleChange(lesson.id, e.target.value)}
                          onBlur={() => setEditingLessonId(null)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              setEditingLessonId(null);
                            }
                          }}
                          onClick={(e) => e.stopPropagation()}
                          autoFocus
                          className="flex-1 p-1 text-sm border border-gray-300 rounded text-gray-800 focus:outline-none focus:ring-1 focus:ring-primary"
                        />
                      ) : (
                        <span className="text-sm">{lesson.title}</span>
                      )}
                    </div>
                    
                    <div className="flex">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditingLessonId(lesson.id);
                        }}
                        className={`p-1 ${
                          activeLesson === lesson.id ? "text-white" : "text-gray-400 hover:text-gray-600"
                        }`}
                        aria-label="Edit lesson"
                      >
                        <Icon name="Edit" size={14} />
                      </button>
                      
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeleteLesson(section.id, lesson.id);
                        }}
                        className={`p-1 ${
                          activeLesson === lesson.id ? "text-white" : "text-gray-400 hover:text-gray-600"
                        }`}
                        aria-label="Delete lesson"
                      >
                        <Icon name="Trash2" size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      
      <div className="p-4 border-t border-gray-200">
        <button
          onClick={onAddSection}
          className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        >
          <Icon name="Plus" size={16} className="mr-2" />
          Add New Section
        </button>
      </div>
    </div>
  );
};

export default EditorSidebar;