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
          style={{ minHeight: 500, width: 500 }}
          direction="column"
        >
          <CardContent sx={{ maxWidth: 500 }}>
            <Typography className="title-login" textAlign="center" variant="h4">
              LOGIN
            </Typography>
            <Grid item xs={12}>
              <TextField
                placeholder="Email Address"
                style={{ maxWidth: 400, width: "100%", padding: 30 }}
                onChange={(event) => setLoginEmail(event.target.value)}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                style={{ maxWidth: 400, width: "100%", padding: "10px 30px" }}
                placeholder="Password ( More than 6 chars )"
                onChange={(event) => setLoginPassword(event.target.value)}
                type="password"
              />
            </Grid>
            <Typography paddingX="30px" marginTop="10px" color="red">
              {error}
            </Typography>
            <Grid
              textAlign="center"
              display="flex"
              direction="column"
              alignItems="center"
              gap="20px"
              paddingY="20px"
            >
              <Button
                style={{ width: "max-content" }}
                variant="contained"
                className="login"
                onClick={handleLoginWithEmail}
              >
                Sign in
              </Button>

              <Button
                style={{ width: "max-content" }}
                variant="contained"
                className="handleLoginWithGoogle"
                onClick={handleLoginWithGoogle}
              >
                Sign in with Google
              </Button>
            </Grid>

            <Grid>
              <Box textAlign="center" style={{}}>
                <p>Do not have an account?</p>
                <Link to="/signup">Register here now! </Link>
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
