import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../../features/Users";
import { createBrowserHistory } from 'history';
function AddUser() {
    const history = createBrowserHistory();
  const dispatch = useDispatch();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(
      addUser({
        
        username,
        password,
        name,
        email
      })
    ).then(data => { 
        history.push('/list');
        window.location.reload();
        
    })
    setName("");
    setUsername("");
  };

  return (
    <main className="main-content  mt-0">
         <div className="container-fluid py-4">
    <div class="card card-plain">
    <div class="card-header">
      <h4 class="font-weight-bolder">Add User</h4>
      <p class="mb-0">Enter your email and password to register</p>
    </div>
    <div class="card-body">
      <form role="form" onSubmit={handleSubmit}>
      <label class="form-label">Username</label>
      <div class="input-group input-group-outline mb-3">
          
          <input type="text" class="form-control"
          value={username}
          onChange={(event) => {
            setUsername(event.target.value);
          }}
          />
        </div>
        <label class="form-label">Name</label>
        <div class="input-group input-group-outline mb-3">
         
          <input type="text" class="form-control" 
          value={name}
           onChange={(event) => {
            setName(event.target.value);
          }}
          />
        </div>
         <label class="form-label">Email</label>
        <div class="input-group input-group-outline mb-3">
         
          <input type="email" class="form-control"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          
          />
        </div>
        <label class="form-label">Password</label>
        <div class="input-group input-group-outline mb-3">
         
          <input type="password" class="form-control"
           value={password}
           onChange={(event) => setPassword(event.target.value)}
        />
        </div>
        
        <div class="text-center">
          <button type="submit" class="btn btn-lg bg-gradient-primary btn-lg w-100 mt-4 mb-0">Sign Up</button>
        </div>
      </form>
    </div>
    <div class="card-footer text-center pt-0 px-lg-2 px-1">
      <p class="mb-2 text-sm mx-auto">
        Already have an account?
        <a href="../pages/sign-in.html" class="text-primary text-gradient font-weight-bold">Sign in</a>
      </p>
    </div>
  </div>
  
  </div>
  </main>
  );
}

export default AddUser;
