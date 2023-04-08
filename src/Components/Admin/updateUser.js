import { useState, useEffect } from "react";
import { useDispatch ,useSelector} from "react-redux";
import { updateAsyncThunk,fetchUsers } from "../../features/Users";
import { createBrowserHistory } from 'history';
import { useParams } from "react-router-dom";
function Update() {
  const history = createBrowserHistory();
  const dispatch = useDispatch();
 
  const { id } = useParams();
  const userList = useSelector((state) => state.users.value);
  
 
//   const fetchUserCognito =useCallback(async()=>{
//     dispatch(setCurrentCognitoUserThunk())
// }, []);

  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
 const user = userList.find((user) => user._id === String(id));
 //  ===========================================
 const [loading, setLoading] = useState(true);
 useEffect(() => {
    dispatch(fetchUsers());
    
  }, [dispatch]);
  
  useEffect(() => {
    if (userList.length > 0) {
      setLoading(false);
      const userData = userList.find((user) => user._id === String(id));
      setPassword(userData.password);
      setEmail(userData.email);
      setName(userData.name);
      setUsername(userData.username);
    //   console.log("XYZ");
    }
  }, [id, userList]);
  
//   const fetchUserData=useCallback(async()=>{
//     dispatch(fetchUsers())
// }, [dispatch, id, userList]);

//   if(loading){
//     setLoading(false);
//     fetchUserData();
//   }
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(
        updateAsyncThunk({
            id:id,
        username,
        password,
        name,
        email
      }) 
    
    ).then(() => { 
      // history.push('/list');
      // window.location.reload();
    });
  }

  return (
    <main className="main-content  mt-0">
      <div className="container-fluid py-4">
        <div className="card card-plain">
          <div className="card-header">
            <h4 className="font-weight-bolder">update user </h4>
          
          </div>
          <div className="card-body">
            <form role="form" onSubmit={handleSubmit}>
              <label className="form-label">Username</label>
              <div className="input-group input-group-outline mb-3">
                <input
                  type="text"
                  className="form-control"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  disabled={false}
                />
              </div>
              <label className="form-label">Name</label>
              <div className="input-group input-group-outline mb-3">
                <input
                  type="text"
                  className="form-control"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                />
              </div>
              <label className="form-label">Email</label>
              <div className="input-group input-group-outline mb-3">
                <input
                  type="email"
                  className="form-control"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </div>
              <label className="form-label">Password</label>
              <div className="input-group input-group-outline mb-3">
                <input
                  type="password"
                  className="form-control"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
              </div>
              <div className="text-center">
                <button
                  type="submit"
                  className="btn btn-lg bg-gradient-primary btn-lg w-100 mt-4 mb-0"
                >
                  update
                </button>
              </div>
            </form>
          </div>
          <div class="card-footer text-center pt-0 px-lg-2 px-1">
       
    </div>
  </div>
  
  </div>
  </main>
  );
}

export default Update;