import { useState, useEffect } from 'react'
import bookLogo from './assets/books.png'
import { Routes, Route, Navigate } from "react-router-dom";
import Account from './components/Account';
import Books from './components/Books';
import LogIn from './components/Login';
import Navigations from './components/Navigations';
import Register from './components/Register';
import SingleBook from './components/SingleBook';


function App() {
  const [token, setToken] = useState(() => localStorage.getItem("token"));

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);
  
 
  return (
    <>
      <h1><img id='logo-image' src={bookLogo}/>Library App</h1>
      <div>
      <Navigations token={token} setToken={setToken}/>
      <Routes>
        <Route path="/books" element={<Books />} />
        <Route path="/books/:id" element={<SingleBook token={token} />} />
        <Route path='/login' element={<LogIn setToken={setToken} />} />
        <Route path="/register" element={<Register />} />
        <Route path='/users/me' element={<Account token={token} />} />
        <Route path='/account' element={token ? <Account token={token} /> : <Navigate to="/login" />} />
      </Routes>
    </div>

    </>
  )
}

export default App
