import { createUserWithEmailAndPassword } from 'firebase/auth';
import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Login from './Login';
import { auth } from '../../firebase-config';
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
          <Typography style={{paddingLeft:170}} variant="h4">  SIGN UP  </Typography>
          <Grid item xs={12} >
            <TextField 
            placeholder='Email Address' 
            style={{width:400, padding:30}}
            onChange={(event) => setSignUpEmail(event.target.value)}
             />
          </Grid>

          <Grid item xs={12}>
            <TextField style={{width:400, paddingLeft:30, paddingRight:30, paddingTop:10, paddingBottom:10}} placeholder='Password' onChange={(event) => setSignUpPassword(event.target.value)}/>
          </Grid>

          <Grid>
            <Button style={{marginLeft:170, marginBottom:20, marginTop:20}} variant="contained" className='login' onClick={signUp}> Register </Button>
          </Grid>
          

          {/* <Grid>
            <Typography 
            style={{width:400, paddingLeft:130, paddingRight:30, paddingTop:10, paddingBottom:10}}
            > Do not have an account?
            <Typography navigate={'/SignUp'}> Register here now! </Typography>
            </Typography>
          </Grid> */}
          </CardContent>
      </Card>
      {/* </ThemeProvider> */}

      </Grid>
      
      
      
      
      {/* <input placeholder='Email Address' onChange={(event) => setSignUpEmail(event.target.value)}/>
      <input placeholder='Password' onChange={(event) => setSignUpPassword(event.target.value)}/>

      <button onClick={signUp}> Sign Up </button> */}
    </div>
  
  )
}

export default SignUp