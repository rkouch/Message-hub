import './App.css';
import Register from './pages/register/Register';
import Login from './pages/login/Login';
import Home from './pages/home/Home';
import { Route, Routes } from 'react-router-dom';
import Header from "./components/header/Header";
import DotDot from './components/fallback/DotDot';
import React from 'react';
import { setAccessToken } from './accessToken';

function App() {
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetch("/api/v1/auth/refresh-token", {
      method:"POST",
      credentials: "include"
    }).then(async x => {
      const data = await x.json();
      setAccessToken(data);
    }).catch(e => {
      console.log(e);
    })
  }, [])

  return (
      <>
      <div className="main-container">
        <Header></Header>
        <Routes>
          <Route path="/" element={<Home></Home>}></Route>
          <Route path="/register" element={<Register></Register>}></Route>
          <Route path="/login" element={<Login></Login>}></Route>
        </Routes>
      </div>
      
    </>
  )
}

export default App;
