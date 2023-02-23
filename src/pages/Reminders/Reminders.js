import React from 'react'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { 
  Card, 
  IconButton,
  Box,
  Typography,
  Modal, 
  TextField,
  Button,
  Grid}from '@mui/material';

function Reminders() {
  return (
    <div>
      <IconButton>
      <CheckCircleIcon style={{paddingTop: 100, paddingLeft:150}} fontSize='large' />
      </IconButton>
        <Card style={{height:100, width:900, marginLeft:250}}>
          <TextField style={{paddingLeft:30 ,paddingRight:10, width:270, paddingTop:20}} variant='outlined'/>
          <TextField style={{paddingRight:10, width:270, paddingTop:20}} variant='outlined'/>
          <TextField style={{width:270, paddingTop:20}} variant='outlined'/>
        </Card>
    </div>
  )
}

export default Reminders