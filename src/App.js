import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Notes from './pages/Notes/Notes';
import Login from './pages/Authentication/Login';
import Journal from './pages/Journal/Journal';
import CalendarPage from './pages/Calendar/Calendar';
import ForgetPassword from './pages/Authentication/ForgetPassword';
import Profile from './pages/Profile/Profile';
import SignUp from './pages/Authentication/SignUp';
import ToDo from './pages/ToDo/ToDo';
import AddToDo from './pages/ToDo/AddToDo';
import EditTodo from './pages/ToDo/EditTodo';
import { useState } from 'react';
import { signOut } from 'firebase/auth'
import { auth, database, app } from './firebase-config';
import EditNotes from './pages/Notes/EditNotes';
import EditJournal from './pages/Journal/EditJournal';
import AddEvent from './pages/Calendar/AddEvent';
import EditEvent from './pages/Calendar/EditEvent';
import TextSum from './pages/TextSummarisation/TextSummarizer';


function App() {

  const [isAuth, setIsAuth] = useState(false);

  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
      window.location.pathname = "/Login"
    })
  };

  return (
    <Router>
      <nav>
        {/* {!isAuth ? <Link to="/Login" > Login </Link> : <button onClick={signUserOut}> Sign Out </button>} */}
        {/* {!isAuth ? <Link to="/SignUp" > SignUp </Link> : <button onClick={signUserOut}> Sign Out </button>} */}
        <Link to="/Notes"> Notes </Link>
        <Link to="/Calendar"> Calendar </Link>        
        <Link to="/ToDo"> To-do </Link>  
        <Link to="/Journal"> Journal </Link>  
        <Link to="/TextSum"> Text Sum </Link>
        <Link to="/Profile"> Profile </Link> 
      </nav> 
      <Routes>
        <Route path="/Notes" element={<Notes database = {database} />} />
        <Route path="/EditNotes/:id" element={<EditNotes database = {database} />} />
        <Route path="/Login" element={<Login setIsAuth={setIsAuth}/>} />
        <Route path="/Calendar" element={<CalendarPage database = {database}/>} />
        <Route path="/ForgetPassword" element={<ForgetPassword />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/ToDo" element={<ToDo database = {database}/>} />
        <Route path="/AddToDo" element={<AddToDo database = {database}/>} />
        <Route path="/EditTodo/:id" element={<EditTodo database = {database}/>} />
        <Route path="/Journal" element={<Journal database = {database} />} />
        <Route path="/EditJournal/:id" element={<EditJournal database = {database} />} />
        <Route path="/AddEvent" element={<AddEvent database = {database}/>} />
        <Route path="/EditEvent/:id" element={<EditEvent database = {database}/>} />
        <Route path="/TextSum" element={<TextSum />} />

        
        </Routes>
    </Router>
  );
}

export default App;
