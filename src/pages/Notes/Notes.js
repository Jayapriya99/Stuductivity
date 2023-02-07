import * as React from 'react';
import { Button, IconButton }from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

export default function Notes() {
  return (
    <div>
      <IconButton aria-label="AddCircleOutlineIcon" size="large" style={{color: "#C4A69B"}}>
      <AddCircleOutlineIcon fontSize='large' />
      </IconButton>
    </div>
  )
}
