import * as React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { collection, addDoc, onSnapshot, updateDoc, deleteDoc, doc} from 'firebase/firestore';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { 
  Card, 
  Box,
  Typography,
  Modal, 
  TextField,
  Grid,
  Button}from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import SearchIcon from '@mui/icons-material/Search';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  height: 200,
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

export default function ToDo(
    {database}
) {

    let todoCollection = collection(database, 'todo-data');
    let userEmail = localStorage.getItem('loginEmail');
    let navigate = useNavigate();
    let params = useParams();
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [todoData, setTodoData] = useState([]);
    const [updateTodo, setUpdateTodo] = useState([]);
    const [openEdit, setOpenEdit] = React.useState(false);
    const handleEditOpen = () => setOpenEdit(true);
    const handleEditClose = () => setOpenEdit(false);
    const [search, setSearch] = useState("");

    const addTodo = () => {
        addDoc(todoCollection, {
        title: title, date,
        author: userEmail,

    })
    .then((response) => {
        toast.success('Todo added', {
          autoClose: 1000
        })
        setTitle('');
        setDate('');
        setOpen(false);
    })
    .catch(() => {
        toast.error('Todo cannot be added', {
          autoClose: 1000
        })
    })

    }


    const EditTodo = (id) => {
      const TodoUpdate = doc(todoCollection, params.id);

      updateDoc(TodoUpdate, {
        title: title, date
      })
        .then(() => {
          toast.success('Todo updated', {
            autoClose:1000,
          })
          setOpenEdit(false);
        })
        .catch(() => {
          toast.error('Cannot update Todo', {
              autoClose:1000
          })
      })
      }
    

    const openEditTodo = (id) => {
      setOpenEdit(`${id}`)
    }

    const TodoDelete = () => {
      let deleteTodo = doc(todoCollection, (response) => {})
      deleteDoc(deleteTodo)
      .then((response) => {
          alert('Todo deleted', {
          autoClose: 1000
          })
      })
      .catch(() => {
          alert('Todo cannot be deleted', {
          autoClose: 1000
          })
      })
  }

    useEffect(() => {
      onSnapshot(todoCollection, (response) => {
        setTodoData(response.docs.map((doc) => {
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
      style={{width:200, height:50}}
      variant="contained" 
      endIcon={<AddCircleOutlineIcon />}
      onClick={handleOpen}
      size='large'>
          Add Todo
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
          variant="h6" 
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
              <TextField
              placeholder='Add the Date'
              type="date"
              className='add-input'
              onChange={(event) => setDate(event.target.value)}
              value={date}
              format="LL"
              >
              </TextField>  
              <Button 
              className='btn-add'
              onClick={addTodo}
              variant='contained'
              > ADD </Button>
            </Card>
          </Box>
        </Box>
      </Modal>
      <ToastContainer/>

      
    
      <div className='grid-3'>
        {todoData.map((doc) => {
          return (
            <div className='grid-2' 
            // onClick={() => openEditNotes(doc.id)}
            >
              <h3>
                {doc.title}
              </h3>
              <h3>
                {doc.date}
              </h3>
              <Button
              onClick={handleEditOpen}
              >
              EDIT
              </Button>
              <Button
              onClick={TodoDelete}
              >
              DELETE
              </Button>
              
            </div>
          )
        })}
     
      </div>

    </div>
    
  )
}
