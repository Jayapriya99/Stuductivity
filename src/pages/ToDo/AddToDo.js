import * as React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { collection, addDoc, onSnapshot} from 'firebase/firestore';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { 
    Box,
    TextField,
    Button}from '@mui/material';
  import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
  import SearchIcon from '@mui/icons-material/Search';

  const styleCenter = {
    top: '50%',
    right: '50%',
    left: '50%',
    transform: 'translate(42%, 50%)',
    p: 1
  }


export default function AddToDo(
    {database}
) {

    /* Create database collection */
    let todoCollection = collection(database, 'todo-data');
    let userEmail = localStorage.getItem('loginEmail');

    let navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const {id} = useParams();
    const [todoData, setTodoData] = useState([]);

    /* Add Todo */
    const addTodo = () => {

        const now = new Date();
        const selectedDateTime = new Date(`${date}T${time}`);
        
        if (selectedDateTime <= now) {
          alert('Please select a valid date and time', {
            autoClose: 2000
          })
          return;
        }

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

    /* Display Todo Data */
    useEffect(() => {
        onSnapshot(todoCollection, (response) => {
          setTodoData(response.docs.map((doc) => {
            return {...doc.data(), id: doc.id}
          }))
        })
      }, [id])


  return (
    <div>
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
      variant="contained" 
      value={id ? "Update" : "Add Todo"}
      endIcon={<AddCircleOutlineIcon />}
      onClick={addTodo}
      size='large'>
          ADD TODO
      </Button>
      </Box>
    </div>
  )
}

