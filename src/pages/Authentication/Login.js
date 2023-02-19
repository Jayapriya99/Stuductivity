import React from 'react';
import { auth, provider } from '../../firebase-config';
import { signInWithPopup, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { createTheme } from '@mui/system';
import { 
  Card, 
  Grid,
  Input,
  FormControlLabel,
  Paper,
  ThemeProvider,
  TextField,
  CardContent, } from '@mui/material';


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

  const theme = createTheme({
    palette: {
      secondary: {
        main: '#C4A69B'
      }
    }
  })

  return (
    
    <div className='LoginPage'>
      <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="center">
      {/* <ThemeProvider theme={theme}> */}
      <Card
        display="flex" 
        sx={{ maxWidth: 500 }}
        style={{ height: 500, width: 500}}
        alignItems="center"
        direction="column"
        justifyContent="center">
          <CardContent
          justifyContent="center"
          alignItems="center"
          sx={{ maxWidth: 500 }}
          style={{ height: 500, width: 500}}
          >
          <Grid item xs={12} >
            <TextField 
            placeholder='Email Address' 
            style={{ width: 200}}
            onChange={(event) => setLoginEmail(event.target.value)}
             />
          </Grid>

          <Grid item xs={12}>
            <TextField placeholder='Password' onChange={(event) => setLoginPassword(event.target.value)}/>
          </Grid>

          <Grid>
            <button className='login' style={{margin:10}} onClick={loginWithEmail}> Sign in </button>
          </Grid>
          
          <Grid>
            <button className='loginWithGoogle' onClick={signInWithGoogle} style={{margin:10}}> Sign in with Google </button>
          </Grid>
          </CardContent>
      </Card>
      {/* </ThemeProvider> */}

      </Grid>
{/* 
      <Input placeholder='Email Address' onChange={(event) => setLoginEmail(event.target.value)}/>
      <Input placeholder='Password' onChange={(event) => setLoginPassword(event.target.value)}/> */}

      {/* <button onClick={loginWithEmail}> Login </button> */}
    </div>
  )
}

export default Login