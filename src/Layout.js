import React from "react";
import { Link, Outlet } from "react-router-dom";

function Layout() {
  return (
    <main>
      <header>
        <nav>
          {/* {!isAuth ? <Link to="/Login" > Login </Link> : <button onClick={signUserOut}> Sign Out </button>} */}
          {/* {!isAuth ? <Link to="/SignUp" > SignUp </Link> : <button onClick={signUserOut}> Sign Out </button>} */}
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
