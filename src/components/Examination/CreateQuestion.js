import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Alert from '@mui/material/Alert';
import { TextField } from '@mui/material';

function CreateQuestion() {

   const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  bgcolor: 'background.paper',
  border: 'none',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'column', // Set the flex direction to column
  gap: '10px',
  borderRadius: '8px', // Add borderRadius property here
};

    
    
    
    const [open, setOpen] = useState(false);
    const [selectedOption1, setSelectedOption1] = useState('');
    const [selectedOption2, setSelectedOption2] = useState('');
    const [question, setQuestion] = useState('');
    const [options, setOptions] = useState(['', '', '', '']);
    const [answer, setAnswer] = useState('');
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
        
    }
    

        const handleAnswerChange = (event) => {
            setAnswer(event.target.value);
        };
        const handleChange1 = (event) => {
            setSelectedOption1(event.target.value);
        };
        
        const handleChange2 = (event) => {
            setSelectedOption2(event.target.value);
        };
        
    const handleSubmit = async () => {
          // Check if all mandatory fields are filled
  if (!selectedOption1 || !selectedOption2 || !question || options.some(option => !option) || !answer) {
    // If any mandatory field is empty, display an error message and do not submit the form
    alert('Please fill in all mandatory fields');
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
            const response = await fetch('https://rfc2rnvg-5000.inc1.devtunnels.ms/question', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newQuestion),
            });
        
            // Check if the response status is 200
            if (response.status === 200) {
                // Show the success message
                setFormSubmitted(true);
        
                // Reset the form fields after successful submission
                setSelectedOption1('');
                setSelectedOption2('');
                setQuestion('');
                setOptions(['', '', '', '']);
                setAnswer('');
            } else {
                // Handle other response statuses if needed
                console.error('Error:', response.statusText);
            }
        } catch (error) {
            console.error('Error:', error);
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
        <div>
            <Button onClick={handleOpen}>Open modal</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} >
                <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                        <div style={{ width: '30%' }}>Question</div>
                      
                    <div style={{ display: 'flex', justifyContent: 'center',gap:'20%',width:'70%' }}>
                        <div style={{width:'50%'}}>
                            <Select
                                value={selectedOption1}
                                onChange={handleChange1}
                                displayEmpty
                                style={{ height: '35px',width:'100%' }} 
                                inputProps={{ 'aria-label': 'Select an option' }}
                            >
                                <MenuItem value="" disabled>
                                    Subject
                                </MenuItem>
                                <MenuItem value="ReactJS">ReactJS</MenuItem>
                                <MenuItem value="option2">C++</MenuItem>
                                <MenuItem value="option3">Java</MenuItem>
                            </Select>
                        </div>

                        <div  style={{width:'50%'}}>
                            <Select
                                value={selectedOption2}
                                onChange={handleChange2}
                                displayEmpty
                                style={{ height: '35px',width:'100%'  }} 
                                inputProps={{ 'aria-label': 'Select an option', }}
                            >
                                <MenuItem value="" disabled>
                                    Type
                                </MenuItem>
                                <MenuItem value="Mcq">MCQ</MenuItem>
                                
                            </Select>
                        </div>
                    </div>
</div>
                    <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                        <div style={{ width: '30%' }}>Question</div>
                        <div style={{ width: '70%' }}>
                            <TextField 
                            // type="text" placeholder='Enter Question' onChange={(e) => setQuestion(e.target.value)}
                            sx={{ flexGrow: 1,width:'100%' }}
                            InputProps={{ style: { height: '35px' } }}

                            type="text"
                            placeholder='Enter Question'
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

                    <div style={{ display: 'flex', justifyContent: 'center', width: '100%', }}>
                        <div style={{ width: '30%' }}>Option</div>
                        <div style={{ width: '70%',
                        //  backgroundColor: 'grey',
                          justifyContent: 'center', display: 'flex', padding: '10px 0px', flexDirection: 'column', gap: '30px' }}>
                            {options.map((option, index) => (
    <div key={index} style={{ display: 'flex', gap: '30px' }}>
      <TextField
        style={{ flexGrow: '1' }}
        type="text"
        placeholder={`Option ${String.fromCharCode(65 + index)}`} 
        value={option}
        onChange={(e) => handleOptionChange(index, e.target.value)}
        variant="outlined"
        InputProps={{ style: { height: '35px' } }}
      />
    </div>
  ))}
                        </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                        <div style={{ width: '30%' }}>Answer</div>
                        <div style={{ width: '70%' }}>
                            <TextField type="text" placeholder='Enter Answer' onChange={handleAnswerChange}
                           sx={{ flexGrow: 1,width:'100%' }}
                           InputProps={{ style: { height: '35px' } }}
                            //   style={{
                            //     padding: '8px',
                            //     border: '1px solid #ccc',
                            //     borderRadius: '4px',
                            //     width: '100%',
                            // }}
                            />
                        </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Button variant='contained' onClick={handleSubmit}>Submit</Button>
                    </div>
                </Box>
            </Modal>
           {formSubmitted && (
        <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 1000 }}>
          <Alert severity="success" onClose={handleAlertClose} sx={{ width: '100%' }}>
            Question Created
          </Alert>
        </div>
      )}

        </div>
    );
}

// Other import statements and component code...

export default CreateQuestion;