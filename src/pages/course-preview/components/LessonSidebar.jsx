import React from "react";
import Icon from "../../../components/AppIcon";

const LessonSidebar = ({ 
  modules, 
  currentModuleIndex, 
  currentLessonIndex, 
  onSelectLesson, 
  isOpen,
  progress 
}) => {
  // Calculate overall progress
  const calculateProgress = () => {
    let completedLessons = 0;
    let totalLessons = 0;
    
    modules.forEach(module => {
      module.lessons.forEach(lesson => {
        totalLessons++;
        if (progress[module.id]?.[lesson.id]) {
          completedLessons++;
        }
      });
    });
    
    return totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;
  };

  const overallProgress = calculateProgress();

  // Get lesson type icon
  const getLessonTypeIcon = (type) => {
    switch (type) {
      case 'video':
        return 'Video';
      case 'quiz':
        return 'FileQuestion';
      default:
        return 'FileText';
    }
  };

  return (
    <aside 
      className={`bg-white border-r border-gray-200 overflow-y-auto transition-all duration-300 ease-in-out ${
        isOpen ? 'w-72' : 'w-0 lg:w-72'
      }`}
    >
      <div className="p-4">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-500">COURSE PROGRESS</h3>
            <span className="text-sm font-semibold text-gray-700">{overallProgress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full" 
              style={{ width: `${overallProgress}%` }}
            ></div>
          </div>
        </div>
        
        <div className="space-y-4">
          {modules.map((module, moduleIndex) => (
            <div key={module.id} className="border border-gray-200 rounded-md overflow-hidden">
              <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                <h3 className="font-medium text-gray-800">
                  {moduleIndex + 1}. {module.title}
                </h3>
              </div>
              <ul className="divide-y divide-gray-200">
                {module.lessons.map((lesson, lessonIndex) => {
                  const isActive = moduleIndex === currentModuleIndex && lessonIndex === currentLessonIndex;
                  const isCompleted = progress[module.id]?.[lesson.id];
                  
                  return (
                    <li key={lesson.id}>
                      <button
                        onClick={() => onSelectLesson(moduleIndex, lessonIndex)}
                        className={`w-full text-left px-4 py-3 flex items-start ${
                          isActive ? 'bg-blue-50' : 'hover:bg-gray-50'
                        }`}
                      >
                        <div className="flex-shrink-0 mt-0.5 mr-3">
                          {isCompleted ? (
                            <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                              <Icon name="Check" size={12} color="white" />
                            </div>
                          ) : (
                            <Icon 
                              name={getLessonTypeIcon(lesson.type)} 
                              size={18} 
                              className={isActive ? 'text-primary' : 'text-gray-400'} 
                            />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className={`text-sm font-medium ${
                            isActive ? 'text-primary' : isCompleted ? 'text-gray-700' : 'text-gray-800'
                          }`}>
                            {lesson.title}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            {lesson.duration} min
                          </p>
                        </div>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default LessonSidebar;