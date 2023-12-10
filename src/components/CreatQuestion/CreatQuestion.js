// CreatQuestion.js

import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';

import './CreatQuestion.css';

const subjects = ['CoreJava', 'HTML', 'CSS', 'C', 'React'];
const questionTypes = ['MCQ', 'Type 2', 'Type 3', 'Type 4', 'Type 5'];

const CreatQuestion = () => {
  const [formData, setFormData] = useState({
    subject: '',
    questionType: '',
    questions: [
      { question: 'what is your name', options: ['rajan', 'ketan', 'deepak', 'sachin'], answer: 'ketan' },
    ],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleQuestionChange = (index, field, value) => {
    setFormData((prevData) => {
      const newQuestions = [...prevData.questions];
      newQuestions[index][field] = value;
      return { ...prevData, questions: newQuestions };
    });
  };

  const handleOptionChange = (questionIndex, optionIndex, value) => {
    setFormData((prevData) => {
      const newOptions = [...prevData.questions[questionIndex].options];
      newOptions[optionIndex] = value;
      const newQuestions = [...prevData.questions];
      newQuestions[questionIndex].options = newOptions;
      return { ...prevData, questions: newQuestions };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    // For simplicity, I'm just logging the form data
    console.log('Form submitted:', formData);
  };

  return (
    <div className="container">
      <div className="header">
        <TextField
          select
          label="Subject"
          variant="outlined"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          fullWidth
          margin="normal"
          className="dropdown"
        >
          {subjects.map((subject, index) => (
            <MenuItem key={index} value={subject}>
              {subject}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          label="Question Type"
          variant="outlined"
          name="questionType"
          value={formData.questionType}
          onChange={handleChange}
          fullWidth
          margin="normal"
          className="dropdown"
        >
          {questionTypes.map((type, index) => (
            <MenuItem key={index} value={type}>
              {type}
            </MenuItem>
          ))}
        </TextField>
      </div>

      <form onSubmit={handleSubmit}>
        {formData.questions.map((question, index) => (
          <div key={index} className="form-section">
            <TextField
              label={`Question ${index + 1}`}
              variant="outlined"
              name={`question-${index}`}
              value={question.question}
              onChange={(e) => handleQuestionChange(index, 'question', e.target.value)}
              fullWidth
              margin="normal"
            />
            <br />

            <label>Options:</label>
            {question.options.map((option, optionIndex) => (
              <div key={optionIndex}>
                <TextField
                  label={`Option ${optionIndex + 1}`}
                  variant="outlined"
                  value={option}
                  onChange={(e) => handleOptionChange(index, optionIndex, e.target.value)}
                  fullWidth
                  margin="normal"
                />
              </div>
            ))}
            
          </div>
        ))}

        <Button type="submit" variant="contained" color="primary" fullWidth>
          Submit
        </Button>
      </form>
    </div>
  );
};

export default CreatQuestion;
