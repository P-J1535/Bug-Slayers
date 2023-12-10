import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import axios from "axios";
import "./Examination.css";
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
} from "@mui/material";

import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  tableHead: {
    position: "sticky",
    top: 0,
    zIndex: 1,
    backgroundColor: "#f2f2f2",
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
  // display: "flex",
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
  paddingTop: "7px",
  paddingBottom: "7px",
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

const Examination = () => {
  const [questionData, setQuestionData] = useState([]);
  const classes = useStyles(); // Initialize classes using useStyles

  const fetchData = async () => {
    try {
      // Make an API call using Axios
      const response = await axios.get("http://localhost:6000/question");

      // Assuming the data is stored in response.data

      const data = response.data.questionbank.reverse(); // Reversing the array
      setQuestionData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const countOfCpp = () => {
    const count = questionData.filter(
      (res) => res.subject_name === "C++"
    ).length;
    return count;
  };

  const countofjava = () => {
    const count = questionData.filter(
      (res) => res.subject_name === "Java"
    ).length;
    return count;
  };
  const countofReactjs = () => {
    const count = questionData.filter(
      (res) => res.subject_name === "ReactJS"
    ).length;
    return count;
  };

  return (
    <Box sx={{ mx: 3 }}>
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
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: "110px",
                }}
              >
                <div>
                  <Typography style={gridNumber}>{countOfCpp()}</Typography>
                  <Typography style={gridText}>C++</Typography>
                </div>
                <div>
                  <img
                    src="https://cdn4.iconfinder.com/data/icons/logos-brands-in-colors/404/c_logo-512.png"
                    style={{ width: "100px", height: "94px" }} // Adjust the styling as needed
                  />
                </div>
              </div>
            </Box>
          </Box>
        </Grid>
        {/* Grid item 2 */}
        <Grid item md={4} xs={12} sm={6}>
          <Box style={gridBox2}>
            <Box style={gridInBox}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  gap: "90px",
                }}
              >
                <div>
                  <Typography style={gridNumber}>{countofjava()}</Typography>
                  <Typography style={gridText}>Java </Typography>
                </div>
                <img
                  src="https://cdn1.iconfinder.com/data/icons/MetroStation-PNG/256/MB__java.png"
                  style={{ width: "100px", height: "auto" }} // Adjust the styling as needed
                />
              </div>
            </Box>
          </Box>
        </Grid>

        <Grid item md={4} xs={12} sm={6}>
          <Box style={gridBox3}>
            <Box style={gridInBox}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  gap: "90px",
                }}
              >
                <div>
                  <Typography style={gridNumber}>{countofReactjs()}</Typography>
                  <Typography style={gridText}>React</Typography>
                </div>
                <img
                  src="https://cdn4.iconfinder.com/data/icons/logos-3/600/React.js_logo-1024.png"
                  style={{ width: "100px", height: "auto" }} // Adjust the styling as needed
                />
              </div>
            </Box>
          </Box>
        </Grid>
        {/* ... other grid items */}
      </Grid>
      <Box sx={{ display: "flex", justifyContent: "flex-end", my: 1 }}>
        <Button variant="contained" sx={{ px: 2 }}>
          Create Question
        </Button>
      </Box>
      <TableContainer
        component={Paper}
        style={{ height: "500px", overflow: "auto" }}
      >
        <Table>
          <TableHead>
            <TableRow className={classes.tableHead}>
              <TableCell>Sr.No</TableCell>
              <TableCell>Subject</TableCell>
              <TableCell sx={{ minWidth: "100px" }}>Question Type</TableCell>
              <TableCell>Question</TableCell>
              <TableCell sx={{ minWidth: "300px", maxWidth: "300px" }}>
                Options
              </TableCell>
              <TableCell>Answer</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {questionData.map((question, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{question.subject_name}</TableCell>
                <TableCell>{question.questionType}</TableCell>
                <TableCell>{question.question}</TableCell>
                <TableCell>
                  {Array.isArray(question.option)
                    ? question.option.join(",")
                    : question.option}
                </TableCell>{" "}
                <TableCell>{question.Answer}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Examination;
