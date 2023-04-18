import React, { useEffect, useState } from "react";
import { Form, Button } from 'react-bootstrap';
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



import { getallPublication, getallPublicationByIdUser, filterOptAPI } from './api'


import PublicationComponent from "./PublicationComponent";



import { Link } from 'react-router-dom';


function ListPublications() {


    const [titre, setTitle] = useState('');
    const [category, setCategory] = useState('');

    const [vote, setVote] = useState('');






    const [user, setUser] = useState(null);


    const [publicationData, setPublicationData] = useState([]);

    const [NewestpublicationData, setNewestPublicationData] = useState([]);


    const [isclickedPubUser, setisclickedPubUser] = useState(false);




    // pagination

    const [currentPage, setCurrentPage] = useState(1);

    const recordsPerPage = 4;

    const lastIndex = currentPage * recordsPerPage

    const firstIndex = lastIndex - recordsPerPage


    const records = publicationData.slice(firstIndex, lastIndex)


    const npage = Math.ceil(publicationData.length / recordsPerPage)

    console.log("mes data --->" + publicationData)

    const numbres = [...Array(npage + 1).keys()].slice(1)

    // 
    const [imageSrc, setImageSrc] = useState([]); // importer image user 



    useEffect(() => {

        const userFromLocalStorage = JSON.parse(localStorage.getItem('user'));
        setUser(userFromLocalStorage);
        console.log("userFromLocalStorage  - >" + userFromLocalStorage._id)


        //Get Publication
        const fetchPublicationData = async () => {



            // const data = await getallPublication(userFromLocalStorage._id)
            // setPublicationData(data);




            if (isclickedPubUser) {
                const pubUser = await getallPublicationByIdUser(userFromLocalStorage._id)
                setPublicationData(pubUser);

                console.log("userIduserIduserId " + userFromLocalStorage._id)
            }
            else {
                const pubUser = await getallPublication(userFromLocalStorage._id)
                setPublicationData(pubUser);

                console.log("userIdgetallPublication " + userFromLocalStorage._id)


            }


        };
        fetchPublicationData();


    }, []);





    const handleChange = async (event) => {

        const { name, value } = event.target;
        if (name === 'titre') {
            setTitle(value);



        } else if (name === 'category') {
            setCategory(value);


        }

        else if (name === 'vote') {
            setVote(value);
        }






        // 




        // 



    };





    const handlesubmit = async () => {
        const pubFiltre = await filterOptAPI(titre, category, vote)
        setPublicationData(pubFiltre);

    }













    // pour la traitement des balises html

    const createMarkup = (htmlContent) => {
        return { __html: htmlContent };
    };



    return (<>

        <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">


            <div className="container-fluid py-4">


                {/* ----------------------- */}

                <div className="row">
                    <div className="col-12">
                        <div className="card my-4" style={{ paddingTop: "55px",backgroundColor : "#f8f9fa"}}>
                            <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2" style={{backgroundColor : "#f8f9fa"}}>
                                {/* <div className="bg-gradient-primary shadow-primary border-radius-lg pt-4 pb-3"> */}




                                <div className="ms-md-auto pe-md-3 d-flex align-items-center" style={{ marginBottom: "30px" }}>



                                    <div className="input-group input-group-outline" style={{ marginRight: "20px" }}>
                                        <label className="form-label" >Filter by title...</label>
                                        <input type="text"  className="form-control" name="titre" value={titre} onChange={handleChange} />
                                    </div>



                                    <div className="input-group input-group-outline" style={{ marginRight: "20px" }}>

                                        <select type="text" className="form-control" name="category" value={category} onChange={handleChange}>

                                            <option value="">Filter by your category...</option>
                                            <option value="Pet Grooming">Pet Grooming</option>
                                            <option value="Medical Care">Medical Care</option>
                                            <option value="Pet Bording">Pet Bording</option>
                                            <option value="Pet Daycare">Pet Daycare</option>
                                            <option value="Pet Walking">Pet Walking</option>
                                            <option value="Education Pet">Education Pet</option>
                                        </select>

                                    </div>



                                    <div className="input-group input-group-outline" style={{ marginRight: "20px" }}>
                                        <select type="text" className="form-control" name="vote" value={vote} onChange={handleChange}>

                                            <option value="">filter by vote...</option>
                                            <option value="up">vote Up Greater-than  vote Down </option>
                                            <option value="down">vote Up  little-than vote Down </option>

                                        </select>

                                    </div>







                                    <div className="col-auto">
                                        <button type="submit" onClick={handlesubmit} className="btn btn-primary mb-2">
                                       

                                        <i class="fas fa-search fa-lg"></i>
                                            
                                            
                                            
                                            &nbsp; &nbsp; search</button>
                                    </div>

                                </div>


                                {/* </div> */}
                            </div>
                        </div>
                    </div>
                </div>


                {/* -------------------------------------------- */}

                {/*  */}




                {/*  */}

                <div className="row">
                    <div className="col-12">
                        <div className="card my-4">
                            <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                                <div className="bg-gradient-primary shadow-primary border-radius-lg pt-4 pb-3">
                                    <h6 className="text-white text-capitalize ps-3">Liste of Posts</h6>
                                    {/*  */}

                                    {/*  */}

                                </div>
                            </div>
                            <div className="card-body px-0 pb-2">
                                <div className="table-responsive p-0">
                                    <table className="table align-items-center mb-0">
                                        <thead>
                                            <tr>
                                                <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Title</th>
                                                <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Description</th>
                                                <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Category</th>

                                                <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Created at</th>
                                                <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Block</th>
                                                <th className="text-secondary text-uppercase text-xxs  opacity-46" >Actions</th>
                                            </tr>
                                        </thead>


                                        {records.map((mypublication) => (
                                            <PublicationComponent publication={mypublication} />


                                        ))}




                                    </table>
                                </div>
                            </div>

                            {/*  */}


                            <div className="row">
                                <div className="col-lg-12 d-flex justify-content-center">
                                    <div className="paginations-area">
                                        <nav aria-label="Page navigation example">

                                            <ul className="pagination">
                                                <li className="page-item">
                                                    <a className="page-link"
                                                        onClick={prePage}>

                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left-short" viewBox="0 0 16 16">
                                                            <path fill-rule="evenodd" d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z" />
                                                        </svg>






                                                    </a>

                                                </li>

                                                {

                                                    numbres.map((n, i) => (
                                                        <li className={`page-item ${currentPage === n ? `active` : ``}   `} key={i}     >

                                                            <a className="page-link"

                                                                onClick={() => changeCPage(n)}>{n}</a>

                                                        </li>




                                                    ))

                                                }

                                                <li className="page-item">
                                                    <a className="page-link"
                                                        onClick={nextPage}>

                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right-short" viewBox="0 0 16 16">
                                                            <path fill-rule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z" />
                                                        </svg>

                                                    </a>

                                                </li>
                                            </ul>
                                        </nav>
                                    </div>
                                </div>
                            </div>






                            {/*  */}






                        </div>
                    </div>
                </div>
            </div>



        </main>


    </>)





    // pagination
    function prePage() {
        if (currentPage !== 1) {
            setCurrentPage(currentPage - 1)
        }
    }
    function changeCPage(id) {
        setCurrentPage(id)
    }
    function nextPage() {
        if (currentPage != npage) {
            setCurrentPage(currentPage + 1)
        }
    }
    // 


}



export default ListPublications;




