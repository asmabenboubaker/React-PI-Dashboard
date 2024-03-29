import { useState, useEffect } from "react";
import axios from "axios";
import './button.css'; 
import {  addAssociation  } from "./api";
import { toast } from "react-toastify"; 

function Associations() {
  const [done, setDone] = useState(0);

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
    }, [upgrades]); 


    // const upgradeUser = (up) => {
    //   console.log("USER : " + up.user);
    //   var association = {
    //     upgrade: up._id,
    //     name: up.name,
    //     user: up.user,
    //     latitude: up.latitude,
    //     longitude: up.longitude,
    //     bio: up.bio,
    //     file: up.logo,
    //     action: 0,
    //   };

    //   console.log("LOGOOOOOOOOOO : " + up.logo);
    //   setDone(1);
    //   addAssociation(association);
    //   getAllUpgrades();
    //     toast.success("Association added successfully");
    // };

    // const deleteUp = (up) => {
    //   console.log("UPGRADE : " + up._id);
    //   try {
    //     axios.delete("http://localhost:3000/user/deleteUpgrade/" + up._id);
    //   } catch (error) {
    //     console.log(error);
    //   }

    //     getAllUpgrades();
    //   toast.warning("Upgrade declined successfully");  
    // };


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
                              Logo
                            </th>
                            <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                              Verification File
                            </th>
                            <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                              ACtion
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {upgrades.map((upgrade) => (
                            <tr>
                              <td>
                                <h6 className="mb-0 text-sm">{upgrade.name}</h6>
                              </td>
                              <td>
                                <p className="text-xs font-weight-bold mb-0">
                                  {upgrade.type}
                                </p>
                              </td>

                              <td className="align-middle text-center">
                                <div>
                                  <a
                                    download={urlUp+upgrade.file}
                                    href={urlUp+upgrade.file}
                                    title="ImageName"
                                  >
                                    <img
                                      src={urlUp + upgrade.file}
                                      style={{ width: "100px" }}
                                      alt="user1"
                                    />
                                  </a>
                                </div>
                              </td>
                              <td className="align-middle text-center">
                                <div>
                                  <a
                                    download="Logo"
                                    href={urlAss + upgrade.logo}
                                    title="ImageName"
                                  >
                                    <img
                                      src={urlAss + upgrade.logo}
                                      style={{ width: "100px" }}
                                      alt="user1"
                                    />
                                  </a>
                                </div>
                              </td>

                              <td className="align-middle text-center">
                                <span className="text-secondary text-xs font-weight-bold">
                                  <button
                                    className="buttons"
                                    style={{ backgroundColor: "#1C9005" }}
                                    onClick={() => {
                                      var up = upgrade;
                                      var association = {
                                        upgrade: up._id,
                                        name: up.name,
                                        user: up.user,
                                        latitude: up.latitude,
                                        longitude: up.longitude,
                                        bio: up.bio,
                                        file: up.logo,
                                        action: 0,
                                      };

                                      console.log("LOGOOOOOOOOOO : " + up.logo);
                                      setDone(1);
                                      addAssociation(association);
                                      getAllUpgrades();
                                      toast.success(
                                        "Association added successfully"
                                      );
                                    }}
                                  >
                                    <i className="fas fa-check"></i>
                                  </button>
                                  &nbsp; &nbsp;
                                  <button
                                    className="buttons"
                                    style={{ backgroundColor: "#F52B2B" }}
                                    onClick={() => {
                                      var up = upgrade;
                                      try {
                                        axios
                                          .delete(
                                            "http://localhost:3000/user/deleteUpgrade/" +
                                              up._id
                                          )
                                          .then((response) => {
                                            getAllUpgrades();
                                            toast.warning(
                                              "Upgrade declined successfully"
                                            );
                                          });
                                      } catch (error) {
                                        console.log(error);
                                      }

                                      getAllUpgrades();
                                      toast.warning(
                                        "Upgrade declined successfully"
                                      );
                                    }}
                                  >
                                    <i className="fas fa-times"></i>
                                  </button>
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
 
          </div>
        </main>
      </>
    );
}

export default Associations;
