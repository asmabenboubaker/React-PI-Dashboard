

import React, { useEffect, useState } from "react";
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { NavLink, Routes, Route } from "react-router-dom";
import axios from "axios";
import { useDispatch } from 'react-redux';

import { getallPublication, getNewestPubs, deletePublication, BloquerPublication, ActiverPublication } from "./api";
import { Link } from 'react-router-dom';


// import nodemailer from 'nodemailer';

import Mailer from 'react-mailer';

import { Modal } from 'react-bootstrap';

// import 'bootstrap/dist/css/bootstrap.min.css';


import StatistiquesPub from './StatistiquesPub'


function PublicationComponent({ publication }) {


    const [showPopup, setShowPopup] = useState(false);




    const [user, setUser] = useState(null);
    const [imageSrcPub, setImageSrcPub] = useState([]); // importer image user 


    const [userInfo, setUserInfo] = useState({}); // importer user proprietaire de la publication



    useEffect(() => {

        const userFromLocalStorage = JSON.parse(localStorage.getItem('user'));
        setUser(userFromLocalStorage);
        console.log("userFromLocalStorage  - >" + userFromLocalStorage._id)


        getImage(publication._id)




        //********get user info */

        axios.get(`http://localhost:3000/user/userInfo/${publication.user}/userInfo`)
            .then(res => {
                setUserInfo(res.data);
                console.log("userinfo--->" + res)

            })
            .catch(error => {
                console.error(error);
            });



















        //Get Publication
        // const fetchPublicationData = async () => {
        //     const data = await getallPublication(userFromLocalStorage._id)
        //     setPublicationData(data);

        //     data.map(async (publication) => (
        //         await getImage(publication._id),
        //         console.log("publication._id" + publication._id)
        //     ))

        // };
        // fetchPublicationData();





    }, [publication._id]);



    async function getImage(publicationId) {
        await axios.get(`http://localhost:3000/publication/imagePublication/${publicationId}/image`, { responseType: 'blob' })
            .then(res => {
                const url = URL.createObjectURL(res.data);
                // setImageSrc(url);
                setImageSrcPub(url);
                console.log("url image pub--->" + url)

            })
            .catch(error => {
                console.error(error);
            });

    }


    async function deletePub(pubId) {

        await deletePublication(pubId).then(
            // alert("dpub hes been deleteaad")

        )
    }


    async function BlockerPub(pubId) {


        await BloquerPublication(pubId).then(
            // alert("pub has been blocked"),



        )
    }


    async function ActiverPub(pubId) {

        await ActiverPublication(pubId).then(
            // alert("pub has been activated")

        )
    }




    const [afficherPopup, setAfficherPopup] = useState(false);

    const handleClickStat = () => {
        setAfficherPopup(true);
    }

    const handleCloseStat = () => {
        setAfficherPopup(false);
    }












    const createMarkup = (htmlContent) => {
        return { __html: htmlContent };
    };





    /////////////for block post

    const [show, setShow] = useState(false);
    const handleClick = () => {
        setShow(true);
    }


    /////////////for delete post
    const [showDelete, setShowDelete] = useState(false);

    const handleClickDelete = () => {
        setShowDelete(true);
    }







    return (<>


        <tbody>
            <tr>
                <td>
                    <div className="d-flex px-2 py-1">
                        <div>
                            <img src={imageSrcPub} className="avatar avatar-sm me-3 border-radius-lg" alt="user1" />

                        </div>
                        <div className="d-flex flex-column justify-content-center">
                            <h6 className="mb-0 text-sm">{publication.titre}</h6>
                            <p className="text-xs text-secondary mb-0">{userInfo.name}</p>
                        </div>
                    </div>
                </td>

                <td>
                    {/* <p className="text-xs font-weight-bold mb-0">Manager</p> */}
                    {/* <p >Organization</p> */}
                    <p className="text-secondary text-sm font-weight-bold" dangerouslySetInnerHTML={createMarkup(publication.description.substring(0, 10) + '...')}></p>
                </td>

                <td>
                    {/* <p className="text-xs font-weight-bold mb-0">Manager</p> */}
                    {/* <p >Organization</p> */}
                    <p className="text-secondary text-sm font-weight-bold">{publication.category}</p>
                </td>

                <td className="align-middle text-center">
                    <span className="text-secondary text-xs font-weight-bold">{new Date(publication.createdAt).toLocaleString()}</span>
                </td>

                <td className="align-middle text-center text-sm">


                    {publication.isBlocked == false ? (
                        <button className="badge badge-sm bg-gradient-success" style={{ border: 'none' }}


                            onClick={handleClick}





                        ><i class='fas fa-unlock fa-lg'></i>&nbsp;&nbsp;Active
                        </button>



                    ) : (

                        <button className="badge badge-sm bg-gradient-danger" style={{ border: 'none' }}

                            onClick={() => {







                                // if (window.confirm("Are you sure you want to unblock this publication?")) {
                                ActiverPub(publication._id).then(() => {
                                    // history.push('/list');
                                    window.location.reload();

                                });
                                // }










                            }}



                        > <i class='fas fa-lock fa-lg'></i>
                            &nbsp;  &nbsp;Blocked
                        </button>


                    )}

                    {/* pour bloques une publication */}

                    <Modal show={show} onHide={() => setShow(false)}>
                        <Modal.Header closeButton>
                            <Modal.Title>block post</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>Are you sure to block this post?</Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => setShow(false)}>
                                No
                            </Button>
                            <Button variant="primary" onClick={() => {
                                // Code à exécuter lorsque l'utilisateur clique sur le bouton "Save changes"
                                BlockerPub(publication._id).then(() => {
                                    // history.push('/list');
                                    window.location.reload();

                                });
                                // ...
                                setShow(false);
                            }}>
                                Yes
                            </Button>
                        </Modal.Footer>
                    </Modal>




                </td>
                <td className="align-middle">
                    {/* <a href="javascript:;" className="text-secondary font-weight-bold text-xs" data-toggle="tooltip" data-original-title="Edit user">
                        delete
                    </a> */}
                    <button className="btn bg-light btn-rounded" style={{ marginRight: '15px' }}

                        onClick={handleClickDelete}






                    >
                         <i style={{ color: 'red' }} class="fa fa-trash" aria-hidden="true"></i> 

                    </button>



                    {/* pour supprimer une publication */}

                    <Modal show={showDelete} onHide={() => setShowDelete(false)}>
                        <Modal.Header closeButton>
                            <Modal.Title>Delete post</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>Are you sure to Delete this post?</Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => setShowDelete(false)}>
                                No
                            </Button>
                            <Button variant="primary" onClick={() => {
                                // Code à exécuter lorsque l'utilisateur clique sur le bouton "Save changes"
                                deletePub(publication._id).then(() => {
                                    // history.push('/list');
                                    window.location.reload();

                                });
                                // ...
                                setShowDelete(false);
                            }}>
                                Yes
                            </Button>
                        </Modal.Footer>
                    </Modal>
















                    <Link to={`/DetailsPublication/${publication._id}`} style={{ marginRight: '15px' }}>
                        <button className="btn bg-light btn-rounded" style={{ color: '#1A73E8' }} >
                            <i class="fas fa-edit"></i>
                        </button>
                    </Link>




           


                    
                      

                   

                        <button onClick={() => setShowPopup(true)} type="button"className="btn bg-light btn-rounded" style={{ color: '#66BB6A' }}>
                            <i class="fas fa-vote-yea"></i>

                        </button>


                        {showPopup && <StatistiquesPub   idpub={publication._id}    isOpen='showPopup' onClose={() => setShowPopup(false)} />}

                    









                </td>
            </tr>

        </tbody>
        <script src="https://smtpjs.com/v3/smtp.js">
        </script>


    </>)




}

export default PublicationComponent;

