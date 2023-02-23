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
  Typography,
  Link,
  ThemeProvider,
  TextField,
  CardContent,
  Button, } from '@mui/material';


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

  const GoToSignUp = async() => {
    navigate("/SignUp");
  }

  return (
    
    <div className='LoginPage'>
      <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ paddingTop:100}}
      >
        
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
          <Typography style={{paddingLeft:170}} variant="h4">  LOGIN </Typography>
          <Grid item xs={12} >
            <TextField 
            placeholder='Email Address' 
            style={{width:400, padding:30}}
            onChange={(event) => setLoginEmail(event.target.value)}
             />
          </Grid>

          <Grid item xs={12}>
            <TextField style={{width:400, paddingLeft:30, paddingRight:30, paddingTop:10, paddingBottom:10}} placeholder='Password' onChange={(event) => setLoginPassword(event.target.value)}/>
          </Grid>

          <Grid>
            <Button style={{marginLeft:170, marginBottom:20, marginTop:20}} variant="contained" className='login' onClick={loginWithEmail}> Sign in </Button>
          </Grid>
          
          <Grid>
            <Button style={{marginLeft:120, marginBottom:20}}  variant="contained" className='loginWithGoogle' onClick={signInWithGoogle} > Sign in with Google </Button>
          </Grid>

          <Grid>
            <Typography 
            style={{width:400, paddingLeft:130, paddingRight:30, paddingTop:10, paddingBottom:10}}
            > Do not have an account?
            <Link onClick={GoToSignUp}>
            <Typography navigate={'/SignUp'}> Register here now! </Typography>
            </Link>
            </Typography>
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