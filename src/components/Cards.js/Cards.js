import React, { useEffect, useState } from 'react'
import { Box, Button,Typography } from '@mui/material'
import axios from 'axios'


function Cards() {

    const [data,setData]= useState([]);

    useEffect(() => {
        axios.get('http://localhost:4000/subjects') // Add http:// or https:// here
            .then((res) => {
                console.log(res.data.allSubject);
                setData(res.data.allSubject)
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);


    const takeExam = (data)=>{
     console.log(data)
    }



  return (
    <div>
        <Box sx={{display:'flex',flexWrap:'wrap',gap:'20px',p:4,justifyContent:'space-evenly'}}>
        {data.map((item)=>(
        <Box sx={{width:'300px',height:'380px' ,backgroundColor:'white',boxShadow:'2px 2px 10px  grey  ',}}>
      <Box sx={{backgroundColor:'darkblue',display:'flex',justifyContent:'flex-start',alignItems:'center',height:'150px',p:2}}>
        <Typography sx={{fontSize:'30px',color:'white'}}>
        {item.languageName}
        </Typography>
      </Box>
          <Box sx={{p:2}}>
          <Typography>
          {item.time}
        </Typography>
        <Typography>
          {item.numberOfQuestions + " Questions"}
        </Typography>
        <Typography>
          0/3 Attempts
        </Typography>   
         <Box sx={{display:'flex',flexDirection:'flex-end'}}>
        <Button variant='contained' color='secondary'
        onClick={()=>{takeExam(item.questions)}} 
        sx={{px:3,py:1,fontSize:'15px',boxShadow:'2px 2px 10px  grey  ',ml:15,mt:2}}>Take Exam</Button>
        </Box>
          </Box>
     </Box>
     ))}
     </Box>
    </div>
  )
}

export default Cards