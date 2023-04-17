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

const ListPublications = React.lazy(() => import('./Components/Blog/ListPublications'))


const DetailsPublication = React.lazy(() => import('./Components/Blog/DetailsPub'))

const StatistiquesPub= React.lazy(() => import('./Components/Blog/StatistiquesPub'))


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

          <Route path="/ListPublications" element={<ListPublications />} />

          <Route path="/DetailsPublication/:idpub" element={<DetailsPublication />} />


          <Route path="/StatistiquesPub/:idpub" element={<StatistiquesPub />} />




          
        </Routes>



        <Footer />
      </Suspense>

    </div>
  );
}

export default App;
