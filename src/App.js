import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/login';
import AdminDashboard from './pages/adminDashboard';
import 'bootstrap/dist/css/bootstrap.min.css';

const PrivateRoute = ({ element }) => {
  const isLoggedIn = localStorage.getItem('token');

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return element;
};

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/admin-dashboard" replace />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/admin-dashboard"
          element={
            <PrivateRoute element={<AdminDashboard />} />
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;