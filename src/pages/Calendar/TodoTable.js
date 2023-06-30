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
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';

const useStyles = makeStyles({
  tableWrapper: {
    maxWidth: 1100,
    overflowX: "auto",
  },
  table: {
    minWidth: 500,
    maxWidth: 1100,
    overflowX: "auto",
    backgroundColor: "#f0c6b9",
  },
  actions: {
    display: "flex",
    justifyContent: "center",
    gap: "1rem",
  },
  title: { 
    backgroundColor: "#FC997C",
    color: "#2E4C6D",
    fontWeight: "bold",
    fontSize: "18px",
    textAlign: "center",
  },
  content: {
    fontSize: "16px",
    textAlign: "center",
  }
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
            <TableCell className={classes.title}>Title</TableCell>
            <TableCell className={classes.title}>Date</TableCell>
            <TableCell className={classes.title}>Time</TableCell>
            <TableCell align="center" className={classes.title}>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row" className={classes.content}>
                {row?.title}
              </TableCell>
              <TableCell className={classes.content}>{row?.date}</TableCell>
              <TableCell className={classes.content}>{row?.time}</TableCell>
              <TableCell align="center" className={classes.actions}>
                <ModeEditIcon
                variant='filled'
                color="primary"
                // startIcon={<ModeEditIcon />}
                style={{cmarginRight: 20, paddingRight: 30}}
                onClick={() => navigate(`/editEvent/${row?.id}`)}
                >
                </ModeEditIcon>
                {/* <Button
                  variant="contained"
                  onClick={() => navigate(`/editEvent/${row?.id}`)}
                  size="large"
                  style={{ backgroundColor: "#4F709C"}}
                >
                  Edit
                </Button> */}
                <DeleteIcon
                  variant='filled'
                  color="warning"
                  onClick={() => handleDeleteDoc(row?.id)}
                  style={{marginLeft: 20, paddingRight: 10}}
                  >
                  DELETE
                </DeleteIcon>
                {/* <Button
                  variant="contained"
                  onClick={() => handleDeleteDoc(row?.id)}
                  size="large"
                  style={{ backgroundColor: "#FF6666"}}
                >
                  Delete
                </Button> */}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TodoTable;
