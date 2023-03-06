import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/header';
import AuthProtectedRoute from './contexts/auth/AuthProtectedRoute';
import GuestProtectedRoute from './contexts/guest/GuestProtectedRoute';
import Task from './views/app/task';
import Todo from './views/app/todo';
import Login from './views/user/login';
import Register from './views/user/register';

function App() {
  return (
    <React.Fragment>
      <div className="mb-4">
        <Header />
      </div>
      <Routes>
        <Route path="/login" element={<GuestProtectedRoute><Login /></GuestProtectedRoute>} />
        <Route path="/register" element={<GuestProtectedRoute><Register /></GuestProtectedRoute>} />
        <Route path="/todos" element={<AuthProtectedRoute><Todo /></AuthProtectedRoute>} />
        <Route path="/tasks" element={<AuthProtectedRoute><Task /></AuthProtectedRoute>} />
      </Routes>
    </React.Fragment>
  )
}

export default App
