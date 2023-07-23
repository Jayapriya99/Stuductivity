import React, { useState } from 'react';
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
    transition: 'background-color 0.3s', 
  };

  const iconStyle = {
    fontSize: 40,
    marginBottom: 10,
  };

  const textStyle = {
    fontWeight: 'bold',
  };

  const boxStyleHover = {
    backgroundColor: '#FC997C', 
  };

  const [hoveredBox, setHoveredBox] = useState(null);

  const handleBoxHover = (index) => {
    setHoveredBox(index);
  };

  const handleBoxLeave = () => {
    setHoveredBox(null);
  };

  const boxData = [
    {
      icon: <FormatColorTextIcon style={iconStyle} />,
      title: 'Text Summarisation',
      link: '/TextSummarizer',
    },
    {
      icon: <EditNoteIcon style={iconStyle} />,
      title: 'Notes',
      link: '/Notes',
    },
    {
      icon: <CalendarMonthIcon style={iconStyle} />,
      title: 'Calendar',
      link: '/Calendar',
    },
    {
      icon: <ChecklistIcon style={iconStyle} />,
      title: 'To-Do',
      link: '/ToDo',
    },
    {
      icon: <MenuBookIcon style={iconStyle} />,
      title: 'Journal',
      link: '/Journal',
    },
    {
      icon: <AccountCircleIcon style={iconStyle} />,
      title: 'Profile',
      link: '/Profile',
    },
  ];

  return (
    <div style={containerStyle}>
      <Grid container spacing={10}>
        {boxData.map((box, index) => (
          <Grid item xs={6} sm={4} key={index}>
            <Link to={box.link} style={{ textDecoration: 'none' }}>
              <Paper
                style={{
                  ...boxStyle,
                  ...(hoveredBox === index ? boxStyleHover : {}),
                }}
                className='home-grid'
                onMouseEnter={() => handleBoxHover(index)}
                onMouseLeave={handleBoxLeave}
              >
                {box.icon}
                <Typography variant="h5" style={textStyle}>
                  {box.title}
                </Typography>
              </Paper>
            </Link>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default Home;
