// import React, { useState, useEffect } from "react";
// import "./Table.css"; // Use the same CSS file from the previous example

// const QuizTable = () => {
//   const [quizData, setQuizData] = useState({ test: [] }); // Initialize with an object

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch(
//           "https://pwf7r20w-3000.inc1.devtunnels.ms/test"
//         );
//         const data = await response.json();
//         setQuizData(data); // Assuming data is an array of quiz questions
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <div className="table-container">
//       <table className="custom-table">
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Question Set</th>
//             <th>Question</th>
//             <th>Options</th>
//             <th>Correct Answer</th>
//           </tr>
//         </thead>
//         <tbody>
//           {quizData.test.map((test, testIndex) =>
//             test.QuestionSet.map((quiz, index) => (
//               <tr key={`${testIndex}-${index}`}>
//                 <td>{quiz._id}</td>
//                 <td>{test.testId}</td>
//                 <td>{quiz.question}</td>
//                 <td>
//                   <ul>
//                     {quiz.option.map((option, optionIndex) => (
//                       <li key={optionIndex}>{option}</li>
//                     ))}
//                   </ul>
//                 </td>
//                 <td>{quiz.Answer}</td>
//               </tr>
//             ))
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default QuizTable;

import React, { useState, useEffect } from "react";
import "./Table.css"; // Use the same CSS file from the previous example

const QuizTable = () => {
  const [quizData, setQuizData] = useState({ test: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://pwf7r20w-3000.inc1.devtunnels.ms/test"
        );
        const data = await response.json();
        setQuizData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="table-container">
      <table className="custom-table">
        <thead>
          <tr>
            {/* <th>ID</th> */}
            <th>Id</th>
            <th>Question</th>
            <th>Options</th>
            <th>Correct Answer</th>
          </tr>
        </thead>
        <tbody>
          {quizData.test.map((test, testIndex) =>
            test.QuestionSet.map((quiz, index) => (
              <tr key={`${testIndex}-${index}`}>
                {/* <td>{quiz._id}</td> */}
                <td>{test.testId}</td>
                <td>{quiz.question}</td>
                <td>
                  <ul>
                    {quiz.option.map((option, optionIndex) => (
                      <li key={optionIndex}>{option}</li>
                    ))}
                  </ul>
                </td>
                <td>{quiz.Answer}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default QuizTable;
