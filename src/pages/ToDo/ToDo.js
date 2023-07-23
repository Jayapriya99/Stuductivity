import * as React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { collection, onSnapshot, deleteDoc, doc} from 'firebase/firestore';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { format } from 'date-fns';
import { 
  Box,
  Typography,
  Button,
}from '@mui/material';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';

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
    const {id} = useParams();
    const [todoData, setTodoData] = useState([]);

    const getDateInWords = (dateString) => {
      const date = new Date(dateString);
      return format(date, 'd MMMM yyyy');
    };
    
    useEffect(() => {
      onSnapshot(todoCollection, (response) => {
        setTodoData(response.docs.map((doc) => {
          return {...doc.data(), id: doc.id}
        }))
      })
    }, [])


    const TodoDelete = async (id) => {
      let deleteTodo = doc(todoCollection, id)
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
      sx={{
        backgroundColor: '#4F709C',
        color: 'white' // Added font color
      }}
      variant="contained" 
      endIcon={<AddCircleOutlineIcon />}
      onClick={() => navigate('/AddTodo')}
      size='large'>
          Add Todo
      </Button>
      </Box>
      <ToastContainer/>

      
    
      <div className='grid-3'>
        {todoData.map((doc) => {
          return (
            <Box className='grid-2-todo' 
            sx={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr auto auto',
              gridGap: 2,
              alignItems: 'center',
              padding: 2,
              border: '1px solid #ccc',
              borderRadius: '5px',
              '& button': {
                marginLeft: 1,
                marginRight: 1,
              },
            }}
            >
              <Typography sx={{ display: 'flex', alignItems: 'center', whiteSpace: 'nowrap', fontWeight: 'bold' }}>
                {doc.title}
              </Typography>
              <Typography sx={{ display: 'flex', alignItems: 'center', whiteSpace: 'nowrap',  fontWeight: 'bold'  }}>
                {getDateInWords(doc.date)}
              </Typography>
              <Typography sx={{paddingLeft:5, paddingTop:2, paddingBottom:2, paddingRight: 20,  fontWeight: 'bold'  }}>
                {doc.time}
              </Typography>
              <ModeEditIcon
              variant='filled'
              color="primary"
              // startIcon={<ModeEditIcon />}
              style={{cmarginRight: 20, paddingRight: 30}}
              onClick={() => navigate(`/EditTodo/${doc.id}`)}
              >
              </ModeEditIcon>
              <DeleteIcon
              variant='filled'
              color="warning"
              onClick={() => TodoDelete(doc.id)}
              style={{marginLeft: 20, paddingRight: 10}}
              >
              DELETE
              </DeleteIcon>

            </Box>
          )
        })}

        
     
      </div>

      <Box
      position="fixed"
      style={{ transform: 'translate(-15px, -20px)' }}
      bottom={20}
      left={15}
      >
      <Link to="/Home" style={{ textDecoration: 'none', color: '#2E4C6D' }}>
        <HomeIcon fontSize="large" />
      </Link>
      </Box>

    </div>
    
  )
}
