import React from 'react';
import { Grid, Paper, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import FormatColorTextIcon from '@mui/icons-material/FormatColorText';
import EditNoteIcon from '@mui/icons-material/EditNote';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ChecklistIcon from '@mui/icons-material/Checklist';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

function Home() {
  const containerStyle = {
    height: '90vh',
    padding: '0 100px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const boxStyle = {
    backgroundColor: '#f0c6b9',
    color: '#2E4C6D',
    height: 200,
    width: 300,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const iconStyle = {
    fontSize: 40,
    marginBottom: 10,
  };

  const textStyle = {
    fontWeight: 'bold',
  };

  return (
    <div style={containerStyle}>
      <Grid container spacing={15}>
        <Grid item xs={6} sm={4}>
          <Link to="/TextSummarizer" style={{ textDecoration: 'none' }}>
            <Paper style={boxStyle}>
              <FormatColorTextIcon style={iconStyle} />
              <Typography variant="h5" style={textStyle}>
                Text Summarisation
              </Typography>
            </Paper>
          </Link>
        </Grid>
        <Grid item xs={6} sm={4}>
          <Link to="/Notes" style={{ textDecoration: 'none' }}>
            <Paper style={boxStyle}>
              <EditNoteIcon style={iconStyle} />
              <Typography variant="h5" style={textStyle}>
                Notes
              </Typography>
            </Paper>
          </Link>
        </Grid>
        <Grid item xs={6} sm={4}>
          <Link to="/Calendar" style={{ textDecoration: 'none' }}>
            <Paper style={boxStyle}>
              <CalendarMonthIcon style={iconStyle} />
              <Typography variant="h5" style={textStyle}>
                Calendar
              </Typography>
            </Paper>
          </Link>
        </Grid>
        <Grid item xs={6} sm={4}>
          <Link to="/ToDo" style={{ textDecoration: 'none' }}>
            <Paper style={boxStyle}>
              <ChecklistIcon style={iconStyle} />
              <Typography variant="h5" style={textStyle}>
                To-Do
              </Typography>
            </Paper>
          </Link>
        </Grid>
        <Grid item xs={6} sm={4}>
          <Link to="/Journal" style={{ textDecoration: 'none' }}>
            <Paper style={boxStyle}>
              <MenuBookIcon style={iconStyle} />
              <Typography variant="h5" style={textStyle}>
                Journal
              </Typography>
            </Paper>
          </Link>
        </Grid>
        <Grid item xs={6} sm={4}>
          <Link to="/Profile" style={{ textDecoration: 'none' }}>
            <Paper style={boxStyle}>
              <AccountCircleIcon style={iconStyle} />
              <Typography variant="h5" style={textStyle}>
                Profile
              </Typography>
            </Paper>
          </Link>
        </Grid>
      </Grid>
    </div>
  );
}

export default Home;
