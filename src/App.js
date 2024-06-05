import { useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, useNavigate, Navigate } from 'react-router-dom';

import Login from './components/Login/LoginAuth';
import Registration from './components/registration/Registration';
import Dashboard from './components/dashboard/Dashboard';
import Sidebar from './components/Sidebar/sidebar';
import About from './components/About_us/about';
import Contact from './components/Contact_us/contact';
import { isTokenExpired, getToken } from './utils/storage';


function App() {

  const isAuthenticated = () => {
    const token = getToken();
    return token && !isTokenExpired();
  };

  return (
    <Router>
      {/* <div className="app">
        <Sidebar />
        <div className="content"> */}
      <Routes>
        <Route path="/" element={isAuthenticated() ? <Navigate to='/dashboard' /> : <Login />} />
        <Route path="/register" element={<Registration />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
      </Routes>

      {/* </div >
      </div> */}
    </Router>
  );
}

export default App;
