import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Login from './pages/Login';
import Register from './pages/Register'
import Home from './pages/Home'
import RegistrationComplete from './pages/RegistrationComplete';

const ProtectedRoute = ({ children }) => {

  const navigate = useNavigate();
  const storedToken = localStorage.getItem('access_token');

  useEffect(() => {
    if (storedToken == null) {
      navigate('/');
    }
  }, [navigate, storedToken]);

  return children;

};

const RoutesWrapper = ({ setToken }) => {

  return (
    <Routes>
      <Route path="/" element={<Login setToken={setToken} />} />
      <Route path="/register" element={<Register />} />
      <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
      <Route path="/registration-complete" element={<RegistrationComplete />} />
    </Routes>
  );
};

const App = () => {

  // eslint-disable-next-line
  const [_, setToken] = useState(null);

  return (
    <BrowserRouter>
      <RoutesWrapper setToken={setToken} />
    </BrowserRouter>
  );
};

export default App;
