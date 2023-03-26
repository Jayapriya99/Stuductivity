import * as React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc, onSnapshot} from 'firebase/firestore';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { 
  Card, 
  IconButton,
  Box,
  Typography,
  Modal, 
  TextField,
  Button}from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { DatePicker } from '@mui/x-date-pickers';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  height: 130,
  bgcolor: 'background.paper',
  border: '1px solid #000',
  boxShadow: 24,
  p: 4,
};

const styleCenter = {
  top: '50%',
  right: '50%',
  left: '50%',
  transform: 'translate(42%, 50%)',
  p: 1
}


export default function Journal({
  database
}) {
  let journalCollection = collection(database, 'journal-data');
  let userEmail = localStorage.getItem('loginEmail');
  let navigate = useNavigate();

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [title, setTitle] = useState('');
  const [journalData, setJournalData] = useState([]);

  const addJournal = () => {
    addDoc(journalCollection, {
    title: title,
    author: userEmail,
    body: '',

})
.then((response) => {
    toast.success('Journal added', {
      autoClose: 1000
    })
    setTitle('');
    setOpen(false);
})
.catch(() => {
    toast.error('Journal cannot be added', {
      autoClose: 1000
    })
})

}

const openEditJournal = (id) => {
  navigate(`/EditJournal/${id}`)
}

useEffect(() => {
  onSnapshot(journalCollection, (response) => {
    setJournalData(response.docs.map((doc) => {
      return {...doc.data(), id: doc.id}
    }))
  })
}, [])

  return (
    <div>
      <Box sx={styleCenter}
      >
      <Button 
      style={{width:200, height:50}}
      variant="contained" 
      endIcon={<AddCircleOutlineIcon />}
      onClick={handleOpen}
      size='large'>
          Add Notes
      </Button>
      </Box>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2" size='large'>
            Add a new Journal
          </Typography>
          <Box>
            <Card>
            <TextField
              placeholder='Add the Title'
              type="date"
              className='add-input'
              onChange={(event) => setTitle(event.target.value)}
              value={title}
              >
              </TextField>              
              <Button 
              className='btn-add'
              variant='contained'
              onClick={addJournal}
              > ADD </Button>
            </Card>
          </Box>
        </Box>
      </Modal>
      <ToastContainer/>


      <div className='grid-1'>
        {journalData.map((doc) => {
          return (
            <div className='grid-2' onClick={() => openEditJournal(doc.id)}>
              <h3>
                {doc.title}
              </h3>
            </div>
          )
        })}
      </div>

    </div>
  )
}

