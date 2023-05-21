import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { deleteDoc, doc } from "firebase/firestore";
import { calendarCollection } from "./Calendar";

const useStyles = makeStyles({
  tableWrapper: {
    maxWidth: 1280,
    overflowX: "auto",
  },
  table: {
    minWidth: 650,
    maxWidth: "100%",
    overflowX: "auto",
  },
  actions: {
    display: "flex",
    justifyContent: "center",
    gap: "1rem",
  },
});

const TodoTable = ({ data }) => {
  const classes = useStyles();
  const navigate = useNavigate();

  const handleDeleteDoc = (id) => deleteDoc(doc(calendarCollection, id));

  return (
    <TableContainer className={classes.tableWrapper} component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Time</TableCell>
            <TableCell align="center">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {row?.title}
              </TableCell>
              <TableCell>{row?.date}</TableCell>
              <TableCell>{row?.time}</TableCell>
              <TableCell align="center" className={classes.actions}>
                <Button
                  variant="contained"
                  onClick={() => navigate(`/editEvent/${row?.id}`)}
                  size="large"
                >
                  Edit
                </Button>
                <Button
                  variant="contained"
                  onClick={() => handleDeleteDoc(row?.id)}
                  size="large"
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TodoTable;
