import React from "react";
import Notes from "./pages/Notes/Notes";
import Login from "./pages/Authentication/Login";
import Journal from "./pages/Journal/Journal";
import CalendarPage from "./pages/Calendar/Calendar";
import ForgetPassword from "./pages/Authentication/ForgetPassword";
import Profile from "./pages/Profile/Profile";
import SignUp from "./pages/Authentication/SignUp";
import ToDo from "./pages/ToDo/ToDo";
import AddToDo from "./pages/ToDo/AddToDo";
import EditTodo from "./pages/ToDo/EditTodo";
import { database } from "./firebase-config";
import EditNotes from "./pages/Notes/EditNotes";
import EditJournal from "./pages/Journal/EditJournal";
import AddEvent from "./pages/Calendar/AddEvent";
import EditEvent from "./pages/Calendar/EditEvent";
import TextSum from "./pages/TextSummarisation/TextSummarizer";

import { Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import { useAuthContext } from "./providers/AuthProvider";

function AppRoutes() {
  const { isLoggedIn } = useAuthContext();

  return (
    <Routes>
      {!isLoggedIn ? (
        <>
          <Route path="/login" element={<Login />} />
          <Route path="/ForgetPassword" element={<ForgetPassword />} />
          <Route path="/SignUp" element={<SignUp />} />
        </>
      ) : (
        <Route path="/" element={<Layout />}>
          <Route path="/Notes" element={<Notes database={database} />} />
          <Route
            path="/EditNotes/:id"
            element={<EditNotes database={database} />}
          />
          <Route path="/Profile" element={<Profile />} />
          <Route
            path="/Calendar"
            element={<CalendarPage database={database} />}
          />
          <Route path="/ToDo" element={<ToDo database={database} />} />
          <Route path="/AddToDo" element={<AddToDo database={database} />} />
          <Route
            path="/EditTodo/:id"
            element={<EditTodo database={database} />}
          />
          <Route path="/Journal" element={<Journal database={database} />} />
          <Route
            path="/EditJournal/:id"
            element={<EditJournal database={database} />}
          />
          <Route path="/AddEvent" element={<AddEvent database={database} />} />
          <Route
            path="/EditEvent/:id"
            element={<EditEvent database={database} />}
          />
          <Route path="/TextSummarizer" element={<TextSum />} />
          <Route path="/*" element={<h1>Seems you missed the page</h1>} />
        </Route>
      )}
    </Routes>
  );
}

export default AppRoutes;
