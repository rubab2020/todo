import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import AuthProtectedRoute from './context/auth/AuthProtectedRoute';
import Todo from './views/app/todo/list';
import Login from './views/user/login';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/todo" element={<AuthProtectedRoute><Todo /></AuthProtectedRoute>} />
    </Routes>
  )
}

export default App
