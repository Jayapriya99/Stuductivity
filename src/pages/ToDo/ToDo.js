import * as React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate} from 'react-router-dom';
import { collection, onSnapshot, deleteDoc, doc} from 'firebase/firestore';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { format } from 'date-fns';
import { 
  Box,
  Typography,
  Button
}from '@mui/material';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import SearchIcon from '@mui/icons-material/Search';

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

    /* Create database collection */
    let todoCollection = collection(database, 'todo-data');
    let userEmail = localStorage.getItem('loginEmail');
    let navigate = useNavigate();
    const [todoData, setTodoData] = useState([]);

    /* Change date format to words */
    const getDateInWords = (dateString) => {
      const date = new Date(dateString);
      return format(date, 'd MMMM yyyy');
    };
    
    /* Use effect to set the Todo Data */
    useEffect(() => {
      onSnapshot(todoCollection, (response) => {
        setTodoData(response.docs.map((doc) => {
          return {...doc.data(), id: doc.id}
        }))
      })
    }, [])


    /* Delete Todo by id */
    const TodoDelete = async (id) => {
      let deleteTodo = doc(todoCollection, id)
      deleteDoc(deleteTodo)
      .then((response) => {
          toast.success('Todo deleted', {
          autoClose: 1000
          })
      })
      .catch(() => {
          toast.error('Todo cannot be deleted', {
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
            <Box className='grid-2' 
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
              <Typography sx={{ display: 'flex', alignItems: 'center', whiteSpace: 'nowrap' }}>
                {doc.title}
              </Typography>
              <Typography sx={{ display: 'flex', alignItems: 'center', whiteSpace: 'nowrap' }}>
                {getDateInWords(doc.date)}
              </Typography>
              <Typography sx={{paddingLeft:5, paddingTop:2, paddingBottom:2, paddingRight: 20 }}>
                {doc.time}
              </Typography>
              <ModeEditIcon
              variant='filled'
              color="primary"
              style={{cmarginRight: 20}}
              onClick={() => navigate(`/EditTodo/${doc.id}`)}
              >
              </ModeEditIcon>
              <DeleteIcon
              variant='filled'
              color='warning'
              onClick={() => TodoDelete(doc.id)}
              style={{marginLeft: 20, marginRight: 10}}
              >
              DELETE
              </DeleteIcon>

            </Box>
          )
        })}

     
      </div>

    </div>
    
  )
}
