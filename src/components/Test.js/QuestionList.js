    import React from 'react';

    const QuestionList = ({ questions }) => {
    return (
        <div>
        {questions.map((question, index) => (
            <div key={question._id} style={{ marginBottom: '20px', boxShadow: '0 0 5px rgba(0,0,0,0.2)', padding: '15px', borderRadius: '5px', backgroundColor: '#ffffff' }}>
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
    );
    };

    export default QuestionList;
