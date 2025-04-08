import React, { useState } from 'react';
import axios from '../axiosConfig';  // Ensure you import your axios configuration

const QuizSection = ({ quizData, courseId }) => {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [score, setScore] = useState(0);  // Initialize score state
  const userId = localStorage.getItem('userId'); // Retrieve the user ID from localStorage

  const handleAnswerChange = (event) => {
    setSelectedAnswer(event.target.value);
  };

  const handleNextQuestion = () => {
    // Check if the selected answer is correct and update the score
    if (selectedAnswer === quizData.quiz[questionIndex].correctAnswer) {
      setScore(score + 1);  // Increment score if the answer is correct
    }

    if (questionIndex < quizData.quiz.length - 1) {
      setQuestionIndex(questionIndex + 1);
      setSelectedAnswer('');  // Reset selected answer for the next question
    } else {
      finishQuiz();
    }
  };

  const finishQuiz = async () => {
    alert(`You have completed the quiz! Your score: ${score}/${quizData.quiz.length}`);
    console.log(`User ID: ${userId}, Course ID: ${courseId}, Score: ${score}`);
    try {
      // Insert user analytics data
      await axios.post('/api/usercourses/analytics', { user_id: userId, course_id: courseId, quiz_score: score });
      // Update course completion
      await axios.put('/api/usercourses/course-completion', { userId, courseId });

    } catch (error) {
      console.error('Error saving quiz results:', error);
    }
  };

  if (!quizData || !quizData.quiz || !Array.isArray(quizData.quiz)) {
    return <div>No quiz data available or quiz data is not in the expected format.</div>;
  }

  const currentQuestion = quizData.quiz[questionIndex];

  return (
    <div className="content-section my-5 p-4 quiz-section rounded shadow-sm">
      <h3 className="mb-4">Quiz</h3>

      <div className="score-box mb-4">
        <h4 className="text-primary">Score: {score} / {quizData.quiz.length}</h4>
      </div>

      {currentQuestion && (
        <>
          <div className="question-box mb-3">
            <h5 className="fw-semibold">{`Question ${currentQuestion.number}:`}</h5>
            <p className="fs-5">{currentQuestion.question}</p>
          </div>

          <div className="options-box mb-4">
            {currentQuestion.options.map((option, idx) => (
              <div className="form-check my-2" key={idx}>
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

          <div className="d-flex gap-3">
            {questionIndex < quizData.quiz.length - 1 && (
              <button className="btn btn-primary" onClick={handleNextQuestion}>
                Next Question
              </button>
            )}
            {questionIndex === quizData.quiz.length - 1 && (
              <button className="btn btn-success" onClick={finishQuiz}>
                Finish Quiz
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default QuizSection;
