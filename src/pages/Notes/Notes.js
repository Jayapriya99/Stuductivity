import * as React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import EditNotes from './EditNotes';
import { database } from '../../firebase-config';
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

export default function Notes(
    {database}
) {

    let databaseCollection = collection(database, 'notes-data');
    let userEmail = localStorage.getItem('loginEmail');
    let navigate = useNavigate();

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [title, setTitle] = useState('');
    const [notesData, setNotesData] = useState([]);

    const addNotes = () => {
        addDoc(databaseCollection, {
        title: title,
        author: userEmail,
        body: '',

    })
    .then((response) => {
        toast.success('Notes added', {
          autoClose: 1000
        })
        setTitle('');
        setOpen(false);
    })
    .catch(() => {
        toast.error('Notes cannot be added', {
          autoClose: 1000
        })
    })

    }

    const openEditNotes = (id) => {
      navigate(`/EditNotes/${id}`)
    }

    useEffect(() => {
      onSnapshot(databaseCollection, (response) => {
        setNotesData(response.docs.map((doc) => {
          return {...doc.data(), id: doc.id}
        }))
      })
    }, [])


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
            Add a new subject
          </Typography>
          <Box>
            <Card>
              <TextField
              placeholder='Add the Title'
              className='add-input'
              onChange={(event) => setTitle(event.target.value)}
              value={title}>
                
              </TextField>
              {/* <TextField 
              variant="outlined" 
              multiline rows={10} 
              style={{width: 400}}
              // value={body}
              /> */}
              <Button 
              onClick={addNotes}
              variant='contained'
              > ADD </Button>
            </Card>
          </Box>
        </Box>
      </Modal>
      <ToastContainer/>
    
      <div className='grid-1'>
        {notesData.map((doc) => {
          return (
            <div className='grid-2' onClick={() => openEditNotes(doc.id)}>
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
