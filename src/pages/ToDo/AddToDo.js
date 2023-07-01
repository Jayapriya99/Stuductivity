import * as React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { collection, addDoc, onSnapshot, updateDoc, deleteDoc, doc, getDoc} from 'firebase/firestore';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { 
    Card, 
    Box,
    CardContent,
    Modal, 
    TextField,
    Table,
    Button}from '@mui/material';
  import { LocalizationProvider } from '@mui/x-date-pickers';
  import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
  import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
  import SearchIcon from '@mui/icons-material/Search';

  const styleCenter = {
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    p: 1,
    marginTop: 5
  }


export default function AddToDo(
    {database}
) {

    let todoCollection = collection(database, 'todo-data');
    let userEmail = localStorage.getItem('loginEmail');
    let navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const {id} = useParams();
    const [todoData, setTodoData] = useState([]);

    const addTodo = () => {
        addDoc(todoCollection, {
        title: title, 
        author: userEmail,
        date: date,
        time: time,

    })
    .then((response) => {
        toast.success('Todo added', {
          autoClose: 1000
        })
        setTitle('');
        setDate('');
        setTime('');
        navigate('/Todo')
    })
    .catch(() => {
        toast.error('Todo cannot be added', {
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
      }, [id])

      const openEditTodo = (id) => {
        navigate(`/EditTodo/${id}`)
      }


  return (
    <div>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Card
          display="flex"
          // sx={{ maxWidth: 500 }}
          style={{
            minHeight: 420,
            width: 850,
            backgroundColor: '#f0c6b9',
            border: '5px solid #f0c6b9', 
            borderColor: '#f0c6b9', 
            borderRadius: '20px',
            marginTop: '40px',
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
          }}
          direction="column"
        >
          <CardContent sx={{ maxWidth: 800 }} alignItems="center"></CardContent>
    <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <TextField
              label='Add the Todo Title'
              className='add-input'
              onChange={(event) => setTitle(event.target.value)}
              value={title}
              style={{ margin: 30, width: '800px' }}>
              </TextField>
              <TextField
              placeholder='Add the Date'
              type="date"
              className='add-input'
              onChange={(event) => setDate(event.target.value)}
              value={date}
              style={{marginBottom: 10, width: '800px' }}
              >
              </TextField>  
              <TextField
              placeholder='Add the Time'
              type="time"
              className='add-input'
              onChange={(event) => setTime(event.target.value)}
              value={time}
              style={{marginTop: 20, width: '800px' }}
              >
              </TextField> 
      </Box>
      <Box sx={styleCenter}
      >
      <Button 
      style={{width:200, height:50}}
      sx={{
        backgroundColor: '#4F709C',
        color: 'white' 
      }}
      variant="contained" 
      value={id ? "Update" : "Add Todo"}
      endIcon={<AddCircleOutlineIcon />}
      onClick={addTodo}
      size='large'>
          ADD TODO
      </Button>
      </Box>

    </Card>
    </Box>
    </div>
  )
}

