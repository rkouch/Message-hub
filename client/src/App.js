import './App.css';
import Register from './pages/register/Register';
import Login from './pages/login/Login';
import Home from './pages/home/Home';
import { Route, Routes } from 'react-router-dom';
import Header from "./components/header/Header";
import DotDot from './components/fallback/DotDot';
import React from 'react';
import { AuthProvider } from './AuthProvider';

function App() {
  return (
      <>
      <div className="main-container">
        <AuthProvider>
          <Header></Header>
          <Routes>
            <Route path="/" element={<Home></Home>}></Route>
            <Route path="/register" element={<Register></Register>}></Route>
            <Route path="/login" element={<Login></Login>}></Route>
          </Routes>
        </AuthProvider>
      </div>
      
    </>
  )
}

export default App;
