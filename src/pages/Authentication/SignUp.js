import { createUserWithEmailAndPassword } from 'firebase/auth';
import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Login from './Login';
import { auth } from '../../firebase-config';
import { 
  Card, 
  Grid,
  TextField,
  FormControlLabel,
  Paper, } from '@mui/material';

function SignUp() {

  let navigate = useNavigate();
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");

  const signUp = async () => {
    try{
    const user = await createUserWithEmailAndPassword(
      auth, 
      signUpEmail, 
      signUpPassword
      );
      navigate("/Login");
      console.log(user);
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div className='SignUpPage'>
      <input placeholder='Email Address' onChange={(event) => setSignUpEmail(event.target.value)}/>
      <input placeholder='Password' onChange={(event) => setSignUpPassword(event.target.value)}/>

      <button onClick={signUp}> Sign Up </button>
    </div>
  
  )
}

export default SignUp