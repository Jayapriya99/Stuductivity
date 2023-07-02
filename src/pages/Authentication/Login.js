import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { createTheme } from "@mui/system";
import {
  Card,
  Grid,
  Typography,
  TextField,
  CardContent,
  Button,
  Box,
} from "@mui/material";
import { signInWithEmail, signInWithGoogle } from "../../utils/auth";
import { createNewUser } from "../../utils/manage-users";

function Login() {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [error, setError] = useState();

  const onSuccessLogin = async (user) => {
    await createNewUser(user);
  };

  const handleLoginWithEmail = () => {
    signInWithEmail(loginEmail, loginPassword)
      .then((response) => onSuccessLogin(response.user))
      .catch((error) => setError("Invalid Email or Password"));
  };

  const handleLoginWithGoogle = () => {
    signInWithGoogle()
      .then((response) => onSuccessLogin(response.user))
      .catch((error) => setError("Invalid Email or Password"));
  };

  useEffect(() => {
    setError("");
  }, [loginEmail, loginPassword]);

  const theme = createTheme({
    palette: {
      secondary: {
        main: "#C4A69B",
      },
    },
  });

  return (
    <div className="LoginPage auth-page">
      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ paddingTop: 100 }}
      >
        {/* <ThemeProvider theme={theme}> */}
        <Card
          display="flex"
          sx={{ maxWidth: 500 }}
          style={{
            minHeight: 550,
            width: 500,
            backgroundColor: '#2E4C6D',
            border: '5px solid #2E4C6D', 
            borderColor: '#2E4C6D', 
            borderRadius: '20px',
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
          }}
          direction="column"
        >
          <CardContent sx={{ maxWidth: 500 }} alignItems="center">
            <Typography className="title-login" textAlign="center" variant="h3">
              LOGIN
            </Typography>
            <Grid item xs={12}>
              <TextField
                placeholder="Email Address"
                style={{
                  maxWidth: 400,
                  width: "100%",
                  backgroundColor: '#eeeeee',
                  margin: 30
                }}
                onChange={(event) => setLoginEmail(event.target.value)}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                style={{
                  maxWidth: 400,
                  width: "100%",
                  backgroundColor: '#eeeeee',
                  marginLeft: 30, 
                  marginRight: 30,
                  marginBottom: 10,
                  marginTop: 10
                }}
                placeholder="Password ( More than 6 chars )"
                variant="filled"
                onChange={(event) => setLoginPassword(event.target.value)}
                type="password"
              />
            </Grid>

            {/* <Grid textAlign="right" >
              <Link style={{ 
                  color: '#FF6666', 
                  fontStyle: 'italic', 
                  textDecoration: 'underline',
                  }} 
                  to="/ForgetPassword">
                      Forgot your password?
                </Link>
            </Grid>
             */}
            <Typography paddingX="30px" marginTop="10px" color="red">
              {error}
            </Typography>
            <Grid
              textAlign="center"
              display="flex"
              direction="column"
              alignItems="center"
              gap="20px"
              paddingY="10px"
            >
              <Button
                style={{ width: 400, marginTop: 20 }}
                sx={{
                  backgroundColor: '#FC997C',
                  color: '#000000'
                }}
                variant="contained"
                className="login"
                onClick={handleLoginWithEmail}
              >
                Sign in
              </Button>

              <Button
                style={{ width: 400}}
                sx={{
                  backgroundColor: '#FC997C',
                  color: '#000000'
                }}
                variant="contained"
                className="handleLoginWithGoogle"
                onClick={handleLoginWithGoogle}
              >
                Sign in with Google
              </Button>
            </Grid>

            <Grid>
              <Box textAlign="center" style={{ color: '#eeeeee', paddingTop: 50}}>
                <Typography>Do not have an account?</Typography>
                <Link style={{ color: '#FF6666', fontStyle: 'italic', textDecoration: 'underline' }} to="/signup">
                  Register here now!
                </Link>
              </Box>
            </Grid>
          </CardContent>
        </Card>
        {/* </ThemeProvider> */}
      </Grid>

      {/* 
      <Input placeholder='Email Address' onChange={(event) => setLoginEmail(event.target.value)}/>
      <Input placeholder='Password' onChange={(event) => setLoginPassword(event.target.value)}/> */}

      {/* <button onClick={handleLoginWithEmail}> Login </button> */}
    </div>
  );
}

export default Login;
