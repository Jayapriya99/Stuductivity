import React from "react";
import { Link, Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import NotesIcon from '@mui/icons-material/Notes';


function Layout() {
  return (
    <main>
      <header>
        <nav>
          <Link to="/Notes"> Notes </Link>
          <Link to="/Calendar"> Calendar </Link>
          <Link to="/ToDo"> To-do </Link>
          <Link to="/Journal"> Journal </Link>
          <Link to="/TextSummarizer"> Text Sum </Link>
          <Link to="/Profile"> Profile </Link>
        </nav>
      </header>
      <Outlet />
    </main>
  );
}

export default Layout;
