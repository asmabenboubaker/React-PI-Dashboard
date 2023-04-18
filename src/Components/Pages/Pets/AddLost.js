
import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { createBrowserHistory } from 'history';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
 
import axios from "axios";
function Addlostorfound() {
    const history = createBrowserHistory();
    const dispatch = useDispatch();

    const [color, setColor] = useState("");
    const [type, setType] = useState("");
    const [location, setLocation] = useState("");
    const [image, setImage] = useState([]);
    const [description, setDescription] = useState("");
    const userFromLocalStorageString = localStorage.getItem('user');
    const user = userFromLocalStorageString ? JSON.parse(userFromLocalStorageString) : null;
    const [lostPets, setLostPets] = useState([]);
  // Event handler for delete button
const handleDelete = async (id) => {
    try {
      // Send DELETE request to the API endpoint
      await axios.delete(`http://127.0.0.1:3000/pet/deletelostbuid/${id}`);
   
      setLostPets(lostPets.filter(pet => pet._id !== id));
  
      // Show a success message using a toast library or any other UI component
      toast.success('Lost pet deleted successfully');
    } catch (error) {
      // Handle error and show an error message
      toast.error('Failed to delete lost pet');
    }
  }
    //get lost and found pets by user
    useEffect(() => {
     
        axios.post('http://127.0.0.1:3000/pet/getAllLostAndFounduser', { user })
          .then(response => {
            setLostPets(response.data);
            console.log(lostPets);
            
          })
          .catch(error => {
            console.error(error);
          });
      }, []);
      const imageName = lostPets.image;
   
    const handleImageChange = (event) => {

        setImage([
            ...image,
            ...event.target.files
        ]);

    };
    const handleTypeChange = (e) => {
        console.log(e.target.value);
        setType(e.target.value);
    };
    const handlelocationChange = (e) => {
        console.log(e.target.value);
        setLocation(e.target.value);
    };
    const handleSubmit = async (event) => {

        console.log(user)
        event.preventDefault();

        const formData = new FormData();
        formData.append("description", description);
        formData.append("location", location);
        formData.append("color", color);
        formData.append("type", type);
        formData.append("user", JSON.stringify(user));
        for (let i = 0; i < image.length; i++) {
            formData.append("image", image[i]);
        }
        toast.success('Please wait ...');
        const url = 'http://127.0.0.1:3000/pet/addlost'
        axios.post(url, formData).then(data => {
            
            history.push('/listlost');
            window.location.reload();
        }).catch(error => {
            console.error(error);
        });
    };


    return (
        <main className="main-content  mt-0">
        <div className="container-fluid py-4">
   <div class="card card-plain">
   <div class="card-header">
     <h4 class="font-weight-bolder">Add Post</h4>
     <p class="mb-0"></p>
   </div>
   <div class="card-body" >
      <form onSubmit={handleSubmit}>
                                   <div className="row">
                                       <div className="col-12">
                                       <label class="form-label">Type of operation</label>
                                       <div class="input-group input-group-outline mb-3">
                                            
                                              
                                               <select id="type" name="type" value={type} onChange={handleTypeChange} class="form-control">
                                                   <option value="">Select a type</option>
                                                   <option value="lost">Lost</option>
                                                   <option value="found">Found</option>
                                               </select>
                                           </div>
                                       </div>

                                        
                                       <div className="col-12">
                                           <div className="form-inner">
                                               <label class="form-label">Images</label>
                                               <div class="input-group input-group-outline mb-3">
                                            
                                               <input type="file" name="image" id="file-input" class="form-control"
                                                   onChange={handleImageChange}
                                               />

                                            </div>
                                           </div>
                                       </div>
                                       <div className="col-12">
                                           <div className="form-inner">
                                               <label class="form-label">Color </label>
                                               <div class="input-group input-group-outline mb-3">
                                            
                                               <input type="text" name="color" placeholder="color pet " class="form-control"

                                                   value={color}
                                                   onChange={
                                                       (event) => {
                                                           setColor(event.target.value);
                                                       }
                                                   }
                                               />
                                           </div>
                                           </div>
                                       </div>
                                       <div className="col-12">
                                           <div className="form-inner">
                                               <label class="form-label">Street Address</label>
                                               <div class="input-group input-group-outline mb-3">
                                            
                                               <select  name="location" value={location} onChange={handlelocationChange} class="form-control">
                                                   <option value="">Town / City</option>
                                                   <option value="Tunis">Tunis</option>
                                                   <option value="Sfax">Sfax</option>
                                                   <option value="Sousse">Sousse</option>
                                                   <option value="Gabes">Gabes</option>
                                                   <option value="Bizerte">Bizerte</option>
                                                   <option value="Ariana">Ariana</option>
                                                   <option value="Ben Arous">Ben Arous</option>
                                                   <option value="Nabeul">Nabeul</option>
                                                   <option value="Monastir">Monastir</option>
                                                   <option value="Mahdia">Mahdia</option>
                                                   <option value="Kairouan">Kairouan</option>
                                                   <option value="Tozeur">Tozeur</option>
                                                   <option value="Kasserine">Kasserine</option>
                                                   <option value="Gafsa">Gafsa</option>
                                                   <option value="Tataouine">Tataouine</option>
                                                   <option value="Zaghouan">Zaghouan</option>
                                                   <option value="Kebili">Kebili</option>
                                                   <option value="Jendouba">Jendouba</option>
                                                   <option value="Siliana">Siliana</option>
                                                   <option value="Beja">Beja</option>
                                                   <option value="Kef">Kef</option>
                                                   <option value="Sidi Bouzid">Sidi Bouzid</option>
                                                   <option value="Medenine">Medenine</option>
                                                   <option value="Gassrine">Gassrine</option>
                                                   <option value="Manouba">Manouba</option>
                                               </select>
                                            </div>
                                           </div>
                                       </div>


                                       <div className="col-12">
                                           <div className="form-inner">
                                               <label class="form-label">Additional Information</label>
                                               <div class="input-group input-group-outline mb-3">
                                            
                                                   <textarea name="description" placeholder="Order Notes (Optional)" rows="6" class="form-control"

                                                       value={description}
                                                       onChange={
                                                           (event) => {

                                                               setDescription(event.target.value);
                                                           }
                                                       }
                                                   ></textarea>
                                               </div>  </div>
                                       </div>


                                   </div>
                                   <div className="place-order-btn">
                                       <button type="submit"  class="btn btn-lg bg-gradient-primary btn-lg w-100 mt-4 mb-0">Add Post</button>
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

export default Addlostorfound;