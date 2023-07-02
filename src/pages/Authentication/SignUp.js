import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Card,
  Grid,
  Box,
  Typography,
  ThemeProvider,
  TextField,
  CardContent,
  Button,
} from "@mui/material";
import { signUpWithEmail } from "../../utils/auth";
import { createNewUser } from "../../utils/manage-users";

function SignUp() {
  let navigate = useNavigate();
  const [signUpName, setSignUpName] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [error, setError] = useState();

  const onSuccessSignUp = async (user) => {
    await createNewUser(user);
  };

  const handleSignUpWithEmail = () => {
    signUpWithEmail(signUpEmail, signUpPassword, signUpName)
      .then((response) => onSuccessSignUp(response.user, response))
      .catch((error) => {
        console.log(error);
        setError("Invalid Email or Password");
      });
  };

  useEffect(() => {
    setError("");
  }, [signUpEmail, signUpName, signUpPassword]);

  return (
    <div className="SignUpPage auth-page">
      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ paddingTop: 70 }}
      >
        <Card
          display="flex"
          sx={{ maxWidth: 500 }}
          style={{
            minHeight: 600,
            width: 500,
            backgroundColor: '#2E4C6D',
            border: '5px solid #2E4C6D', 
            borderColor: '#2E4C6D', 
            borderRadius: '20px',
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
          }}
          alignItems="center"
          direction="column"
          justifyContent="center"
        >
          <CardContent
            justifyContent="center"
            alignItems="center"
            sx={{ maxWidth: 500 }}
            style={{ height: 500, width: 500 }}
          >
            <Typography
              className="title-login"
              textAlign="center"
              variant="h3"
            >
              SIGN UP{" "}
            </Typography>
            <Grid item xs={12}>
              <TextField
                placeholder="Name"
                style={{
                  maxWidth: 400,
                  width: "100%",
                  backgroundColor: '#eeeeee',
                  margin: 30
                }}
                onChange={(event) => setSignUpName(event.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                placeholder="Email Address"
                style={{
                  maxWidth: 400,
                  width: "100%",
                  backgroundColor: '#eeeeee',
                  marginLeft: 30, 
                  marginRight: 30,
                  marginBottom: 10,
                  marginTop: 10
                }}
                onChange={(event) => setSignUpEmail(event.target.value)}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                style={{
                  maxWidth: 400,
                  width: "100%",
                  backgroundColor: '#eeeeee',
                  margin: 30
                }}
                placeholder="Password ( More than 6 chars )"
                type="password"
                onChange={(event) => setSignUpPassword(event.target.value)}
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
              paddingRight={5}
              >
              <Button
                style={{ width: 400, marginTop: 20 }}
                sx={{
                  backgroundColor: '#FC997C',
                  color: '#000000'
                }}
                variant="contained"
                className="login"
                onClick={handleSignUpWithEmail}
              >
                Register{" "}
              </Button>
            </Grid>

            <Grid>
            <Box textAlign="center" style={{ color: '#eeeeee', paddingTop: 60 }}>
              <Typography style={{ color: '#eeeeee' }} textAlign="center">
                Already have an account?
                <Link to="/login">
                  <Typography
                    textAlign="center"
                    style={{ color: '#FF6666', fontStyle: 'italic', textDecoration: 'underline', width: 100, paddingLeft: 180 }}
                  >
                    Login here
                  </Typography>
                </Link>
              </Typography>
            </Box>

            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </div>
  );
}

export default SignUp;
