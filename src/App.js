//import logo from './logo.svg';
import './App.css';

import Sidebar from './Components/Pages/Sidebar'
import Navbar from './Components/Pages/Navbar'
import Footer from './Components/Pages/Footer'
import Dashboard from './Components/Pages/Dashboard'






function App() {
  return (
    <div className="g-sidenav-show  bg-gray-200">

      <Sidebar/>

      <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
      <Navbar/>

      <div className="container-fluid py-4">

      
      <Dashboard/>


      <Footer/>
      </div>

      </main>
    </div>
  );
}

export default App;
