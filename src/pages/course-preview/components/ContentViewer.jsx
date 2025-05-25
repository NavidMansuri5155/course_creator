import React from "react";
import VideoPlayer from "./VideoPlayer";
import QuizRenderer from "./QuizRenderer";


const ContentViewer = ({ lesson, onComplete, onQuizSubmit }) => {
  if (!lesson) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-500">No lesson selected</p>
      </div>
    );
  }

  const renderContent = () => {
    switch (lesson.type) {
      case "video":
        return (
          <VideoPlayer 
            videoUrl={lesson.videoUrl} 
            thumbnailUrl={lesson.thumbnailUrl}
            onComplete={() => onComplete(true)}
          />
        );
      case "quiz":
        return (
          <QuizRenderer 
            questions={lesson.questions} 
            onSubmit={onQuizSubmit}
          />
        );
      case "text":
      default:
        return (
          <div className="prose prose-blue max-w-none">
            <p>{lesson.content}</p>
          </div>
        );
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800">{lesson.title}</h2>
      </div>
      <div className="p-6">
        {renderContent()}
      </div>
    </div>
  );
};

export default ContentViewer;