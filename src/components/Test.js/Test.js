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


const gridText = {
    fontSize: '20px',
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




const fetchData = async () => {
    try {
    // Make an API call using Axios
    const response = await axios.get("https://pwf7r20w-3000.inc1.devtunnels.ms/test");
    
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
   const count   = testsData.filter(res=> res.subject_name === 'C++').length ;
   return count
}

const countofjava  =()=> {
    const count   = testsData.filter(res=> res.subject_name === 'Java').length ;
   return count
}
const countofReactjs =() =>{
    const count   = testsData.filter(res=> res.subject_name === 'ReactJS').length ;
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


    <TableContainer component={Paper} style={{ maxHeight: '500px', overflow: 'auto' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Test ID
              </TableCell>
              <TableCell>Subject Name
              </TableCell>
              <TableCell> Time
              </TableCell>
              {/* Other table headers if needed */}
            </TableRow>
          </TableHead>
          <TableBody>
            {testsData.map((row) => (
              <TableRow key={row._id} onClick={() => handleRowClick(row)}>
                <TableCell>{row.testId}</TableCell>
                <TableCell>{row.subjectName}</TableCell>
                <TableCell>{row.subjectName} {"30min"}</TableCell>

                {/* Other table cells if needed */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal to show detailed question set */}
      <Modal open={openQuestionSetModal} onClose={handleCloseQuestionSetModal}>
        <div>
          {/* Display detailed question set */}
          {/* For example, you can render the entire selectedQuestionSet here */}
          <pre>{JSON.stringify(selectedQuestionSet, null, 2)}</pre>

          <Button onClick={handleSendTest}>Send Test</Button>
        </div>
      </Modal>

      {/* Modal to send the test to a student */}
      <Modal open={openSendTestModal} onClose={handleCloseSendTestModal}>
        <div>
          <h2>Send Test</h2>
          <TextField
            label="Test ID"
            value={selectedTestId}
            onChange={(e) => setSelectedTestId(e.target.value)}
          />
          <TextField
            label="Student Name"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
          />
          <TextField
            label="Student Email"
            value={studentEmail}
            onChange={(e) => setStudentEmail(e.target.value)}
          />
          <Button onClick={handleSubmitTest}>Submit</Button>
        </div>
      </Modal>
    </Box>
    );
};

export default Test;
