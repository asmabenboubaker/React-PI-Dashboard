import { useState ,useEffect} from "react";
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { createBrowserHistory } from 'history';
import { ToastContainer, toast } from 'react-toastify';
function ListPets() {
    const [Pets, setPets] = useState([]);
   
    useEffect(() => {
        axios.get('http://127.0.0.1:3000/pet/getallpets')
          .then(response => {
            setPets(response.data);
          })
          .catch(error => {
            console.error(error);
          });
      }, []);

        // Event handler for delete button
const handleDelete = async (id) => {
    try {
      // Send DELETE request to the API endpoint
      await axios.delete(`http://127.0.0.1:3000/pet/deletepetadmin/${id}`);
   
      setPets(Pets.filter(pet => pet._id !== id));
  
      // Show a success message using a toast library or any other UI component
      toast.success(' pet deleted successfully');
    } catch (error) {
      // Handle error and show an error message
      toast.error('Failed to delete lost pet');
    }
  }
    return (
        <main className="main-content  mt-0">
            <div className="container-fluid py-4">
                <div className="row">
                    <div className="col-12">
                        <div className="card my-4">
                            <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                                <div className="bg-gradient-primary shadow-primary border-radius-lg pt-4 pb-3">
                                    <h6 className="text-white text-capitalize ps-3">List Pets</h6>
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
                                                Color
                                            </th>
                                            <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                                Breed
                                            </th>
                                            
                                            <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                                Image
                                            </th>
                                            <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                                Action
                                            </th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {Pets.map((p,i) => (
                                            <tr>
                                                <td><p className="text-xs text-secondary mb-0">{(p!==null)?p.name:''}</p></td>
                                                <td><p className="text-xs text-secondary mb-0">{(p!==null)?p.color:''}</p></td>
                                                <td><p className="text-xs text-secondary mb-0">{(p!==null)?p.breed:''}</p></td>
           
                                                <td>
                                                    {p.images.length > 0 && (
                                                        <img src={`http://127.0.0.1:3000/pet/image/${p.images[0]}`} width="200" height="200" />
                                                    )}
                                                    </td>
                                                <td><Link to={(p!==null)?'/updatePet/'+p._id:''}><i className="fa fa-refresh"/></Link></td>
                                                <td><a href="javascript:void(0)" onClick={()=>handleDelete(p._id)} ><i className="fa fa-trash"/></a></td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <ToastContainer />

                </div>

            </div>
        </main>
    );
}

export default ListPets;
