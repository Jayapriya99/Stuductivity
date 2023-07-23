import React from "react";
import { Link, Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import EditNoteIcon from '@mui/icons-material/EditNote';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ChecklistIcon from '@mui/icons-material/Checklist';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import FormatColorTextIcon from '@mui/icons-material/FormatColorText';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HomeIcon from '@mui/icons-material/Home';

function Layout() {
  return (
    <main>
      <header>
        <nav>
        <Link to="/TextSummarizer"> 
            Text Sum 
            <FormatColorTextIcon style={{ marginLeft: 10, fontSize: 30, verticalAlign: "middle"}} />
            </Link>
        <Link to="/Notes">
            Notes
            <EditNoteIcon style={{ marginLeft: 10, fontSize: 30, verticalAlign: "middle"}} />
          </Link>
          <Link to="/Calendar"> 
            Calendar 
            <CalendarMonthIcon style={{ marginLeft: 10, fontSize: 30, verticalAlign: "middle"}} />
          </Link>
          <Link to="/ToDo"> 
            To-do 
            <ChecklistIcon style={{ marginLeft: 10, fontSize: 30, verticalAlign: "middle"}} />
          </Link>
          <Link to="/Journal"> 
            Journal 
            <MenuBookIcon style={{ marginLeft: 10, fontSize: 30, verticalAlign: "middle"}} />
          </Link>
          <Link to="/Profile"> 
            Profile 
            <AccountCircleIcon style={{ marginLeft: 10, fontSize: 30, verticalAlign: "middle"}}/>
            </Link>
        </nav>
      </header>
      <Outlet />
    </main>
  );
}

export default Layout;
