import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CreateTest() {
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [questionData, setQuestionData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/question');
      const data = response.data.questionbank.reverse();
      setQuestionData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getQuestionsBySubject = (subject) => {
    return questionData.filter((row) => row.subject_name === subject);
  };

  const handleCreateTest = (subject) => {
    setSelectedSubject(subject);
    setSelectedQuestions([]);
  };

  const handleQuestionSelection = (questionId) => {
    const foundIndex = selectedQuestions.indexOf(questionId);
    if (foundIndex === -1 && selectedQuestions.length < 10) {
      setSelectedQuestions([...selectedQuestions, questionId]);
    } else if (foundIndex !== -1) {
      const updatedSelection = [...selectedQuestions];
      updatedSelection.splice(foundIndex, 1);
      setSelectedQuestions(updatedSelection);
    }
  };
// Render subject selection input field
// ...

const handleSubmitTest = () => {
    // Filter the selected questions with their details
    const selectedQuestionsDetails = questionData
        .filter((question) => selectedQuestions.includes(question._id))
        .map(({ _id, question, option, Answer }) => ({
            _id,
            question,
            option,
            Answer,
        }));

    // Prepare the data to be sent to the API
    const testSubmissionData = {
        subjectName: selectedSubject,
        questionType: 'Mcq',
        QuestionSet: selectedQuestionsDetails,
        count: selectedQuestionsDetails.length,
    };

    // Send 'testSubmissionData' to your API endpoint using Axios or Fetch
    // Example Axios POST request
    axios.post('http://your-api-endpoint.com/submit-test', testSubmissionData)
        .then((response) => {
            // Handle response from the API
            console.log('Test submitted successfully!', response.data);
        })
        .catch((error) => {
            // Handle errors
            console.error('Error submitting test:', error);
        });
};


// Inside the Modal to show detailed question set
// Display questions for the selected subject with checkboxes
{
  selectedSubject && (
    <div style={{ height: '350px', overflow: 'auto' }}>
      {getQuestionsBySubject(selectedSubject)?.map((question) => (
        <div key={question._id}>
          <input
            type="checkbox"
            checked={selectedQuestions.includes(question._id)}
            onChange={() => handleQuestionSelection(question._id)}
          />
          <span>{question.question}</span>
        </div>
      ))}
    </div>
  );
}

  return (
    <div>
    <select onChange={(e) => handleCreateTest(e.target.value)}>
      <option value="">Select Subject</option>
      {/* Assuming the subjects are unique */}
      {[...new Set(questionData.map((item) => item.subject_name))].map((subject) => (
        <option key={subject} value={subject}>
          {subject}
        </option>
      ))}
    </select>
    {selectedSubject && (
      <div style={{ height: '350px', overflow: 'auto' }}>
        {getQuestionsBySubject(selectedSubject)?.map((question) => (
          <div key={question._id}>
            <input
              type="checkbox"
              checked={selectedQuestions.includes(question._id)}
              onChange={() => handleQuestionSelection(question._id)}
            />
            <span>{question.question}</span>
          </div>
        ))}
      </div>
    )}
    <button onClick={handleSubmitTest}>Submit Test</button>
  </div>  )
}

export default CreateTest