import logo from './logo.svg';
import './App.css';
import Navbar from './components/navbar/Navbar';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import { Route, Routes } from 'react-router-dom';
import Sidebar from "./components/sidebar/Sidebar";

function App() {

  return (
    <>
    
      <Sidebar></Sidebar>
      <div className="container">
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
