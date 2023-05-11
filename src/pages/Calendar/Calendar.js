import React from 'react';
import moment from 'moment';
import { useState, useEffect } from 'react';
import Calendar from 'react-calendar'; 
import 'react-calendar/dist/Calendar.css'
import { collection, addDoc, onSnapshot, updateDoc, deleteDoc, doc, getDoc} from 'firebase/firestore';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import { 
  Modal, 
  Button, 
  Box,
  Typography,
  Card,
  TextField

 } from '@material-ui/core';
import '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const styleCenter = {
  top: '50%',
  right: '50%',
  left: '50%',
  transform: 'translate(42%, 50%)',
  p: 1
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  width: 300,
  height: 250,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function CalendarPage(
  {database}
) {
  const [date, setDate] = useState(new Date());
  const [title, setTitle] = useState('');
  const [time, setTime] = useState('');
  const [calendarData, setCalendarData] = useState([]);

  let calendarCollection = collection(database, 'calendar-data');
  let userEmail = localStorage.getItem('loginEmail');
  let navigate = useNavigate();

  useEffect(() => {
    onSnapshot(calendarCollection, (response) => {
      setCalendarData(response.docs.map((doc) => {
        return {...doc.data(), id: doc.id}
      }))
    })
  }, [])

  return (
    <div>

     <Calendar 
     onChange={setDate} 
     value={date}
     />

      Selected date: {date.toDateString()}

      <Box sx={styleCenter}
      >
      <Button 
      style={{width:200, height:50}}
      variant="contained" 
      endIcon={<AddCircleOutlineIcon />}
      onClick={() => navigate('/AddEvent')}      
      size='large'>
          Add Event
      </Button>
      </Box>


      {/* <div className='grid-3'>
        {calendarData.map((doc) => {
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
                {doc.date}
              </Typography>
              <Typography sx={{paddingLeft:5, paddingTop:2, paddingBottom:2, paddingRight: 20 }}>
                {doc.time}
              </Typography>
              <ModeEditIcon
              variant='filled'
              color="primary"
              // startIcon={<ModeEditIcon />}
              style={{cmarginRight: 20}}
              // onClick={() => navigate(`/EditTodo/${doc.id}`)}
              >
              </ModeEditIcon>
              <DeleteIcon
              variant='filled'
              color="warning"
              // onClick={() => TodoDelete(doc.id)}
              style={{marginLeft: 20}}
              >
              DELETE
              </DeleteIcon>

            </Box>
          )
        })}

     
      </div> */}
    </div>

   
  );
}
