import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Sidebar from './components/Dashboard/Sidebar';
import LoginAndSignUp from './components/Login&SignUp/LoginAndSignUp';
import './App.css';
import Login from './components/Login/Login';
// import { AuthProvider } from './context/AuthProvider';


function App() {

 const rtoken = 'token';
 
  const isAuthenticated =  rtoken != null;

  return (
    <>
      <BrowserRouter>
          <Routes>
                     <Route exact path='/login' element={<Login />} /> 
                     <Route  path='/' element={<Sidebar />} /> 

                     </Routes>

      </BrowserRouter>
    </>
  );
}

export default App;
