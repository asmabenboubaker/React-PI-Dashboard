import React, { useEffect, useState } from "react";
import { Form, Button } from 'react-bootstrap';
import { login, register, editProfil } from "./Services";
import { Await } from "react-router-dom";
import { NavLink, Routes, Route } from "react-router-dom";
import { useParams, useNavigate } from 'react-router-dom';

import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons'

import axios from "axios";
//import { AwesomeNotifications } from 'awesome-notifications';


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";








const schema = yup.object().shape({
    username: yup.string()
        .required()
        .matches(/^(?=.*[a-zA-Z])[a-zA-Z\d]+$/, "Username must contain at least one letter, and no spiciness")
        .max(20, "Username cannot exceed 20 characters")
        .min(3, "Username must exceed 3 characters"),


    name: yup.string()
        .required()
        .matches(/^[^\d]+$/, "name must not contain numbers")
        .max(20, "name cannot exceed 20 characters")
        .min(3, "name must exceed 3 characters"),


    email: yup.string()
        .required()
        // .matches(/^(?=.*[a-zA-Z])[a-zA-Z\d]+@(?:[a-zA-Z\d]+\.)+(?:com|tn)$/,'email must be in this form exp@exp.com ou exp@exp.tn')
        .matches(/^(?=.*[a-zA-Z])[a-zA-Z\d._]+@(?:[a-zA-Z\d]+\.)+(?:com|tn)$/, 'email must be in this form exp@exp.com ou exp@exp.tn'), // accepte . ou milieu







    location: yup.string()
        .required()
        .matches(/^[A-Z][a-zA-Z]*$/, 'location must begin with an uppercase letter and must contain only letters.')
        .max(20, "location cannot exceed 20 characters")
        .min(3, "location must exceed 3 characters"),



    phone: yup.string()
        .required()
        .matches(/^[0-9]{8}$/, 'phone field must contain 8 digits without spaces or special characters.'),



    image: yup.mixed()
        .required()
        .test('fileFormat', 'The file must be in JPEG, PNG or JPG format', (value) =>
            value && ['image/jpeg', 'image/png', 'image/jpg'].includes(value.type)
        )

});


function Profile() {

    const navigate = useNavigate();
    const param = useParams();
    const [imageSrc, setImageSrc] = useState(''); // importer image user 



    // const [user, setUser] = useState({});

    const [user, setUser] = useState({
        username: '',
        name: '',
        email: '',
        location: '',
        phone: '',
        image: null,
        password: ''

    });

    const [formErrors, setFormErrors] = useState({});
    const [formSubmitted, setFormSubmitted] = useState(false);


    useEffect(() => {

        const userFromLocalStorage = JSON.parse(localStorage.getItem('user'));

        // console.log("iduserconnecte " + userFromLocalStorage["_id"])

        setUser(userFromLocalStorage);

        // setFormData({
        //   "username": userFromLocalStorage.username,
        //   "name": userFromLocalStorage.name,
        //   "email": userFromLocalStorage.email,
        //   "location": userFromLocalStorage.location,
        //   "phone": userFromLocalStorage.phone,
        //   "image": null,
        //   "password": userFromLocalStorage.password,
        // });


        //////////importer image user 
        if (userFromLocalStorage.image) {

            axios.get(`http://localhost:3000/user/imageUser/${userFromLocalStorage._id}/image`, { responseType: 'blob' })
                .then(res => {
                    const url = URL.createObjectURL(res.data);
                    setImageSrc(url);
                    console.log("url image--->" + url)

                })
                .catch(error => {
                    console.error(error);
                });
                


        }





        //console.log("user id ---> "+ user._id)

    }, []);


    //////recuperer les nouvelles valeurs de formulaire


    function onValueChange(e) {
        setUser({ ...user, [e.target.name]: e.target.value });
        if (formSubmitted) {
            schema
                .validateAt(e.target.name, { ...user, [e.target.name]: e.target.value })
                .then(() => setFormErrors({ ...formErrors, [e.target.name]: undefined }))
                .catch((err) => setFormErrors({ ...formErrors, [e.target.name]: err.message }));
        }
    }



    const onFileHandle = e => {
        setUser({
            ...user,
            image: e.target.files[0]
        });
    };



    // const handleFileChange = e => {
    //   setFormData({
    //     ...formData,
    //     image: e.target.files[0]
    //   });
    // };


    ////// envoi de formulaire
    const handleSubmit = async e => {
        e.preventDefault();
        setFormSubmitted(true);


        try {
            await schema.validate(user, { abortEarly: false });



            const formData = new FormData();
            formData.append("username", user.username);
            formData.append("name", user.name);
            formData.append("email", user.email);
            formData.append("location", user.location);
            formData.append("phone", user.phone);
            formData.append("image", user.image);



            const res = editProfil(user._id, formData).then(
                console.log("notifey befor "),
                notify(),
                console.log("notifey after ")

            )

            console.log("--> " + JSON.stringify(res.data.user));
            localStorage.setItem("user", res.data.user);

            if (res.status === 200) {
                console.log('Updated')
                // navigate("/signin");
                // window.location.reload()

            }
        } catch (error) {
            console.log(error);
            const newErrors = {};
            error.inner.forEach((e) => (newErrors[e.path] = e.message));
            setFormErrors(newErrors);

        }


    };



    function notify() {
        toast.success(' 👤 User is Modified !', {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });


    }

















    return (<>

        <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
        <ToastContainer />


            <div className="container-fluid px-2 px-md-4">
                <div className="page-header min-height-300 border-radius-xl mt-4" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1531512073830-ba890ca4eba2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80")' }}>
                    <span className="mask  bg-gradient-primary  opacity-6" />
                </div>
                <div className="card card-body mx-3 mx-md-4 mt-n6">
                    <div className="row gx-4 mb-2">
                        <div className="col-auto">
                            <div className="avatar avatar-xl position-relative">

                                {imageSrc !== '' ? <img src={imageSrc} alt={user.name} className="w-100 border-radius-lg shadow-sm" /> :

                                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSOGcje-B89rfsytrpDJELPk1OPGA0tXLElNx837LS&s" className="w-100 border-radius-lg shadow-sm" />}



                            </div>
                        </div>
                        <div className="col-auto my-auto">
                            <div className="h-100">
                                <h5 className="mb-1">
                                    {user.username}
                                </h5>
                                <p className="mb-0 font-weight-normal text-sm">
                                    Role : {user.role}
                                </p>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 my-sm-auto ms-sm-auto me-sm-0 mx-auto mt-3">
                            <div className="nav-wrapper position-relative end-0">
                                <ul className="nav nav-pills nav-fill p-1" role="tablist">
                                    <li className="nav-item">
                                        <a className="nav-link mb-0 px-0 py-1 active " data-bs-toggle="tab" href="javascript:;" role="tab" aria-selected="true">
                                            <i className="material-icons text-lg position-relative">home</i>
                                            <span className="ms-1">App</span>
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link mb-0 px-0 py-1 " data-bs-toggle="tab" href="javascript:;" role="tab" aria-selected="false">
                                            <i className="material-icons text-lg position-relative">email</i>
                                            <span className="ms-1">Messages</span>
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link mb-0 px-0 py-1 " data-bs-toggle="tab" href="javascript:;" role="tab" aria-selected="false">
                                            <i className="material-icons text-lg position-relative">settings</i>
                                            <span className="ms-1">Settings</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="row">



                            <div className="col-12 col-xl-6">
                                <div className="card card-plain h-100">
                                    <div className="card-header pb-0 p-3">
                                        <h6 className="mb-0">INFORMATIONS DE L'UTILISATEUR</h6>
                                    </div>
                                    {/*  */}
                                    <div class="container">
                                        <div>
                                            {/* <div class="card-image">
                                                <h2 class="card-heading">
                                                    Get started
                                                    <small>Let us create your account</small>
                                                </h2>
                                            </div> */}
                                            <form class="card-form" onSubmit={handleSubmit} enctype="multipart/form-data" >

                                                <div class="input">
                                                    <input type="text" name="username" value={user.username} onChange={onValueChange} class="input-field" />
                                                    <label class="input-label">Username</label>
                                                    {formErrors.username && <p style={{ color: 'red', marginTop: '0.3rem' }}>{formErrors.username}</p>}



                                                </div>



                                                <div class="input">
                                                    <input type="text" name="name" value={user.name} onChange={onValueChange} class="input-field" />
                                                    <label class="input-label">Name</label>
                                                    {formErrors.name && <p style={{ color: 'red', marginTop: '0.3rem' }}>{formErrors.name}</p>}



                                                </div>




                                                <div class="input">
                                                    <input type="email" name="email" value={user.email} onChange={onValueChange} class="input-field" />
                                                    <label class="input-label">Email address</label>

                                                    {formErrors.email && <p style={{ color: 'red', marginTop: '0.3rem' }}>{formErrors.email}</p>}

                                                </div>

                                                <div class="input">
                                                    <input type="text" name="location" value={user.location} onChange={onValueChange} class="input-field" />
                                                    <label class="input-label">Location</label>
                                                    {formErrors.location && <p style={{ color: 'red', marginTop: '0.3rem' }}>{formErrors.location}</p>}



                                                </div>

                                                <div class="input">
                                                    <input type="text" name="phone" value={user.phone} onChange={onValueChange} class="input-field" />
                                                    <label class="input-label">Phone number</label>
                                                    {formErrors.phone && <p style={{ color: 'red', marginTop: '0.3rem' }}>{formErrors.phone}</p>}



                                                </div>





                                                <div class="input">
                                                    <input type="file" name="image" accept="image/*" onChange={onFileHandle} class="input-field" />
                                                    <label class="input-label">Image</label>
                                                    {/* {formErrors.image && <p>{formErrors.image}</p>} */}
                                                    {formErrors.image && <p style={{ color: 'red', marginTop: '0.3rem' }}>{formErrors.image}</p>}




                                                </div>



                                                <div class="action" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                                    <button type="submit" class="action-button">
                                                        <FontAwesomeIcon icon={faPencilAlt} />&nbsp;

                                                        Modifier Profile
                                                    </button>
                                                </div>




                                            </form>

                                        </div>
                                    </div>









                                    {/*  */}




                                </div>
                            </div>

                            {/*  /info user */}
                            <div className="col-12 col-xl-6 mt-5">
                                <div className="card card-plain h-100 mt-5">
                                    <div className="card-header pb-0 p-3">
                                        <div className="row">
                                            <div className="col-md-8 d-flex align-items-center">
                                                <h6 className="mb-0">Profile Information</h6>
                                            </div>
                                            {/* <div className="col-md-4 text-end">
                                                <a href="javascript:;">
                                                    <i className="fas fa-user-edit text-secondary text-sm" data-bs-toggle="tooltip" data-bs-placement="top" title="Edit Profile" />
                                                </a>
                                            </div> */}
                                        </div>
                                    </div>
                                    <div className="card-body p-3">
                                        <p className="text-sm">
                                            This is your profile page. You can see the progress you've made with your work and manage your projects or assigned tasks                                        </p>
                                        <hr className="horizontal gray-light my-4" />
                                        <ul className="list-group">
                                            <li className="list-group-item border-0 ps-0 pt-0 text-sm"><strong className="text-dark">User Name:</strong> &nbsp; {user.username}</li>
                                            <li className="list-group-item border-0 ps-0 pt-0 text-sm"><strong className="text-dark">Name:</strong> &nbsp; {user.name}</li>

                                            <li className="list-group-item border-0 ps-0 text-sm"><strong className="text-dark">Mobile:</strong> &nbsp; {user.phone}</li>
                                            <li className="list-group-item border-0 ps-0 text-sm"><strong className="text-dark">Email:</strong> &nbsp;  {user.email}</li>
                                            <li className="list-group-item border-0 ps-0 text-sm"><strong className="text-dark">Location:</strong> &nbsp; {user.location}</li>
                                            <li className="list-group-item border-0 ps-0 text-sm"><strong className="text-dark">Role :</strong> &nbsp; {user.role}</li>

                                            {/* <li className="list-group-item border-0 ps-0 pb-0">
                                                <strong className="text-dark text-sm">Social:</strong> &nbsp;
                                                <a className="btn btn-facebook btn-simple mb-0 ps-1 pe-2 py-0" href="javascript:;">
                                                    <i className="fab fa-facebook fa-lg" />
                                                </a>
                                                <a className="btn btn-twitter btn-simple mb-0 ps-1 pe-2 py-0" href="javascript:;">
                                                    <i className="fab fa-twitter fa-lg" />
                                                </a>
                                                <a className="btn btn-instagram btn-simple mb-0 ps-1 pe-2 py-0" href="javascript:;">
                                                    <i className="fab fa-instagram fa-lg" />
                                                </a>
                                            </li> */}
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            {/*  */}

                            {/* <div className="col-12 mt-4">
                                <div className="mb-5 ps-3">
                                    <h6 className="mb-1">Projects</h6>
                                    <p className="text-sm">Architects design houses</p>
                                </div>
                                <div className="row">
                                    <div className="col-xl-3 col-md-6 mb-xl-0 mb-4">
                                        <div className="card card-blog card-plain">
                                            <div className="card-header p-0 mt-n4 mx-3">
                                                <a className="d-block shadow-xl border-radius-xl">
                                                    <img src="../assets/img/home-decor-1.jpg" alt="img-blur-shadow" className="img-fluid shadow border-radius-xl" />
                                                </a>
                                            </div>
                                            <div className="card-body p-3">
                                                <p className="mb-0 text-sm">Project #2</p>
                                                <a href="javascript:;">
                                                    <h5>
                                                        Modern
                                                    </h5>
                                                </a>
                                                <p className="mb-4 text-sm">
                                                    As Uber works through a huge amount of internal management turmoil.
                                                </p>
                                                <div className="d-flex align-items-center justify-content-between">
                                                    <button type="button" className="btn btn-outline-primary btn-sm mb-0">View Project</button>
                                                    <div className="avatar-group mt-2">
                                                        <a href="javascript:;" className="avatar avatar-xs rounded-circle" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Elena Morison">
                                                            <img alt="Image placeholder" src="../assets/img/team-1.jpg" />
                                                        </a>
                                                        <a href="javascript:;" className="avatar avatar-xs rounded-circle" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Ryan Milly">
                                                            <img alt="Image placeholder" src="../assets/img/team-2.jpg" />
                                                        </a>
                                                        <a href="javascript:;" className="avatar avatar-xs rounded-circle" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Nick Daniel">
                                                            <img alt="Image placeholder" src="../assets/img/team-3.jpg" />
                                                        </a>
                                                        <a href="javascript:;" className="avatar avatar-xs rounded-circle" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Peterson">
                                                            <img alt="Image placeholder" src="../assets/img/team-4.jpg" />
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xl-3 col-md-6 mb-xl-0 mb-4">
                                        <div className="card card-blog card-plain">
                                            <div className="card-header p-0 mt-n4 mx-3">
                                                <a className="d-block shadow-xl border-radius-xl">
                                                    <img src="../assets/img/home-decor-2.jpg" alt="img-blur-shadow" className="img-fluid shadow border-radius-lg" />
                                                </a>
                                            </div>
                                            <div className="card-body p-3">
                                                <p className="mb-0 text-sm">Project #1</p>
                                                <a href="javascript:;">
                                                    <h5>
                                                        Scandinavian
                                                    </h5>
                                                </a>
                                                <p className="mb-4 text-sm">
                                                    Music is something that every person has his or her own specific opinion about.
                                                </p>
                                                <div className="d-flex align-items-center justify-content-between">
                                                    <button type="button" className="btn btn-outline-primary btn-sm mb-0">View Project</button>
                                                    <div className="avatar-group mt-2">
                                                        <a href="javascript:;" className="avatar avatar-xs rounded-circle" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Nick Daniel">
                                                            <img alt="Image placeholder" src="../assets/img/team-3.jpg" />
                                                        </a>
                                                        <a href="javascript:;" className="avatar avatar-xs rounded-circle" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Peterson">
                                                            <img alt="Image placeholder" src="../assets/img/team-4.jpg" />
                                                        </a>
                                                        <a href="javascript:;" className="avatar avatar-xs rounded-circle" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Elena Morison">
                                                            <img alt="Image placeholder" src="../assets/img/team-1.jpg" />
                                                        </a>
                                                        <a href="javascript:;" className="avatar avatar-xs rounded-circle" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Ryan Milly">
                                                            <img alt="Image placeholder" src="../assets/img/team-2.jpg" />
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xl-3 col-md-6 mb-xl-0 mb-4">
                                        <div className="card card-blog card-plain">
                                            <div className="card-header p-0 mt-n4 mx-3">
                                                <a className="d-block shadow-xl border-radius-xl">
                                                    <img src="../assets/img/home-decor-3.jpg" alt="img-blur-shadow" className="img-fluid shadow border-radius-xl" />
                                                </a>
                                            </div>
                                            <div className="card-body p-3">
                                                <p className="mb-0 text-sm">Project #3</p>
                                                <a href="javascript:;">
                                                    <h5>
                                                        Minimalist
                                                    </h5>
                                                </a>
                                                <p className="mb-4 text-sm">
                                                    Different people have different taste, and various types of music.
                                                </p>
                                                <div className="d-flex align-items-center justify-content-between">
                                                    <button type="button" className="btn btn-outline-primary btn-sm mb-0">View Project</button>
                                                    <div className="avatar-group mt-2">
                                                        <a href="javascript:;" className="avatar avatar-xs rounded-circle" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Peterson">
                                                            <img alt="Image placeholder" src="../assets/img/team-4.jpg" />
                                                        </a>
                                                        <a href="javascript:;" className="avatar avatar-xs rounded-circle" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Nick Daniel">
                                                            <img alt="Image placeholder" src="../assets/img/team-3.jpg" />
                                                        </a>
                                                        <a href="javascript:;" className="avatar avatar-xs rounded-circle" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Ryan Milly">
                                                            <img alt="Image placeholder" src="../assets/img/team-2.jpg" />
                                                        </a>
                                                        <a href="javascript:;" className="avatar avatar-xs rounded-circle" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Elena Morison">
                                                            <img alt="Image placeholder" src="../assets/img/team-1.jpg" />
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xl-3 col-md-6 mb-xl-0 mb-4">
                                        <div className="card card-blog card-plain">
                                            <div className="card-header p-0 mt-n4 mx-3">
                                                <a className="d-block shadow-xl border-radius-xl">
                                                    <img src="https://images.unsplash.com/photo-1606744824163-985d376605aa?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="img-blur-shadow" className="img-fluid shadow border-radius-xl" />
                                                </a>
                                            </div>
                                            <div className="card-body p-3">
                                                <p className="mb-0 text-sm">Project #4</p>
                                                <a href="javascript:;">
                                                    <h5>
                                                        Gothic
                                                    </h5>
                                                </a>
                                                <p className="mb-4 text-sm">
                                                    Why would anyone pick blue over pink? Pink is obviously a better color.
                                                </p>
                                                <div className="d-flex align-items-center justify-content-between">
                                                    <button type="button" className="btn btn-outline-primary btn-sm mb-0">View Project</button>
                                                    <div className="avatar-group mt-2">
                                                        <a href="javascript:;" className="avatar avatar-xs rounded-circle" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Peterson">
                                                            <img alt="Image placeholder" src="../assets/img/team-4.jpg" />
                                                        </a>
                                                        <a href="javascript:;" className="avatar avatar-xs rounded-circle" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Nick Daniel">
                                                            <img alt="Image placeholder" src="../assets/img/team-3.jpg" />
                                                        </a>
                                                        <a href="javascript:;" className="avatar avatar-xs rounded-circle" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Ryan Milly">
                                                            <img alt="Image placeholder" src="../assets/img/team-2.jpg" />
                                                        </a>
                                                        <a href="javascript:;" className="avatar avatar-xs rounded-circle" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Elena Morison">
                                                            <img alt="Image placeholder" src="../assets/img/team-1.jpg" />
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>

        </main>






    </>)
}



export default Profile;

