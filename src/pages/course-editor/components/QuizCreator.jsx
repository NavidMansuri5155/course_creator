import React, { useState } from "react";
import Icon from "../../../components/AppIcon";

const QuizCreator = ({ questions = [], onChange }) => {
  const [quizQuestions, setQuizQuestions] = useState(questions);

  // Add a new question
  const addQuestion = () => {
    const newQuestion = {
      id: `q${Date.now()}`,
      question: "",
      options: ["", ""],
      correctAnswer: ""
    };
    
    const updatedQuestions = [...quizQuestions, newQuestion];
    setQuizQuestions(updatedQuestions);
    onChange(updatedQuestions);
  };

  // Remove a question
  const removeQuestion = (questionId) => {
    const updatedQuestions = quizQuestions.filter(q => q.id !== questionId);
    setQuizQuestions(updatedQuestions);
    onChange(updatedQuestions);
  };

  // Update question text
  const updateQuestionText = (questionId, text) => {
    const updatedQuestions = quizQuestions.map(q => {
      if (q.id === questionId) {
        return { ...q, question: text };
      }
      return q;
    });
    
    setQuizQuestions(updatedQuestions);
    onChange(updatedQuestions);
  };

  // Update option text
  const updateOptionText = (questionId, optionIndex, text) => {
    const updatedQuestions = quizQuestions.map(q => {
      if (q.id === questionId) {
        const updatedOptions = [...q.options];
        updatedOptions[optionIndex] = text;
        return { ...q, options: updatedOptions };
      }
      return q;
    });
    
    setQuizQuestions(updatedQuestions);
    onChange(updatedQuestions);
  };

  // Add a new option to a question
  const addOption = (questionId) => {
    const updatedQuestions = quizQuestions.map(q => {
      if (q.id === questionId) {
        return { ...q, options: [...q.options, ""] };
      }
      return q;
    });
    
    setQuizQuestions(updatedQuestions);
    onChange(updatedQuestions);
  };

  // Remove an option from a question
  const removeOption = (questionId, optionIndex) => {
    const updatedQuestions = quizQuestions.map(q => {
      if (q.id === questionId) {
        // Ensure we keep at least 2 options
        if (q.options.length <= 2) {
          return q;
        }
        
        const updatedOptions = q.options.filter((_, index) => index !== optionIndex);
        
        // If we're removing the correct answer, reset it
        let correctAnswer = q.correctAnswer;
        if (q.correctAnswer === q.options[optionIndex]) {
          correctAnswer = "";
        }
        
        return { ...q, options: updatedOptions, correctAnswer };
      }
      return q;
    });
    
    setQuizQuestions(updatedQuestions);
    onChange(updatedQuestions);
  };

  // Set the correct answer
  const setCorrectAnswer = (questionId, optionText) => {
    const updatedQuestions = quizQuestions.map(q => {
      if (q.id === questionId) {
        return { ...q, correctAnswer: optionText };
      }
      return q;
    });
    
    setQuizQuestions(updatedQuestions);
    onChange(updatedQuestions);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900">Quiz Questions</h3>
        <button
          type="button"
          onClick={addQuestion}
          className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        >
          <Icon name="Plus" size={16} className="mr-2" />
          Add Question
        </button>
      </div>

      {quizQuestions.length === 0 ? (
        <div className="text-center py-8 bg-gray-50 rounded-lg border border-dashed border-gray-300">
          <Icon name="ListChecks" size={36} className="mx-auto text-gray-400 mb-3" />
          <h3 className="text-sm font-medium text-gray-900 mb-1">No questions yet</h3>
          <p className="text-sm text-gray-500 mb-4">Start by adding your first question</p>
          <button
            type="button"
            onClick={addQuestion}
            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            <Icon name="Plus" size={16} className="mr-2" />
            Add Question
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {quizQuestions.map((question, questionIndex) => (
            <div 
              key={question.id} 
              className="bg-white border border-gray-200 rounded-lg shadow-sm p-4"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-white text-sm font-medium mr-2">
                    {questionIndex + 1}
                  </span>
                  <input
                    type="text"
                    value={question.question}
                    onChange={(e) => updateQuestionText(question.id, e.target.value)}
                    placeholder="Enter your question"
                    className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeQuestion(question.id)}
                  className="text-gray-400 hover:text-red-500"
                >
                  <Icon name="Trash2" size={16} />
                </button>
              </div>

              <div className="space-y-3 mb-4">
                {question.options.map((option, optionIndex) => (
                  <div key={optionIndex} className="flex items-center">
                    <div className="mr-2">
                      <input
                        type="radio"
                        id={`question-${question.id}-option-${optionIndex}`}
                        name={`question-${question.id}`}
                        checked={option === question.correctAnswer}
                        onChange={() => setCorrectAnswer(question.id, option)}
                        className="focus:ring-primary h-4 w-4 text-primary border-gray-300"
                      />
                    </div>
                    <div className="flex-1">
                      <input
                        type="text"
                        value={option}
                        onChange={(e) => updateOptionText(question.id, optionIndex, e.target.value)}
                        placeholder={`Option ${optionIndex + 1}`}
                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
                      />
                    </div>
                    {question.options.length > 2 && (
                      <button
                        type="button"
                        onClick={() => removeOption(question.id, optionIndex)}
                        className="ml-2 text-gray-400 hover:text-red-500"
                      >
                        <Icon name="X" size={16} />
                      </button>
                    )}
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-center">
                <button
                  type="button"
                  onClick={() => addOption(question.id)}
                  className="inline-flex items-center px-2 py-1 border border-gray-300 text-xs font-medium rounded shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                >
                  <Icon name="Plus" size={12} className="mr-1" />
                  Add Option
                </button>
                
                <div className="text-xs text-gray-500">
                  {question.correctAnswer ? (
                    <span className="text-success flex items-center">
                      <Icon name="CheckCircle" size={12} className="mr-1" />
                      Correct answer selected
                    </span>
                  ) : (
                    <span className="text-warning flex items-center">
                      <Icon name="AlertCircle" size={12} className="mr-1" />
                      Select a correct answer
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default QuizCreator;