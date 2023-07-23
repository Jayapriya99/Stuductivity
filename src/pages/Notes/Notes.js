import * as React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc, onSnapshot} from 'firebase/firestore';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { 
  Card, 
  Box,
  Typography,
  Modal, 
  TextField,
  Button}from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  height: 150,
  bgcolor: '#FC997C',
  border: 'solid #FC997C',
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
    const [search, setSearch] = useState("");

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

    // const searchNotes = (e) => {
    //   e.preventDefault();
    //   setNotesData(doc.filter((doc) => 
    //     doc.title.toLowerCase().includes(search.toLowerCase())
    //   ))
    // }
    

  return (
    <div>
      <Box sx={styleCenter}
      >
      <Button
        style={{ width: 200, height: 50 }}
        sx={{
          backgroundColor: '#4F709C',
          color: 'white'
        }}
        endIcon={<AddCircleOutlineIcon />}
        onClick={handleOpen}
        size='large'
      >
        Add Notes
      </Button>
      </Box>
      {/* <form>
        <TextField
        onChange={(e) => {setSearch(e.target.value)}}>
            Search for notes...
        </TextField>
        <Button 
        endIcon={<SearchIcon />}
        size='extra-large'
        type='submit'
        > 
        </Button>
      </form> */}

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography 
          className='title-add'
          id="modal-modal-title" 
          variant="h5" 
          component="h2"
          >
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
              <Button 
              className='btn-add'
              sx={{
                backgroundColor: '#4F709C',
                color: 'white'
              }}
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

      <Box
        position="fixed"
        style={{ transform: 'translate(-15px, -20px)' }}
        bottom={10}
        left={0}
      >
        <Link to="/Home" style={{ textDecoration: 'none', color: '#2E4C6D' }}>
          <HomeIcon fontSize="large" />
        </Link>
      </Box>


    </div>
    
  )
}
