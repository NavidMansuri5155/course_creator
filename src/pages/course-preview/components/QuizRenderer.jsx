import React, { useState } from "react";
import Icon from "../../../components/AppIcon";

const QuizRenderer = ({ questions, onSubmit }) => {
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  const [submitted, setSubmitted] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const handleAnswerSelect = (questionIndex, optionIndex) => {
    if (submitted) return;
    
    const newAnswers = [...answers];
    newAnswers[questionIndex] = optionIndex;
    setAnswers(newAnswers);
  };

  const handleSubmit = () => {
    setSubmitted(true);
    setShowResults(true);
    onSubmit(answers);
  };

  const calculateScore = () => {
    let correct = 0;
    questions.forEach((question, index) => {
      if (answers[index] === question.correctAnswer) {
        correct++;
      }
    });
    return {
      correct,
      total: questions.length,
      percentage: Math.round((correct / questions.length) * 100)
    };
  };

  const score = calculateScore();

  return (
    <div className="space-y-8">
      {/* Quiz questions */}
      {questions.map((question, questionIndex) => (
        <div 
          key={question.id} 
          className={`p-5 border rounded-lg ${
            submitted && answers[questionIndex] === question.correctAnswer
              ? 'border-green-200 bg-green-50'
              : submitted && answers[questionIndex] !== null
              ? 'border-red-200 bg-red-50' :'border-gray-200'
          }`}
        >
          <div className="flex items-start">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary bg-opacity-10 text-primary flex items-center justify-center text-sm font-medium mr-3">
              {questionIndex + 1}
            </span>
            <h3 className="text-lg font-medium text-gray-800">{question.question}</h3>
          </div>
          
          <div className="mt-4 space-y-2 pl-9">
            {question.options.map((option, optionIndex) => {
              const isSelected = answers[questionIndex] === optionIndex;
              const isCorrect = question.correctAnswer === optionIndex;
              
              let optionClass = "border border-gray-200 bg-white";
              if (submitted) {
                if (isCorrect) {
                  optionClass = "border-green-500 bg-green-50";
                } else if (isSelected && !isCorrect) {
                  optionClass = "border-red-500 bg-red-50";
                }
              } else if (isSelected) {
                optionClass = "border-primary bg-blue-50";
              }
              
              return (
                <div 
                  key={optionIndex}
                  onClick={() => handleAnswerSelect(questionIndex, optionIndex)}
                  className={`p-3 rounded-md cursor-pointer flex items-center ${optionClass}`}
                >
                  <div className={`w-5 h-5 rounded-full border flex-shrink-0 flex items-center justify-center mr-3 ${
                    isSelected 
                      ? 'border-primary bg-primary text-white' :'border-gray-300'
                  }`}>
                    {isSelected && <Icon name="Check" size={12} />}
                  </div>
                  <span className="text-gray-800">{option}</span>
                  
                  {submitted && isCorrect && (
                    <Icon name="CheckCircle" size={18} className="ml-auto text-green-500" />
                  )}
                  {submitted && isSelected && !isCorrect && (
                    <Icon name="XCircle" size={18} className="ml-auto text-red-500" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}
      
      {/* Results section (when submitted) */}
      {showResults && (
        <div className={`p-5 rounded-lg border ${
          score.percentage >= 70 ? 'border-green-200 bg-green-50' : 'border-amber-200 bg-amber-50'
        }`}>
          <h3 className="text-lg font-medium mb-2">Quiz Results</h3>
          <p className="mb-3">
            You scored <span className="font-semibold">{score.correct} out of {score.total}</span> ({score.percentage}%)
          </p>
          
          <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
            <div 
              className={`h-2.5 rounded-full ${score.percentage >= 70 ? 'bg-green-500' : 'bg-amber-500'}`}
              style={{ width: `${score.percentage}%` }}
            ></div>
          </div>
          
          <p className={score.percentage >= 70 ? 'text-green-700' : 'text-amber-700'}>
            {score.percentage >= 70 
              ? 'Great job! You have passed this quiz.' :'You need to score at least 70% to pass this quiz. Try again!'}
          </p>
        </div>
      )}
      
      {/* Submit button */}
      {!submitted && (
        <div className="flex justify-end">
          <button
            onClick={handleSubmit}
            disabled={answers.includes(null)}
            className={`px-5 py-2 rounded-md font-medium ${
              answers.includes(null)
                ? 'bg-gray-200 text-gray-500 cursor-not-allowed' :'bg-primary text-white hover:bg-primary-hover'
            }`}
          >
            Submit Quiz
          </button>
        </div>
      )}
    </div>
  );
};

export default QuizRenderer;