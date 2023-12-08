import React, { useState } from 'react';

const Quiz = () => {
 

    

  const [answers, setAnswers] = useState(new Array(quizData.length).fill(null));

  const handleOptionChange = (questionIndex, optionIndex) => {
    const updatedAnswers = [...answers];
    updatedAnswers[questionIndex] = quizData[questionIndex].options[optionIndex];
    setAnswers(updatedAnswers);
  };

  const handleSubmit = () => {
    // Do something with the submitted answers (e.g., validation, submission to server, etc.)
    console.log(answers);
  };

  return (
    <div>
      {quizData.map((questionData, questionIndex) => (
        <div key={questionData._id}>
          <h3>{questionData.question}</h3>
          <ul>
            {questionData.options.map((option, optionIndex) => (
              <li key={optionIndex}>
                <label>
                  <input
                    type="radio"
                    name={`question${questionIndex}`}
                    value={option}
                    checked={answers[questionIndex] === option}
                    onChange={() => handleOptionChange(questionIndex, optionIndex)}
                  />
                  {option}
                </label>
              </li>
            ))}
          </ul>
        </div>
      ))}
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default Quiz;
