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
import { Select, MenuItem, TextField, Alert, Modal } from "@mui/material";

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

const Examination = () => {
  const [questionData, setQuestionData] = useState([]);
  const classes = useStyles(); // Initialize classes using useStyles

  const fetchData = async () => {
    try {
      // Make an API call using Axios
      const response = await axios.get("http://localhost:5000/question");

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

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 800,
    bgcolor: "background.paper",
    border: "none",
    boxShadow: 24,
    p: 4,
    display: "flex",
    flexDirection: "column", // Set the flex direction to column
    gap: "10px",
    borderRadius: "8px", // Add borderRadius property here
  };

  const [open, setOpen] = useState(false);
  const [selectedOption1, setSelectedOption1] = useState("");
  const [selectedOption2, setSelectedOption2] = useState("");
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [answer, setAnswer] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions); // Add this line to update the state with the new options
  };

  const handleAnswerChange = (event) => {
    setAnswer(event.target.value);
  };
  const handleChange1 = (event) => {
    setSelectedOption1(event.target.value);
  };

  const handleChange2 = (event) => {
    setSelectedOption2(event.target.value);
  };

  const cancel = () => {
    setSelectedOption1("");
    setSelectedOption2("");
    setQuestion("");
    setOptions(["", "", "", ""]);
    setAnswer("");
    handleClose();
  };

  const handleSubmit = async () => {
    // Check if all mandatory fields are filled
    if (
      !selectedOption1 ||
      !selectedOption2 ||
      !question ||
      options.some((option) => !option) ||
      !answer
    ) {
      // If any mandatory field is empty, display an error message and do not submit the form
      alert("Please fill in all mandatory fields");
      return;
    }
    const newQuestion = {
      subject_name: selectedOption1,
      questionType: selectedOption2,
      question: question,
      option: options,
      Answer: answer,
    };

    try {
      const response = await fetch(
        "https://rfc2rnvg-5000.inc1.devtunnels.ms/question",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newQuestion),
        }
      );

      // Check if the response status is 200
      if (response.status === 200) {
        // Show the success message
        setFormSubmitted(true);
        fetchData();
        // Reset the form fields after successful submission
        cancel();
      } else {
        // Handle other response statuses if needed
        console.error("Error:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }

    // Close the modal after submission
    handleClose();
  };

  const handleAlertClose = () => {
    setFormSubmitted(false);
  };

  const displayAlertAndClose = () => {
    setFormSubmitted(true);

    setTimeout(() => {
      handleAlertClose();
    }, 5000); // Close the alert after 5 seconds
  };

  return (
    <Box sx={{ mx: 1 }}>
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

      <Box sx={{ display: "flex", px: 2, py: 1, justifyContent: "flex-end" }}>
        <Button variant="contained" onClick={handleOpen}>
          Add Question
        </Button>
      </Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div
            style={{ display: "flex", justifyContent: "center", width: "100%" }}
          >
            <div style={{ width: "30%" }}>Select Sub & Type</div>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "20%",
                width: "70%",
              }}
            >
              <div style={{ width: "50%" }}>
                <Select
                  value={selectedOption1}
                  onChange={handleChange1}
                  displayEmpty
                  style={{ height: "35px", width: "100%" }}
                  inputProps={{ "aria-label": "Select an option" }}
                >
                  <MenuItem value="" disabled>
                    Subject
                  </MenuItem>
                  <MenuItem value="ReactJS">ReactJS</MenuItem>
                  <MenuItem value="option2">C++</MenuItem>
                  <MenuItem value="option3">Java</MenuItem>
                </Select>
              </div>

              <div style={{ width: "50%" }}>
                <Select
                  value={selectedOption2}
                  onChange={handleChange2}
                  displayEmpty
                  style={{ height: "35px", width: "100%" }}
                  inputProps={{ "aria-label": "Select an option" }}
                >
                  <MenuItem value="" disabled>
                    Type
                  </MenuItem>
                  <MenuItem value="Mcq">MCQ</MenuItem>
                </Select>
              </div>
            </div>
          </div>
          <div
            style={{ display: "flex", justifyContent: "center", width: "100%" }}
          >
            <div style={{ width: "30%" }}>Question</div>
            <div style={{ width: "70%" }}>
              <TextField
                // type="text" placeholder='Enter Question' onChange={(e) => setQuestion(e.target.value)}
                sx={{ flexGrow: 1, width: "100%" }}
                InputProps={{ style: { height: "35px" } }}
                type="text"
                placeholder="Enter Question"
                onChange={(e) => setQuestion(e.target.value)}
                // style={{
                //     padding: '8px',
                //     border: '1px solid #ccc',
                //     borderRadius: '4px',
                //     width: '100%',
                // }}
              />
            </div>
          </div>

          <div
            style={{ display: "flex", justifyContent: "center", width: "100%" }}
          >
            <div style={{ width: "30%" }}>Options:</div>
            <div
              style={{
                width: "70%",
                //  backgroundColor: 'grey',
                justifyContent: "center",
                display: "flex",
                padding: "10px 0px",
                flexDirection: "column",
                gap: "30px",
              }}
            >
              {options.map((option, index) => (
                <div key={index} style={{ display: "flex", gap: "30px" }}>
                  <TextField
                    style={{ flexGrow: "1" }}
                    type="text"
                    placeholder={`Option ${String.fromCharCode(65 + index)}`}
                    value={option}
                    onChange={(e) => handleOptionChange(index, e.target.value)}
                    variant="outlined"
                    InputProps={{ style: { height: "35px" } }}
                  />
                </div>
              ))}
            </div>
          </div>

          <div
            style={{ display: "flex", justifyContent: "center", width: "100%" }}
          >
            <div style={{ width: "30%" }}>Answer</div>
            <div style={{ width: "70%" }}>
              <TextField
                type="text"
                placeholder="Enter Answer"
                onChange={handleAnswerChange}
                sx={{ flexGrow: 1, width: "100%" }}
                InputProps={{ style: { height: "35px" } }}
                //   style={{
                //     padding: '8px',
                //     border: '1px solid #ccc',
                //     borderRadius: '4px',
                //     width: '100%',
                // }}
              />
            </div>
          </div>

          <div
            style={{ display: "flex", justifyContent: "flex-end", gap: "20px" }}
          >
            <Button variant="contained" onClick={handleSubmit}>
              Submit
            </Button>
            <Button variant="contained" onClick={cancel}>
              Cancel
            </Button>
          </div>
        </Box>
      </Modal>
      {/* {formSubmitted && (
        <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 1000 }}>
          <Alert severity="success" onClose={handleAlertClose} sx={{ width: '100%' }}>
            Question Created
          </Alert>
        </div> )} */}
      <TableContainer
        component={Paper}
        style={{ height: "450px", overflow: "auto" }}
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
