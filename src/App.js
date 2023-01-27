import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Notes from './pages/Notes';
import Login from './pages/Login';
import Journal from './pages/Journal';
import Calendar from './pages/Calendar';
import ForgetPassword from './pages/ForgetPassword';
import Profile from './pages/Profile';
import SignUp from './pages/SignUp';
import Reminders from './pages/Reminders'

function App() {
  return (
    <Router>
      <nav>
        <Link to="/Notes"> Notes </Link>
        <Link to="/Calendar"> Calendar </Link>        
        <Link to="/Reminders"> Reminders </Link>  
        <Link to="/Journal"> Journal </Link>  
        <Link to="/Profile"> Profile </Link>  
      </nav>
      <Routes>
        <Route path="/Notes" element={<Notes />} />
        <Route path="/" element={<Login />} />
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
