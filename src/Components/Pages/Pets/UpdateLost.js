
import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { createBrowserHistory } from 'history';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from "react-router-dom";
import axios from "axios";
function UpdateLost() {
    const history = createBrowserHistory();
  
    const [color, setColor] = useState("");
    const [type, setType] = useState("");
    const [location, setLocation] = useState("");
    const [breed, setBreed] = useState("");
    const [image, setImage] = useState([]);
    const [description, setDescription] = useState("");
    const userFromLocalStorageString = localStorage.getItem('user');
    const user = userFromLocalStorageString ? JSON.parse(userFromLocalStorageString) : null;
    const [lostPets, setLostPets] = useState([]);
   
  const { id } = useParams();
    //get lost and found pets by user
    useEffect(() => {
     
        console.log(user);
        axios.post('http://127.0.0.1:3000/pet/getAllLostAndFounduser', { user })
          .then(response => {
            setLostPets(response.data);
            console.log(lostPets);
            // Set form fields with data of the lost post to update
                const lostPost = response.data.find(pet => pet._id === String(id));
                if (lostPost) {
                setColor(lostPost.color);
                setType(lostPost.type);
                setLocation(lostPost.location);
                setDescription(lostPost.description);
                setBreed(lostPost.breed);
                }
          })
          .catch(error => {
            console.error(error);
          });
      }, []);
      const imageName = lostPets.image;
   
    const handleImageChange = (event) => {

        const file = event.target.files[0];
    setImage(file);

    };
    const handleTypeChange = (e) => {
        console.log(e.target.value);
        setType(e.target.value);
    };
    const handlelocationChange = (e) => {
        console.log(e.target.value);
        setLocation(e.target.value);
    };
    // 
   
// Event handler for form submission
const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send PUT request to the API endpoint
      await axios.put(`http://127.0.0.1:3000/pet/updatelost/${id}`, {
        color,
        type,
        location,
        description,
        image,
        breed
      }).then(data=>{
        toast.success('post updated successfully');
      history.push('/listlost');
      window.location.reload();
      });

      // Show success message or perform other UI updates
      
    } catch (error) {
      // Handle error and show error message
      toast.success('failed to update post');
    }
  }

    return (
        <main className="main-content  mt-0">
        <div className="container-fluid py-4">
   <div class="card card-plain">
   <div class="card-header">
     <h4 class="font-weight-bolder">Update Post</h4>
     <p class="mb-0"></p>
   </div>
                               
                                <div class="card-body" >
                                <form onSubmit={handleSubmit}>
                                    <div className="row">
 


                                        <div className="col-12">
                                            <div className="form-inner">
                                                <label class="form-label">Type of operation</label>
                                                <div class="input-group input-group-outline mb-3">
                                                <select id="type" name="type" value={type} onChange={handleTypeChange} class="form-control">
                                                    <option value="">Select a type</option>
                                                    <option value="lost">Lost</option>
                                                    <option value="found">Found</option>
                                                </select>
                                                </div>
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
                                                <label class="form-label">Breed </label>
                                                <div class="input-group input-group-outline mb-3">
                                                <input type="text" name="color" placeholder="color pet " class="form-control"

                                                    value={breed}
                                                    onChange={
                                                        (event) => {
                                                            setBreed(event.target.value);
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
                                                <div className="form-inner">
                                                <div class="input-group input-group-outline mb-3">

                                                    <textarea name="description" placeholder="Order Notes (Optional)" rows="6" class="form-control"

                                                        value={description}
                                                        onChange={
                                                            (event) => {

                                                                setDescription(event.target.value);
                                                            }
                                                        }
                                                    ></textarea>
                                                    </div>
                                                </div>                                            </div>
                                        </div>


                                    </div>
                                    
                                    <div className="place-order-btn">
                                       <button type="submit"  class="btn btn-lg bg-gradient-primary btn-lg w-100 mt-4 mb-0">Update Post</button>
                                   </div>
                                </form>
                                </div>
                            </div>

                        </div>
                        <ToastContainer />

                    
        </main>
    );
}

export default UpdateLost;