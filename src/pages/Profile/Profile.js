import * as React from "react";
import { useEffect, useState } from "react";
import { Box, TextField, Button } from "@mui/material";
import { signOut } from "../../utils/auth";
import { getUserData, updateUser } from "../../utils/manage-users";
import { auth } from "../../firebase-config";

const styleCenter = {
  display: "flex",
  justifyContent: "space-evenly",
  alignItems: "center",
  p: 1,
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
        <TextField
          label="User Email"
          className="add-input"
          onChange={(event) =>
            setProfileData((prev) => ({ ...prev, email: event.target.value }))
          }
          value={profileData.email}
          style={{ margin: 30, width: "800px" }}
        ></TextField>
        <TextField
          placeholder="Name"
          className="add-input"
          onChange={(event) =>
            setProfileData((prev) => ({ ...prev, name: event.target.value }))
          }
          value={profileData.name}
          style={{ marginBottom: 10, width: "800px" }}
        ></TextField>
        <TextField
          placeholder="Add the Institute"
          className="add-input"
          onChange={(event) =>
            setProfileData((prev) => ({
              ...prev,
              institue: event.target.value,
            }))
          }
          value={profileData.institue}
          style={{ marginTop: 20, width: "800px" }}
        ></TextField>
      </Box>
      <Box sx={styleCenter}>
        <Button
          style={{ width: 250, height: 50 }}
          // value={id ? "Update" : "Add Todo"}
          onClick={handleUpdateProfile}
          size="large"
        >
          UPDATE PROFILE
        </Button>

        <Button
          style={{ width: 250, height: 50 }}
          // value={id ? "Update" : "Add Todo"}
          onClick={handleSignOut}
          size="large"
        >
          SIGN OUT
        </Button>
      </Box>
    </div>
  );
}
