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
  const [signUpName, setSignUpName] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");

  const signUp = async () => {
    try{
      const user = await createUserWithEmailAndPassword(
        auth, 
        signUpEmail, 
        signUpPassword
      );
      await auth.currentUser.updateProfile({ displayName: signUpName });
      navigate("/Login");
      console.log(user);
    } catch (error) {
      console.log(error.message);
    }
  }

  const GoToLogin = async() => {
    navigate("/Login");
  }

  return (
    <div className='SignUpPage'>
      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ paddingTop:70}}
      >
        
        <Card
          display="flex" 
          sx={{ maxWidth: 500 }}
          style={{ height: 600, width: 500}}
          alignItems="center"
          direction="column"
          justifyContent="center">
          <CardContent
            justifyContent="center"
            alignItems="center"
            sx={{ maxWidth: 500 }}
            style={{ height: 500, width: 500}}
          >
            <Typography className='title-login' style={{paddingLeft:170}} variant="h4">  SIGN UP  </Typography>
            <Grid item xs={12} >
              <TextField 
                placeholder='Name' 
                style={{width:400, padding:30}}
                onChange={(event) => setSignUpName(event.target.value)}
              />
            </Grid>
            <Grid item xs={12} >
              <TextField 
                placeholder='Email Address' 
                style={{width:400, padding:30}}
                onChange={(event) => setSignUpEmail(event.target.value)}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField 
                style={{width:400, paddingLeft:30, paddingRight:30, paddingTop:10, paddingBottom:10}} 
                placeholder='Password' 
                type="password"
                onChange={(event) => setSignUpPassword(event.target.value)}
              />
            </Grid>

            <Grid>
              <Button style={{marginLeft:170, marginBottom:20, marginTop:20}} variant="contained" className='login' onClick={signUp}> Register </Button>
            </Grid>
          
            <Grid>
              <Typography 
                style={{width:400, paddingLeft:130, paddingRight:30, paddingTop:10, paddingBottom:10}}
              > Already have an account?
                <Link onClick={GoToLogin}>
                  <Typography 
                    style={{width:400, paddingLeft:50, paddingRight:30, paddingTop:10, paddingBottom:10}}
                    navigate={'/Login'}> Login here </Typography>
                </Link>
              </Typography>
            </Grid>

          </CardContent>
        </Card>

      </Grid>
      
    </div>
  
  )
}

export default SignUp
