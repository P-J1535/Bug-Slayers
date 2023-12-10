import React, { useState, useEffect } from 'react';

import axios from 'axios';
import {
    TableContainer,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Box,
    Paper,
    Typography,
    Grid,
    Button,
    TextField,
    Modal


} from '@mui/material';

import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
    tableHead: {
    position: 'sticky',
    top: 0,
    zIndex: 1,
    backgroundColor: '#f2f2f2',
    },
});



const style2 = {
    position: 'absolute',
    top: '45%',
    left: '50%',
    width: '80%',
    height: '75vh',
    transform: 'translate(-50%, -50%)',
    borderRadius: '15px',
    border: '1px solid white',
    // overflow:'auto',
    backgroundColor:'white'
  };

  const style3 = {
    position: 'absolute',
    top: '45%',
    left: '50%',
    width: '500px',
    height: '400px',
    transform: 'translate(-50%, -50%)',
    borderRadius: '15px',
    border: '1px solid white',
    // overflow:'auto',
    backgroundColor:'white'
  };



const gridText = {
    fontSize: '30px',
    fontWeight: '600',
    color: 'white',
  }
  
  const gridNumber = {
    fontSize: '36px',
    fontWeight: '700',
    color: 'white',
  }
  
  const gridInBox = {
    display: 'flex',
    flexDirection: 'column',
    // justifyContent:'center',
    // alignItems:'center',
    zIndex: 1,
  }
  
  const commonBoxCss ={
    borderRadius: '10px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: '10px',
    paddingBottom: '10px',
    paddingLeft: '8%',
    paddingRight: '8%',
    overflow: "hidden",
    position: 'relative',
    boxShadow: "2px 2px 5px grey"
  }
  const gridBox1 = {
    background: 'linear-gradient(115deg, #0074BD 34.08%, #2B90D0 81.49%)',
    ...commonBoxCss
  }
  
  const gridBox2 = {
    background: 'linear-gradient(100deg, #239A60 30.43%, #0FB263 89.1%)',
        ...commonBoxCss
  }
  const gridBox3 = {
    background: 'linear-gradient(99deg, #A0F 3.62%, #D787FF 100%)',
    ...commonBoxCss
}
const Test = () => {
    const classes = useStyles(); // Initialize classes using useStyles

const [testsData, settestsData] = useState([]);
const [selectedQuestionSet, setSelectedQuestionSet] = useState(null);
  const [openQuestionSetModal, setOpenQuestionSetModal] = useState(false);
  const [openSendTestModal, setOpenSendTestModal] = useState(false);
  const [selectedTestId, setSelectedTestId] = useState('');
  const [studentName, setStudentName] = useState('');
  const [studentEmail, setStudentEmail] = useState('');

  const handleRowClick = (row) => {
    setSelectedQuestionSet(row);
    setOpenQuestionSetModal(true);
  };

  const handleSendTest = () => {
    setOpenQuestionSetModal(false);
    setOpenSendTestModal(true);
  };

  const handleCloseQuestionSetModal = () => {
    setOpenQuestionSetModal(false);
  };

  const handleCloseSendTestModal = () => {
    setOpenSendTestModal(false);
  };

  const handleSubmitTest = () => {
    // Logic to submit the test, e.g., sending data to an API
    // After submission, close the modal and reset fields
    setOpenSendTestModal(false);
    setSelectedTestId('');
    setStudentName('');
    setStudentEmail('');
  };


  const QuestionSet = ({ questionData }) => {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px', backgroundColor: '#f7f7f7' }}>
      {questionData.map((question, index) => (
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

      

const fetchData = async () => {
    try {
    // Make an API call using Axios
    const response = await axios.get("http://localhost:6000/test");
    
    // Assuming the data is stored in response.data

    const data = response.data.test.reverse();// Reversing the array
    console.log(data)
    settestsData(data);
    } catch (error) {
    console.error("Error fetching data:", error);
    }
};

useEffect(() => {
    
    fetchData();
}, []);


const countOfCpp = () =>{
   const count   = testsData?.filter(res=> res?.subjectName === 'C++').length ;
   return count
}

const countofjava  =()=> {
    const count   = testsData?.filter(res=> res?.subjectName === 'Java').length ;
   return count
}
const countofReactjs =() =>{
    const count   = testsData?.filter(res=> res?.subjectName === 'ReactJS').length ;
   return count
}


return (
    <Box sx={{px:3}}>
    <Grid
container
sx={{ my: 2 }}
columnSpacing={{ xs: 2, sm: 4, md: 4 }}
rowSpacing={{ xs: 2, sm: 2, md: 3 }}
>

<Grid item md={4} xs={12} sm={6}>
<Box style={gridBox1}>
  <Box style={gridInBox}>
    <Typography style={gridNumber}>{countOfCpp()}</Typography>
    <Typography style={gridText}>C++</Typography>
  </Box>
</Box>
</Grid>

<Grid item md={4} xs={12} sm={6}>
<Box style={gridBox2}>
  <Box style={gridInBox}>
    <Typography style={gridNumber}>{countofjava()}</Typography>
    <Typography style={gridText}>Java</Typography>
  </Box>
</Box>
</Grid>
<Grid item md={4} xs={12} sm={6}>
<Box style={gridBox3}>
  <Box style={gridInBox}>
    <Typography style={gridNumber}>{countofReactjs()}</Typography>
    <Typography style={gridText}>ReactJs</Typography>
  </Box>
</Box>
</Grid>
</Grid>

<Box sx={{display:'flex',justifyContent:'flex-end',my:1}}>
    <Button variant='contained' sx={{px:2}}>Create Test</Button>
</Box>
    <TableContainer component={Paper} style={{ height: '500px', overflow: 'auto' }}>
        <Table>
          <TableHead>
          <TableRow className={classes.tableHead}>
              <TableCell>Test ID
              </TableCell>
              <TableCell>Subject Name
              </TableCell>
              <TableCell> Time
              </TableCell>
              <TableCell> No of Question
              </TableCell>
              <TableCell> Type
              </TableCell>
              {/* Other table headers if needed */}
            </TableRow>
          </TableHead>
          <TableBody>
            {testsData?.map((row) => (
              <TableRow key={row._id} onClick={() => handleRowClick(row)}>
                <TableCell>{row.testId}</TableCell>
                <TableCell>{row?.subjectName}</TableCell>
                <TableCell>{row.time} {"30min"}</TableCell>
                <TableCell>{row.count}</TableCell>
                <TableCell>{row.questionType}</TableCell>

                {/* Other table cells if needed */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal to show detailed question set */}
        <Modal open={openQuestionSetModal} onClose={handleCloseQuestionSetModal}>
            <Box style={style2}>
             <div >
                <div style={{padding:'20px',display:'flex',justifyContent:'space-between'}}>
                    <div>
      <h1>Sub Name: {selectedQuestionSet?.subjectName} </h1>
      <h2>Test ID: {selectedQuestionSet?.testId}</h2>
      </div>    
      <div>
      <p>Time: {selectedQuestionSet?.time} minutes</p>
      <p>Number of Questions: {selectedQuestionSet?.count}</p>
      </div>
      </div>
      <div style={{height:'350px',overflow:'auto'}}>
      <QuestionSet questionData={selectedQuestionSet?.QuestionSet} />
      </div>
    </div> 
           <div style={{display:'flex',justifyContent:'center',paddingX:'30px',marginTop:'30px'}}>
            <Button sx={{pr:3,mr:4}}  variant='contained' onClick={handleSendTest}>Send Test</Button>
            </div>
            </Box>
        </Modal>

      {/* Modal to send the test to a student */}
      <Modal open={openSendTestModal} onClose={handleCloseSendTestModal}>
        <Box style={style3}>
            <Box sx={{px:2}}>
          <h2 style={{textAlign:'center',marginTop:'30px'}}>Enter User Details</h2>
          <TextField
            label="Test ID"
            value={selectedQuestionSet?.testId}
            fullWidth
            size='small'
            sx={{mt:2}}
          />
           <TextField
            label="Subject Name"
            value={selectedQuestionSet?.subjectName}
            fullWidth
            size='small'
            sx={{mt:2}}
          />
          <TextField
            label="Enter  Name"
            value={studentName}
            size='small'
            fullWidth
            sx={{mt:2}}

            onChange={(e) => setStudentName(e.target.value)}
          />
          <TextField
            label="Enter Email"
            value={studentEmail}
            size='small'
            fullWidth
            sx={{mt:2}}

            onChange={(e) => setStudentEmail(e.target.value)}
          />
          <Box sx={{display:'flex',justifyContent:'center',mt:2}}>
          <Button variant='contained' onClick={handleSubmitTest}>Submit</Button>
          </Box>
          </Box>
        </Box>
      </Modal>
    </Box>
    );
};

export default Test;
