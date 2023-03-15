
import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import { NavLink, Routes, Route } from "react-router-dom";

import {login} from '../../service/api'

function SignIn() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState('');
  const [redirectTo, setRedirectTo] = useState(null);
  const [connected, setConnected] = useState({ username: "", email: "", name: "", image: "", google: false });

  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const [banned, setBanned] = useState(false);



  const handleSubmit = (event) => {
    
    event.preventDefault();

   
      const user = {
        'username': username,
        'password': password
      };

      login(user).then((response) => {

        if (JSON.parse(localStorage.getItem("user"))["active"] == true) {
          if (JSON.parse(localStorage.getItem("user"))["role"] == "admin") {
          navigate('/profile');


          window.location.reload();

          } 
          else
          {
            alert("you are not admin")
          }
          // window.location.reload();
        } else {
          setBanned(true); 
          localStorage.removeItem("user");
        }

      });
    };


        






   
      
    return (<><main className="main-content  mt-0">
    <div
      className="page-header align-items-start min-vh-100"
      style={{
        backgroundImage:
          'url("https://images.unsplash.com/photo-1497294815431-9365093b7331?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80")'
      }}
    >
      <span className="mask bg-gradient-dark opacity-6" />
      <div className="container my-auto">
        <div className="row">
          <div className="col-lg-4 col-md-8 col-12 mx-auto">
            <div className="card z-index-0 fadeIn3 fadeInBottom">
              <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                <div className="bg-gradient-primary shadow-primary border-radius-lg py-3 pe-1">
                  <h4 className="text-white font-weight-bolder text-center mt-2 mb-0">
                    Sign in
                  </h4>
                  <div className="row mt-3">
                    {/* <div className="col-2 text-center ms-auto">
                      <a className="btn btn-link px-3" href="javascript:;">
                        <i className="fa fa-facebook text-white text-lg" />
                      </a>
                    </div>
                    <div className="col-2 text-center px-1">
                      <a className="btn btn-link px-3" href="javascript:;">
                        <i className="fa fa-github text-white text-lg" />
                      </a>
                    </div>
                    <div className="col-2 text-center me-auto">
                      <a className="btn btn-link px-3" href="javascript:;">
                        <i className="fa fa-google text-white text-lg" />
                      </a>
                    </div> */}
                  </div>
                </div>
              </div>
              <div className="card-body">
                <form role="form" className="text-start" onSubmit={handleSubmit}>
                  <div className="input-group input-group-outline my-3">
                    <input  type="text"
                          value={username}
                          placeholder="Enter Your Username..."
                          onChange={(e) => setUsername(e.target.value)}
                           className="form-control" />
                  </div>
                  <div className="input-group input-group-outline mb-3">
                    <input  type="password"
                          name="password"
                          id="password"
                          placeholder="Enter Password..."
                          value={password}
                          onChange={(e) => setPassword(e.target.value)} className="form-control" />
                  </div>
                  <div className="form-check form-switch d-flex align-items-center mb-3">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="rememberMe"
                    />
                    <label
                      className="form-check-label mb-0 ms-2"
                      htmlFor="rememberMe"
                    >
                      Remember me
                    </label>
                  </div>
                  <div className="text-center">
                    <button
                      type="submit"
                      className="btn bg-gradient-primary w-100 my-4 mb-2"
                    >
                      Sign in
                    </button>
                  </div>
                  <p className="mt-4 text-sm text-center">
                    Don't have an account?
                    <a
                      href="../pages/sign-up.html"
                      className="text-primary text-gradient font-weight-bold"
                    >
                      Sign up
                    </a>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer className="footer position-absolute bottom-2 py-2 w-100">
        <div className="container">
          <div className="row align-items-center justify-content-lg-between">
            <div className="col-12 col-md-6 my-auto">
              {/* <div className="copyright text-center text-sm text-white text-lg-start">
                © , made with <i className="fa fa-heart" aria-hidden="true" /> by
                <a
                  href="https://www.creative-tim.com"
                  className="font-weight-bold text-white"
                  target="_blank"
                >
                  Creative Tim
                </a>
                for a better web.
              </div> */}
            </div>
         
          </div>
        </div>
      </footer>
    </div>
  </main>
  </>  );
}

export default SignIn;