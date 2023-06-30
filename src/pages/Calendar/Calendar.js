import React, { useMemo } from "react";
import moment from "moment";
import { useState, useEffect } from "react";
import Calendar from "react-calendar";
// import "react-calendar/dist/Calendar.css";
import "./calendar.css";

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
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Modal,
  Button,
  Box,
  Typography,
  Card,
  TextField,
} from "@material-ui/core";
import "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import TodoTable from "./TodoTable";
import { database } from "../../firebase-config";

const styleCenter = {
  top: "50%",
  right: "50%",
  left: "50%",
  transform: "translate(42%, 50%)",
  p: 1,
};

export const calendarCollection = collection(database, "calendar-data");

const DATE_FORMAT = "MM/DD/YYYY";

export default function CalendarPage({ database }) {
  const [date, setDate] = useState(new Date());
  const [calendarData, setCalendarData] = useState([]);

  let userEmail = localStorage.getItem("loginEmail");
  let navigate = useNavigate();

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
  }, []);

  const tileClassName = ({ date }) => {
    if (
      calendarData.find(
        (d) =>
          moment(d.date).format(DATE_FORMAT) ===
          moment(date).format(DATE_FORMAT)
      )
    ) {
      return "selected-date";
    }
  };

  const todoTableData = useMemo(
    () =>
      calendarData.filter(
        (event) =>
          moment(event.date).format(DATE_FORMAT) ===
          moment(date).format(DATE_FORMAT)
      ),
    [date, calendarData]
  );

  return (
    <Box
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "2rem",
        padding: "1rem",
      }}
    >
      <Calendar onChange={setDate} value={date} tileClassName={tileClassName} />

      <Box
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        {/* Selected date: {date.toDateString()} */}
        <Box sx={styleCenter}>
          <Button
            style={{ width: 350, height: 50, backgroundColor: '#396EB0', color: 'white' }}
            variant="contained"
            startIcon={<AddCircleOutlineIcon />}
            onClick={() =>
              navigate("/AddEvent", {
                state: { date: moment(date).format("YYYY-MM-DD") },
              })
            }
            size="large"
          >
            Add Event for {date.toDateString()}
          </Button>
        </Box>
      </Box>
      <TodoTable data={todoTableData} />
      {/* <div className='grid-3'>
        {calendarData.map((doc) => {
          return (
            <Box className='grid-2' 
            sx={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr auto auto',
              gridGap: 2,
              alignItems: 'center',
              padding: 2,
              border: '1px solid #ccc',
              borderRadius: '5px',
              '& button': {
                marginLeft: 1,
                marginRight: 1,
              },
            }}
            >
              <Typography sx={{ display: 'flex', alignItems: 'center', whiteSpace: 'nowrap' }}>
                {doc.title}
              </Typography>
              <Typography sx={{ display: 'flex', alignItems: 'center', whiteSpace: 'nowrap' }}>
                {doc.date}
              </Typography>
              <Typography sx={{paddingLeft:5, paddingTop:2, paddingBottom:2, paddingRight: 20 }}>
                {doc.time}
              </Typography>
              <ModeEditIcon
              variant='filled'
              color="primary"
              // startIcon={<ModeEditIcon />}
              style={{cmarginRight: 20}}
              // onClick={() => navigate(`/EditTodo/${doc.id}`)}
              >
              </ModeEditIcon>
              <DeleteIcon
              variant='filled'
              color="warning"
              // onClick={() => TodoDelete(doc.id)}
              style={{marginLeft: 20}}
              >
              DELETE
              </DeleteIcon>

            </Box>
          )
        })}

     
      </div> */}
    </Box>
  );
}
