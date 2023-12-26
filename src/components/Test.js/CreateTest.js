import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Select } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';

const CreateTest = ({handleCloseTest , getData}) => {
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [questionData, setQuestionData] = useState([]);
  const [questionSet, setQuestionSet] = useState([]);

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

  useEffect(() => {
    const fetchQuestions = async () => {
      setSelectedQuestions([])
      try {
        const response = await axios.get(`http://localhost:5000/question/${selectedSubject}`);
        setQuestionSet(response.data.questions);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    if (selectedSubject !== '') {
      fetchQuestions();
    }
  }, [selectedSubject]);

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


  const handleCheckboxChange = (question) => {
    const foundIndex = selectedQuestions.findIndex((q) => q._id === question._id);

    if (foundIndex === -1 && selectedQuestions.length < 10) {
      setSelectedQuestions([...selectedQuestions, question]);
    } else if (foundIndex !== -1) {
      const updatedSelection = [...selectedQuestions];
      updatedSelection.splice(foundIndex, 1);
      setSelectedQuestions(updatedSelection);
    }
  };


   console.log(selectedQuestions)
  const handleSubmitTest = () => {
    const selectedQuestionsDetails = questionData
      .filter((question) => selectedQuestions.includes(question._id))
      .map(({ _id, question, option, Answer }) => ({
        _id,
        question,
        option,
        Answer,
      }));

    const testSubmissionData = {
      subjectName: selectedSubject,
      questionType: 'Mcq',
      QuestionSet: selectedQuestions,
      count: selectedQuestions.length,
    };

    axios.post('http://localhost:5000/test', testSubmissionData)
      .then((response) => {
        handleCloseTest();
        console.log('Test submitted successfully!', response.data);
        getData();
      })
      .catch((error) => {
        console.error('Error submitting test:', error);
      });
  };

  return (
    <div style={{padding:"20px"}}> 
      <div style={{display:'flex',alignItems:'center',gap:'20px'}}>
      <h3>Select Subject</h3>
      <Select  size="small" sx={{width:"300px"}} value={selectedSubject} onChange={(e) => handleCreateTest(e.target.value)}>
        <MenuItem value="">
          <em>Select Subject</em>
        </MenuItem>
       
          <MenuItem value={"C++"}>
            C++
          </MenuItem>
          <MenuItem value={"Java"}>
              Java
          </MenuItem>
          <MenuItem value={"ReactJs"}>
            ReactJS
          </MenuItem>
      </Select>
      </div>
      <div style={{display:'flex',justifyContent:'space-between'}}>

      
      <h4>Select 10 Questions for test:</h4>  
      <h6>{selectedQuestions?.length} /10</h6>  
      </div>
      <div style={{ minHeight: '360px', maxHeight:'360px', overflow: 'auto' }}>
        {questionSet && (
          <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px', backgroundColor: '#f7f7f7' }}>
            {questionSet.map((question, index) => (
              <div key={question._id} style={{ marginBottom: '20px', boxShadow: '0 0 5px rgba(0,0,0,0.2)', padding: '15px', borderRadius: '5px', backgroundColor: '#ffffff' }}>
                 <input
                  type="checkbox"
                  checked={selectedQuestions.includes(question)}
                  onChange={() => handleCheckboxChange(question)}
                />
                <h3 style={{ marginBottom: '10px', fontSize: '18px', fontWeight: 'bold', color: '#333333' }}>{`Question ${index + 1}: ${question.question}`}</h3>
                <ul style={{ listStyleType: 'none', padding: '0' }}>
                  {question.option.map((opt, i) => (
                    <li key={i} style={{ fontSize: '14px', marginBottom: '5px', color: '#666666' }}>{`${i + 1}. ${opt}`}</li>
                  ))}
                </ul>
                <p style={{ marginTop: '10px', fontSize: '14px', fontWeight: 'bold', color: '#333333' }}>Answer: {question.Answer}</p>
              </div>
            ))}
          </div>
        )}
      </div>
      <div style={{display:'flex',justifyContent:'center',gap:'20px'}}>
      <Button sx={{mt:1,}} variant='contained' onClick={handleSubmitTest}>Create Test</Button>
      <Button sx={{mt:1,}} variant='contained' onClick={handleCloseTest}>Cancel</Button>

      </div>
    </div>
  );
};

export default CreateTest;
