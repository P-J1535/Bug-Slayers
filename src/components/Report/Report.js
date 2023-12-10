import React,{useState, useEffect} from 'react';
import { Table, TableContainer ,TableHead, TableBody, TableRow, Box, TableCell, Paper } from '@mui/material';
import axios from 'axios';
import { makeStyles } from '@mui/styles';
import {Typography,Grid} from '@mui/material';

    const useStyles = makeStyles({
        tableHead: {
        position: 'sticky',
        top: 0,
        zIndex: 1,
        backgroundColor: '#f2f2f2',
        },
    });

    const gridText = {
        fontSize: "30px",
        fontWeight: "600",
        color: "white",
      };
      
      const gridNumber = {
        fontSize: "36px",
        fontWeight: "700",
        color: "white",
      };
      
      const gridInBox = {
        display: "flex",
        flexDirection: "column",
        // justifyContent:'center',
        // alignItems:'center',
        zIndex: 1,
      };
      
      const commonBoxCss = {
        borderRadius: "10px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        paddingTop: "10px",
        paddingBottom: "10px",
        paddingLeft: "8%",
        paddingRight: "8%",
        overflow: "hidden",
        position: "relative",
        boxShadow: "2px 2px 5px grey",
      };
      const gridBox1 = {
        background: "linear-gradient(115deg, #0074BD 34.08%, #2B90D0 81.49%)",
        ...commonBoxCss,
      };
      
      const gridBox2 = {
        background: "linear-gradient(100deg, #239A60 30.43%, #0FB263 89.1%)",
        ...commonBoxCss,
      };
      const gridBox3 = {
        background: "linear-gradient(99deg, #A0F 3.62%, #D787FF 100%, #800000)", // Maroon color added
        ...commonBoxCss,
      };
      
      

const Report = () => {

    const [reportData, setReportData] = useState([]);
    const classes = useStyles(); // Initialize classes using useStyles

    useEffect(() => {
      // Axios GET request
      axios.get('http://localhost:5000/result')
        .then(response => {
          // Set the retrieved data to the state
          setReportData(response?.data.results);
        })
        .catch(error => {
          console.error('Error fetching data: ', error);
        });
    }, []); 



    const countOfCpp = () => {
        const count = reportData.filter(
          (res) => res.subjectName === "C++"
        ).length;
        return count;
      };
    
      const countofjava = () => {
        const count = reportData.filter(
          (res) => res.subjectName === "Java"
        ).length;
        return count;
      };
      const countofReactjs = () => {
        const count = reportData.filter(
          (res) => res.subjectName === "ReactJS"
        ).length;
        return count;
      };


  return (
    <Box sx={{px:3}}>

<Grid
        container
        sx={{ my: 2 }}
        columnSpacing={{ xs: 2, sm: 4, md: 4 }}
        rowSpacing={{ xs: 2, sm: 2, md: 3 }}
      >
        {/* ... other grid items */}
        {/* Grid item 1 */}
        <Grid item md={4} xs={12} sm={6}>
          <Box style={gridBox1}>
            <Box style={gridInBox}>
              <Typography style={gridNumber}>{countOfCpp()}</Typography>
              <Typography style={gridText}>C++</Typography>
            </Box>
          </Box>
        </Grid>
        {/* Grid item 2 */}
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
        {/* ... other grid items */}
      </Grid>
    <Paper>
    <TableContainer component={Paper} style={{ height: '480px', overflow: 'auto' }}>

      <Table>
        <TableHead>
        <TableRow className={classes.tableHead}>
            <TableCell>Test ID</TableCell>
            <TableCell>Subject Name</TableCell>
            <TableCell>Name</TableCell>

            <TableCell>Email</TableCell>
            <TableCell>score</TableCell>

            <TableCell>Result</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {reportData?.map((item) => (
            <TableRow key={item._id}>
              <TableCell>{item.testId}</TableCell>
              <TableCell>{item.subjectName}</TableCell>
              <TableCell>{item.userName}</TableCell>

              <TableCell>{item.emailId}</TableCell>

              <TableCell>{item.score}</TableCell>
              <TableCell>{item.result}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </TableContainer>
    </Paper>
    </Box>
  );
};

export default Report;
