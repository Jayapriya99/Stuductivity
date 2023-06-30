import { Button, TextField, Box } from '@material-ui/core';
import { Typography } from '@mui/material';
import { useState } from "react";
import axios from 'axios';

function TextSummarizer() {
  const [summary, setSummary] = useState("");
  const [text, setText] = useState("");

  const handleSummarize = () => {
    axios.post('http://localhost:8080/summarize', { text: text })
      .then(response => {
        const summary = response.data.summary;
        setSummary(summary);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  return (
    <div>
      <Typography
        style={{ paddingTop: 20 }}
        className='text-sum'
        variant='h5'
        align='center'>
        Text Summarisation
      </Typography>
      <Typography
        className='text-sum-words'
        align='center'
        style={{ paddingTop: 20 }}
      >
        Enter the text below to summarise large text into key points
      </Typography>

      <Box 
      align='center' 
      className='text-box'
      style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }}
      >
        <TextField
          className='text-field'
          placeholder='Enter your text to summarise here'
          multiline
          rows={10}
          id="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </Box>
      <Box 
      align='center'
      >
        <Button
          type='button'
          variant='contained'
          onClick={handleSummarize}
        >
          Summarize
        </Button>
      </Box>

      <Box 
      align='center' 
      className='text-box'
      style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }}
      >
        <TextField
          className='text-field'
          placeholder='Summarized text'
          multiline
          rows={10}
          value={summary}
          readOnly
        />
      </Box>
    </div>
  )
}

export default TextSummarizer;
