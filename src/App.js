import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Notes from './pages/Notes/Notes';
import Login from './pages/Authentication/Login';
import Journal from './pages/Journal/Journal';
import Calendar from './pages/Calendar/Calendar';
import ForgetPassword from './pages/Authentication/ForgetPassword';
import Profile from './pages/Profile/Profile';
import SignUp from './pages/Authentication/SignUp';
import Reminders from './pages/Reminders/Reminders';
import { useState } from 'react';
import { signOut } from 'firebase/auth'
import { auth } from './firebase-config';

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
        {/* <Link to="/Notes"> Notes </Link>
        <Link to="/Calendar"> Calendar </Link>        
        <Link to="/Reminders"> Reminders </Link>  
        <Link to="/Journal"> Journal </Link>  
        <Link to="/Profile"> Profile </Link>   */}
        {!isAuth ? <Link to="/Login" > Login </Link> : <button onClick={signUserOut}> Sign Out </button>}
        {!isAuth ? <Link to="/SignUp" > SignUp </Link> : <button onClick={signUserOut}> Sign Out </button>}

      </nav>
      <Routes>
        <Route path="/Notes" element={<Notes />} />
        <Route path="/Login" element={<Login setIsAuth={setIsAuth}/>} />
        <Route path="/Calendar" element={<Calendar />} />
        <Route path="/ForgetPassword" element={<ForgetPassword />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/Reminders" element={<Reminders />} />
        <Route path="/Journal" element={<Journal />} />
        </Routes>
    </Router>
  );
}

export default App;
