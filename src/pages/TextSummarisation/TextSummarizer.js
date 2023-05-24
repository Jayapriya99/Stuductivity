import { Button, TextField, Box } from '@material-ui/core'
import { Typography } from '@mui/material'
import { useState } from "react";
import React from 'react'

function TextSummarizer() {


  
  return (
    <div>
        <Typography
        className='text-sum'
        variant='h4'
        align='center'>
            Text Summarisation
        </Typography>
        <Typography
        className='text-sum-words'
        align='center'
        >
            Enter the text below to summarise large text into key points
        </Typography>

        <Box align='center' className='text-box'>
        <TextField
          className='text-field'
          placeholder='Enter your text to summarise here'
          multiline
          rows={10}
        />
      </Box>
      <Box align='center' >
      <Button type='button'>Summarize</Button>
      </Box>

        <Box align='center' className='text-box'>
        <TextField
          className='text-field'
          placeholder='Summarized text'
          multiline
          rows={10}
        />
      </Box>
    </div>

  )
}

export default TextSummarizer