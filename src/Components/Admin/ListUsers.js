import { useState ,useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { addUser, deleteUser, updateUsername ,fetchUsers,banUseradmin} from "../../features/Users";
import { createBrowserHistory } from 'history';
function ListUsers() {
  const dispatch = useDispatch();
  const userList = useSelector((state) => state.users.value);

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const history = createBrowserHistory();
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);
  const handleAddUser = () => {
     
      history.push('/addUser');
       window.location.reload();
  
  };
  return (
        <main className="main-content  mt-0">
         <div className="container-fluid py-4">
    <div className="row">
      <div className="col-12">
        <div className="card my-4">
          <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
            <div className="bg-gradient-primary shadow-primary border-radius-lg pt-4 pb-3">
              <h6 className="text-white text-capitalize ps-3">List Users</h6>
            </div>
          </div>
          <div className="card-body px-0 pb-2">
            <div className="table-responsive p-0">
              <table className="table align-items-center mb-0">
                <thead>
                  <tr>
                    <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                      Author
                    </th>
                    <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                      Function
                    </th>
                    <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                      Status
                    </th>
                    <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                    date of creation
                    </th>
                    <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                    Action 
                    </th>
                  </tr>
                </thead>
                <tbody>
                {userList.map((user) => {
          return (
                  <tr>
                    <td>
                      <div className="d-flex px-2 py-1">
                        <div>
                          <img
                            src="../assets/img/team-2.jpg"
                            className="avatar avatar-sm me-3 border-radius-lg"
                            alt="user1"
                          />
                        </div>
                        <div className="d-flex flex-column justify-content-center">
                          <h6 className="mb-0 text-sm">{user.name}</h6>
                          <p className="text-xs text-secondary mb-0">
                          {user.email}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <p className="text-xs font-weight-bold mb-0">Role</p>
                      <p className="text-xs text-secondary mb-0">{user.role}</p>
                    </td>
                    <td className="align-middle text-center text-sm">
                        
                          {user.active ? (
                            <button className="badge badge-sm bg-gradient-success"  
                            
                            onClick={() => {
                              if (window.confirm("Are you sure you want to ban this user?")) {
                              dispatch(banUseradmin(user)).then(data => { 
                                 history.push('/list');
                                 window.location.reload();
                                
                            });
                          }
                            }}
                            >
                              Active 
                            </button>
                          ) : (
                            <button className="badge badge-sm bg-gradient-secondary" 
                             
                            onClick={() => {
                              if (window.confirm("Are you sure you want to unban this user?")) {
                              dispatch(banUseradmin(user)).then(data => { 
                                history.push('/list');
                                window.location.reload();
                                
                            });
                          }
                            }}
                            >
                              Inactive
                            </button>
                          )}
                          
                </td>

                    <td className="align-middle text-center">
                      <span className="text-secondary text-xs font-weight-bold">
                       {user.createdAt}
                      </span>
                    </td>
                    <td className="align-middle">
                    <a
                      href={`/update/${user._id}`}
                      className="text-secondary font-weight-bold text-xs"
                      data-toggle="tooltip"
                      data-original-title="Edit user"
                    >
                      Edit
                    </a>
                      <a
                        href="javascript:;"
                        className="text-secondary font-weight-bold text-xs"
                        data-toggle="tooltip"
                        data-original-title="Edit user" 
                         onClick={() => {
                          if (window.confirm("Are you sure you want to delete this user?")) {
                          dispatch(deleteUser(user)).then(data => { 
                            history.push('/list');
                            window.location.reload();
                            
                        });
                      }
                        }}
                      >
                        Delete
                      </a>
                    </td>
                  </tr>
                  );
                })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
 
    <button type="button" class="btn btn-outline-primary btn-sm mb-0" onClick={handleAddUser}>Add User</button>

  </div>
  </main>
   );
}

export default ListUsers;