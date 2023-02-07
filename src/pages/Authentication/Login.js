import React from 'react';
import { auth, provider } from '../../firebase-config';
import { signInWithPopup, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { 
  Card, 
  Grid,
  TextField,
  FormControlLabel,
  Paper, } from '@mui/material';


function Login({ setIsAuth }) {

  let navigate = useNavigate();
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [user, setUser] = useState({});

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  })

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider).then((result) => {
      localStorage.setItem("isAuth", true);
      setIsAuth(true);
      navigate("/Notes");
    });
  };

  const loginWithEmail = async () => {
    try{
      const user = await signInWithEmailAndPassword(
        auth, 
        loginEmail, 
        loginPassword
        );
        navigate("/Notes");
        console.log(user);
      } catch (error) {
        console.log(error.message);
      }
  };

  return (
    <div className='LoginPage'>
      {/* <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justify="center">
      <Card
        container
        sx={{ maxWidth: 500 }}
        style={{ height: 500, width: 500}}
        alignItems="center"
        spacing={3}
        direction="column"
        justify="center">

          <Grid item xs={12} >
            <TextField label="Email Address" onChange={(event) => setLoginEmail(event.target.value)}></TextField>
          </Grid>

          <Grid item xs={12}>
            <TextField label="Password" type={'password'}> onChange={(event) => setLoginPassword(event.target.value)}</TextField>
          </Grid>

          <Grid>
            <button className='login' style={{margin:10}} onClick={loginWithEmail}> Sign in </button>
          </Grid>
          
          <Grid>
            <button className='loginWithGoogle' onClick={signInWithGoogle} style={{margin:10}}> Sign in with Google </button>
          </Grid>
      </Card>
      </Grid> */}

      <input placeholder='Email Address' onChange={(event) => setLoginEmail(event.target.value)}/>
      <input placeholder='Password' onChange={(event) => setLoginPassword(event.target.value)}/>

      <button onClick={loginWithEmail}> Login </button>
    </div>
  )
}

export default Login