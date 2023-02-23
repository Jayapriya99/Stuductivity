import * as React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Card, 
  IconButton,
  Box,
  Typography,
  Modal, 
  TextField,
  Button}from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  height: 400,
  bgcolor: 'background.paper',
  border: '1px solid #000',
  boxShadow: 24,
  p: 4,
};

function Journal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <IconButton onClick={handleOpen} aria-label="AddCircleOutlineIcon" size="large" style={{color: "#C4A69B"}}>
      <AddCircleOutlineIcon fontSize='large' />
      </IconButton>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add a new Journal
          </Typography>
          <Box>
            <Card>
              <TextField variant="outlined" multiline rows={12} style={{width: 400}}/>
              <Button variant='contained'> ADD </Button>
            </Card>
          </Box>
        </Box>
      </Modal>
    </div>
  )
}

export default Journal