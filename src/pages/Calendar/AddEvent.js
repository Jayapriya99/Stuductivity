import * as React from "react";
import { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  collection,
  addDoc,
  onSnapshot,
  updateDoc,
  deleteDoc,
  doc,
  getDoc,
  query,
  where,
} from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Card,
  Box,
  Typography,
  Modal,
  TextField,
  Table,
  Button,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import SearchIcon from "@mui/icons-material/Search";
import { calendarCollection } from "./Calendar";

const styleCenter = {
  top: "50%",
  right: "50%",
  left: "50%",
  transform: "translate(42%, 50%)",
  p: 1,
};

export default function AddEvent({ database }) {
  let userEmail = localStorage.getItem("loginEmail");
  const navigate = useNavigate();
  const location = useLocation();

  const defaultDate = location?.state?.date;

  const [title, setTitle] = useState("");
  const [date, setDate] = useState(defaultDate || "");
  const [time, setTime] = useState("");
  const { id } = useParams();
  const [calendarData, setCalendarData] = useState([]);

  const validate = () => {
    return !!(title && date && time && userEmail);
  };

  const addEvent = () => {
    addDoc(calendarCollection, {
      title: title,
      author: userEmail,
      date: date,
      time: time,
    })
      .then((response) => {
        toast.success("Event added", {
          autoClose: 1000,
        });
        setTitle("");
        setDate(defaultDate);
        setTime("");
        navigate("/Calendar");
      })
      .catch(() => {
        toast.error("Event cannot be added", {
          autoClose: 1000,
        });
      });
  };

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(calendarCollection, where("author", "==", userEmail)),
      (response) => {
        setCalendarData(
          response.docs.map((doc) => {
            return { ...doc.data(), id: doc.id };
          })
        );
      }
    );
    return () => unsubscribe();
  }, [id]);

  //   const openEditTodo = (id) => {
  //     navigate(`/EditTodo/${id}`)
  //   }

  return (
    <div>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <TextField
          label="Add the Event Title"
          className="add-input"
          onChange={(event) => setTitle(event.target.value)}
          value={title}
          style={{ margin: 30, width: "800px" }}
        ></TextField>
        <TextField
          placeholder="Add the Date"
          type="date"
          className="add-input"
          onChange={(event) => setDate(event.target.value)}
          value={defaultDate}
          style={{ marginBottom: 10, width: "800px" }}
        ></TextField>
        <TextField
          placeholder="Add the Time"
          type="time"
          className="add-input"
          onChange={(event) => setTime(event.target.value)}
          value={time}
          style={{ marginTop: 20, width: "800px" }}
        ></TextField>
      </Box>
      <Box sx={styleCenter}>
        <Button
          style={{ width: 200, height: 50 }}
          variant="contained"
          value={id ? "Update" : "Add Todo"}
          endIcon={<AddCircleOutlineIcon />}
          onClick={addEvent}
          size="large"
        >
          ADD EVENT
        </Button>
      </Box>
    </div>
  );
}
