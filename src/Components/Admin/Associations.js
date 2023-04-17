import { useState, useEffect } from "react";
import axios from "axios";

function Associations() {

    const [upgrades, setUpgrades] = useState([]);
    const [up, setUp] = useState({}); 
    
    const urlUp = "http://localhost:3000/upgrades/";
    const urlAss = "http://localhost:3000/associations/"; 

    const getAllUpgrades = () => {
      try {
        axios.get(`http://localhost:3000/user/AllUpgrades`).then((response) => {
          setUpgrades(response.data);
          setUp(response.data[0]);
        });
      } catch (err) {
        console.log(err);
      }
    };

    useEffect(() => {
      getAllUpgrades();
    }, []); 

    return (
    <>
      <main className="main-content  mt-0">
        <div className="container-fluid py-4">
          <div className="row">
            <div className="col-12">
              <div className="card my-4">
                <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                  <div className="bg-gradient-primary shadow-primary border-radius-lg pt-4 pb-3">
                    <h6 className="text-white text-capitalize ps-3">
                      Users Submissions
                    </h6>
                  </div>
                </div>
                <div className="card-body px-0 pb-2">
                  <div className="table-responsive p-0">
                    <table className="table align-items-center mb-0">
                      <thead>
                        <tr>
                          <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                            Name
                          </th>
                          <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                            Type
                          </th>
                          <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                            Action
                          </th>
                          <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                            Verification File
                          </th>
                          <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                            Logo
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {upgrades.map((upgrade) => (
                            <tr>
                                <td>
                                    <div className="d-flex px-2 py-1">
                                        <div>
                                            <img
                                                src={upgrade.logo}
                                                className="avatar avatar-sm me-3"
                                                alt="user1"
                                            />
                                        </div>
                                        <div className="d-flex flex-column justify-content-center">
                                            <h6 className="mb-0 text-sm">
                                                {upgrade.name}
                                            </h6>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <p className="text-xs font-weight-bold mb-0">
                                        {upgrade.type}
                                    </p>
                                </td>
                                <td className="align-middle text-center">
                                    <span className="text-secondary text-xs font-weight-bold">
                                        {upgrade.action}
                                    </span>
                                </td>
                                <td className="align-middle text-center">
                                    <span className="text-secondary text-xs font-weight-bold">
                                        {upgrade.verificationFile}
                                    </span>
                                </td>
                                <td className="align-middle text-center">
                                    <span className="text-secondary text-xs font-weight-bold">
                                        {upgrade.logo}
                                    </span>
                                </td>
                            </tr>
                        ))}
                                                
                                                


                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <button type="button" class="btn btn-outline-primary btn-sm mb-0">
            Add User
          </button>
        </div>
      </main>
    </>
  );
}

export default Associations;
