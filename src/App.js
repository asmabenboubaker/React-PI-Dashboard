//import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from "react";
import { Suspense } from 'react';
import {  Route, Routes } from 'react-router-dom';




const Sidebar = React.lazy(() => import('./Components/Pages/Sidebar'))
const Footer = React.lazy(() => import('./Components/Pages/Footer'))
const Navbar = React.lazy(()=>import('./Components/Pages/Navbar'))
const Dashboard = React.lazy(()=>import('./Components/Pages/Dashboard'))
const SignIn = React.lazy(()=>import('./Components/Admin/SignIn'))
const ListUsers = React.lazy(()=>import('./Components/Admin/ListUsers'))
const Profile = React.lazy(()=>import('./Components/Admin/profile'))




function App() {
  return (
<div className='MyApp'>

<Suspense fallback={<div>Loading...</div>}>
<Navbar/>
    <Sidebar/>
     
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="*" element={<Dashboard />} />
        
          <Route path="/signin" element={<SignIn/>}/>
          <Route path="/list" element={<ListUsers/>}/>
          <Route path="/profile" element={<Profile/>}/>


         

            </Routes>
        <Footer/>
      </Suspense>

    </div>
  );
}

export default App;
