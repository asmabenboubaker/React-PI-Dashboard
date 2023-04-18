//import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from "react";
import { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import Products from "./Components/Pages/Products/Products";
import NewProduct from "./Components/Pages/Products/New";
import UpdateProduct from "./Components/Pages/Products/Update";




const Sidebar = React.lazy(() => import('./Components/Pages/Sidebar'))
const Footer = React.lazy(() => import('./Components/Pages/Footer'))
const Navbar = React.lazy(() => import('./Components/Pages/Navbar'))
const Dashboard = React.lazy(() => import('./Components/Pages/Dashboard'))
const SignIn = React.lazy(() => import('./Components/Admin/SignIn'))
const ListUsers = React.lazy(() => import('./Components/Admin/ListUsers'))
const Profile = React.lazy(() => import('./Components/Admin/profile'))


const AddUser = React.lazy(() => import('./Components/Admin/AddUser'))
const Update = React.lazy(() => import('./Components/Admin/updateUser'))
const Associations = React.lazy(() => import('./Components/Admin/Associations'))



const ListPublications = React.lazy(() => import('./Components/Blog/ListPublications'))



const Listecoupon=React.lazy(()=>import('./Components/Admin/Listcoupon'));




const DetailsPublication = React.lazy(() => import('./Components/Blog/DetailsPub'))

const StatistiquesPub= React.lazy(() => import('./Components/Blog/StatistiquesPub'))
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
    <div className="MyApp">
      <Suspense fallback={<div>Loading...</div>}>
        <Navbar />
        <Sidebar />

        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="*" element={<Dashboard />} />
          {user == null && <Route path="/signin" element={<SignIn />} />}

          <Route path="/signin" element={<SignIn />} />
          <Route path="/list" element={<ListUsers />} />

          <Route path="/associations" element={<Associations />} />

          {user && <Route path="/profile" element={<Profile />}></Route>}
          <Route path="/addUser" element={<AddUser />} />


          <Route path="/update/:id" element={<Update />} />

          <Route path="/ListPublications" element={<ListPublications />} />

          <Route path="/DetailsPublication/:idpub" element={<DetailsPublication />} />

          <Route path="/products" element={<Products />} />
          <Route path="/products/new" element={<NewProduct />} />
          <Route path="/products/update/:id" element={<UpdateProduct />} />
          <Route path="/listCoupon" element={<Listecoupon/>} />



          <Route path="/StatistiquesPub/:idpub" element={<StatistiquesPub />} />

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
