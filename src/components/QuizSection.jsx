import React, { useState } from 'react';

const QuizSection = ({ quizData }) => {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');

  const handleAnswerChange = (event) => {
    setSelectedAnswer(event.target.value);
  };

  const handleNextQuestion = () => {
    setQuestionIndex((prevIndex) => Math.min(prevIndex + 1, quizData.length - 1));
    setSelectedAnswer('');
  };

  const currentQuestion = quizData[questionIndex];

  return (
    <div className="content-section my-4">
      <h3>Quiz</h3>
      <h5>{`Question ${currentQuestion.number}: ${currentQuestion.question}`}</h5>
      <div className="mt-3">
        {currentQuestion.options.map((option, idx) => (
          <div className="form-check my-1" key={idx}>
            <input
              className="form-check-input"
              type="radio"
              name="quizOption"
              id={`option${idx}`}
              value={option}
              checked={selectedAnswer === option}
              onChange={handleAnswerChange}
            />
            <label className="form-check-label" htmlFor={`option${idx}`}>
              {option}
            </label>
          </div>
        ))}
      </div>
      <button className="btn btn-primary mt-3" onClick={handleNextQuestion}>
        Next Question
      </button>
    </div>
  );
};

export default QuizSection;