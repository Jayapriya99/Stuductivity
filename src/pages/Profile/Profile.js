import * as React from "react";
import { useEffect, useState } from "react";
import { Box, TextField, Button, Card, CardContent, Typography } from "@mui/material";
import { signOut } from "../../utils/auth";
import { getUserData, updateUser } from "../../utils/manage-users";
import { auth } from "../../firebase-config";
import LogoutIcon from '@mui/icons-material/Logout';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
const styleCenter = {
  display: "flex",
  justifyContent: "space-evenly",
  alignItems: "center",
  p: 1,
};

const styleSignOut = {
  position: "fixed",
  bottom: 0,
  left: 10,
  width: "100%",
  display: "flex",
  justifyContent: "flex-end",
  paddingBottom: 8,
};

export default function Profile() {
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    institue: "",
    userId: "",
  });

  const handleSignOut = () => {
    signOut();
  };

  const handleUpdateProfile = () => {
    updateUser(profileData)
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    const currentUser = auth.currentUser;

    getUserData(currentUser.uid).then((user) => {
      setProfileData({
        email: user?.email,
        name: user?.name,
        institue: user?.institue || "",
        userId: currentUser.uid,
      });
    });
  }, []);
  // let userEmail = localStorage.getItem('loginEmail');

  return (
    <div>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Card
          display="flex"
          // sx={{ maxWidth: 500 }}
          style={{
            minHeight: 300,
            width: 850,
            backgroundColor: '#f0c6b9',
            border: '5px solid #f0c6b9', 
            borderColor: '#f0c6b9', 
            borderRadius: '20px',
            marginTop: '40px',
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
          }}
          direction="column"
        >
          <CardContent sx={{ maxWidth: 800 }} alignItems="center">
          <Typography className="title-profile" textAlign="center" variant="h4">
              PROFILE
            </Typography>
        <TextField
          label="User Email"
          className="add-input"
          onChange={(event) =>
            setProfileData((prev) => ({ ...prev, email: event.target.value }))
          }
          value={profileData.email}
          style={{ margin: 20, width: "750px" }}
        ></TextField>
        <TextField
          label="Name"
          placeholder="Name"
          className="add-input"
          onChange={(event) =>
            setProfileData((prev) => ({ ...prev, name: event.target.value }))
          }
          value={profileData.name}
          style={{ margin: 20, width: "750px" }}
        ></TextField>
        <TextField
          label="Institute"
          placeholder="Add the Institute"
          className="add-input"
          onChange={(event) =>
            setProfileData((prev) => ({
              ...prev,
              institue: event.target.value,
            }))
          }
          value={profileData.institue}
          style={{ margin: 20, width: "750px" }}
        ></TextField>
        <Box sx={styleCenter}>
        <Button
          style={{ width: 250, height: 50 }}
          sx={{
            backgroundColor: '#4F709C',
            color: 'white' 
          }}
          // value={id ? "Update" : "Add Todo"}
          onClick={handleUpdateProfile}
          size="large"
        >
          UPDATE PROFILE
        </Button>
      </Box>
        </CardContent>
        </Card>
      </Box>
      <Box sx={styleSignOut}>
        <Button
          style={{ width: 180, height: 50, marginRight: 40 }}
          // value={id ? "Update" : "Add Todo"}
          endIcon={<LogoutIcon />}
          sx={{
            backgroundColor: '#4F709C',
            color: 'white' 
          }}
          onClick={handleSignOut}
          size="large"
        >
          SIGN OUT
        </Button>
      </Box>

      <Box
      position="fixed"
      style={{ transform: 'translate(-15px, -20px)' }}
      bottom={20}
      left={15}
    >
      <Link to="/Home" style={{ textDecoration: 'none', color: '#2E4C6D' }}>
        <HomeIcon fontSize="large" />
      </Link>
    </Box>
      
    </div>
  );
}
