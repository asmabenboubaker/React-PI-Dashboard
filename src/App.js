//import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from "react";
import { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';




const Sidebar = React.lazy(() => import('./Components/Pages/Sidebar'))
const Footer = React.lazy(() => import('./Components/Pages/Footer'))
const Navbar = React.lazy(() => import('./Components/Pages/Navbar'))
const Dashboard = React.lazy(() => import('./Components/Pages/Dashboard'))
const SignIn = React.lazy(() => import('./Components/Admin/SignIn'))
const ListUsers = React.lazy(() => import('./Components/Admin/ListUsers'))
const Profile = React.lazy(() => import('./Components/Admin/profile'))


const AddUser = React.lazy(() => import('./Components/Admin/AddUser'))
const Update = React.lazy(() => import('./Components/Admin/updateUser'))

// pett ======================

const ListPet = React.lazy(() => import('./Components/Pages/Pets/ListPets'))

const UpdatePet = React.lazy(() => import('./Components/Pages/Pets/UpdatePet'))

const Listlost = React.lazy(() => import('./Components/Pages/Pets/LostList'))

const LostPost = React.lazy(() => import('./Components/Pages/Pets/AddLost'))

const UpdateLost = React.lazy(() => import('./Components/Pages/Pets/UpdateLost'))

function App() {
  const [user, setUser] = useState(null)
  useEffect(() => {
    if (localStorage.getItem("user") != null)
      setUser(localStorage.getItem("user"));
    
    console.log(user)
  },[])

  return (
    <div className='MyApp'>

      <Suspense fallback={<div>Loading...</div>}>
        <Navbar />
        <Sidebar />

        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="*" element={<Dashboard />} />
          {user == null &&<Route path="/signin" element={<SignIn />} />}

          <Route path="/signin" element={<SignIn />} />
          <Route path="/list" element={<ListUsers />} />
          {user &&(<Route path='/profile' element={<Profile />}></Route>)}
          <Route path="/addUser" element={<AddUser />} />
          <Route path="/update/:id" element={<Update />} />
          


          <Route path="/listpet" element={<ListPet />} />
          <Route path="/listlost" element={<Listlost />} />
          <Route path="/addpost" element={<LostPost />} />
          <Route path="/updatePet/:id" element={<UpdatePet />} />
          <Route path="/UpdateLost/:id" element={<UpdateLost />} />
        </Routes>
        <Footer />
      </Suspense>

    </div>
  );
}

export default App;
