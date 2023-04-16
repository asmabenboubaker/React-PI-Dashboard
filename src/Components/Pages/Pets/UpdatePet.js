import { useState ,useEffect} from "react";
import { createBrowserHistory } from 'history';
import { useParams } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function UpdatePet() {
   
  const [color, setColor] = useState("");
  const [images, setImages] = useState("");
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [type, setType] = useState("");
  const [breed, setBreed] = useState("");
  const [Pets, setPets] = useState([]);
  const { id } = useParams();
  const history = createBrowserHistory();
  
  const handleImageChange = (event) => {
    const files = event.target.files;
    const urls = [];
    
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            urls.push(reader.result);
            if (urls.length === files.length) {
              setImage(urls);
            }
        };
    }

    document.getElementById('chose').setAttribute('hidden', true);
    setImages([
        ...images,
        ...event.target.files
    ]);
   
};
  useEffect(() => {
    axios.get('http://127.0.0.1:3000/pet/getallpets')
      .then(response => {
        setPets(response.data);
        console.log(Pets);
        // Set form fields with data of the lost post to update
            const lostPost = response.data.find(pet => pet._id === String(id));
            if (lostPost) {
            setColor(lostPost.color);
            setType(lostPost.type);
            setBreed(lostPost.breed);
            setName(lostPost.name);
            }
      })
      .catch(error => {
        console.error(error);
      });
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send PUT request to the API endpoint
      await axios.put(`http://127.0.0.1:3000/pet/updatepet/${id}`, {
        color,
        type,
        breed,
        name
      });

      // Show success message or perform other UI updates
      toast.success('post updated successfully');
      history.push('/listpet');
      window.location.reload();
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
      <h4 class="font-weight-bolder">Update pet</h4>
      <p class="mb-0"></p>
    </div>
    <div class="card-body"  onSubmit={handleSubmit}>
      <form role="form" >
      <label class="form-label">name</label>
      <div class="input-group input-group-outline mb-3">
          
          <input type="text" class="form-control"
          value={name}
          onChange={(event) => {
            setName(event.target.value);
          }}
          />
        </div>
        <label class="form-label">breed</label>
        <div class="input-group input-group-outline mb-3">
         
          <input type="text" class="form-control" 
          value={breed}
           onChange={(event) => {
            setBreed(event.target.value);
          }}
          />
        </div>
         <label class="form-label">color</label>
        <div class="input-group input-group-outline mb-3">
         
          <input type="text" class="form-control"
            value={color}
            onChange={(event) => setColor(event.target.value)}
          
          />
        </div>


        <div class="text-center">
          <button type="submit" class="btn btn-lg bg-gradient-primary btn-lg w-100 mt-4 mb-0">Update</button>
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

export default UpdatePet;
