import * as React from 'react';
import signUserOut from '../../App';
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { auth } from '../../firebase-config';
import { useEffect, useState } from "react";
import { 
  Box, 
  TextField,
  Button}from '@mui/material';

  const styleCenter = {
    top: '50%',
    right: '0%',
    left: '0%',
    transform: 'translate(20%, 50%)',
    p: 1
  }


export default function Profile() {

  const { user, isLoggedIn } = useAuth();
  const [buttonClickedCount, setButtonClickedCount] = useState(0);
  const navigate = useNavigate();

  const signOut = () => {
    auth.signOut();
    navigate("/");
  };

  useEffect(() => {});
  // let userEmail = localStorage.getItem('loginEmail');

  return (
    <div>
    
    <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
    <TextField
            label='User Email'
            className='add-input'
            // onChange={(event) => setTitle(event.target.value)}
            // value={title}
            style={{ margin: 30, width: '800px' }}>
            </TextField>
            <TextField
            placeholder='Name'
            className='add-input'
            // onChange={(event) => setDate(event.target.value)}
            // value={date}
            style={{marginBottom: 10, width: '800px' }}
            >
            </TextField>  
            <TextField
            placeholder='Add the Institute'
            className='add-input'
            // onChange={(event) => setTime(event.target.value)}
            // value={time}
            style={{marginTop: 20, width: '800px' }}
            >
            </TextField> 
    </Box>
    <Box sx={styleCenter}
    >
    <Button 
    style={{width:250, height:50}}
    // value={id ? "Update" : "Add Todo"}
    // onClick={addTodo}
    size='large'>
        UPDATE PROFILE
    </Button>

    <Button 
    style={{width:250, height:50, marginLeft:350}}
    // value={id ? "Update" : "Add Todo"}
    onClick={signUserOut}
    size='large'>
        SIGN OUT
    </Button>
    </Box></div>
  )
}

