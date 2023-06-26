import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Card,
  Grid,
  Input,
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
          style={{ height: 600, width: 500 }}
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
              style={{ paddingLeft: 170 }}
              variant="h4"
            >
              SIGN UP{" "}
            </Typography>
            <Grid item xs={12}>
              <TextField
                placeholder="Name"
                style={{ width: 400, padding: 30 }}
                onChange={(event) => setSignUpName(event.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                placeholder="Email Address"
                style={{ width: 400, padding: 30 }}
                onChange={(event) => setSignUpEmail(event.target.value)}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                style={{
                  width: 400,
                  paddingLeft: 30,
                  paddingRight: 30,
                  paddingTop: 10,
                  paddingBottom: 10,
                }}
                placeholder="Password ( More than 6 chars )"
                type="password"
                onChange={(event) => setSignUpPassword(event.target.value)}
              />
            </Grid>
            <Typography paddingX="30px" marginTop="10px" color="red">
              {error}
            </Typography>
            <Grid>
              <Button
                style={{ marginLeft: 170, marginBottom: 20, marginTop: 20 }}
                variant="contained"
                className="login"
                onClick={handleSignUpWithEmail}
              >
                Register{" "}
              </Button>
            </Grid>

            <Grid>
              <Typography
                style={{
                  width: 400,
                  paddingLeft: 130,
                  paddingRight: 30,
                  paddingTop: 10,
                  paddingBottom: 10,
                }}
              >
                Already have an account?
                <Link to="/login">
                  <Typography
                    style={{
                      width: 400,
                      paddingLeft: 50,
                      paddingRight: 30,
                      paddingTop: 10,
                      paddingBottom: 10,
                    }}
                  >
                    Login here
                  </Typography>
                </Link>
              </Typography>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </div>
  );
}

export default SignUp;
