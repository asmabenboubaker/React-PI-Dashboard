

import React, { useEffect, useState } from "react";
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { NavLink, Routes, Route } from "react-router-dom";
import axios from "axios";
import { useDispatch } from 'react-redux';

import { getPublicationById, getNewestPubs, getOwnerPublication, getallComments, addCommentAPI, addReplytoCommentAPI, deleteCommnetApi } from "./api";
// import * as api from "./api";

import { useParams } from 'react-router-dom';

import { Modal } from 'react-bootstrap';


import moment from 'moment'; //pour la mise en forme du date 

// import AddCommnet from "./AddCommnetPopup";


import ReplyComponent from './Reply'

import CommentComponent from './Comment'




import './detalis.css';





function DetailsPublication() {



    const [showPopup, setShowPopup] = useState(false);


    const [user, setUser] = useState(null);


    const { idpub } = useParams();
    const [publication, setpublication] = useState([]);

    const [imageSrc, setImageSrc] = useState(''); // importer image user 
    const [NewestpublicationData, setNewestPublicationData] = useState([]);

    const [ownerPub, setOwnerPub] = useState([]);

    const [comments, setComments] = useState([]);

    const [replys, setReplys] = useState([]);

    const [userInfo, setUserInfo] = useState({}); // importer image user 

    const [imageUserCommnet, setImageUserCommnet] = useState(''); // importer image user 


    //comment to add
    const [commenttoadd, setCommentToAdd] = useState({
        text: '',
        publication: '',


    });


    const [IdCommnet, setIdComment] = useState('');


    //formatdate
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    //

    useEffect(() => {

        //        await getPublicationById(idpub).then((data) => {
        //                 console.log(data)
        //                 setpublication(data);
        //         })



        //Get Publication
        const PublicationDetails = async () => {
            const data = await getPublicationById(idpub)
            setpublication(data);

            if (data.image) {
                await axios.get(`http://localhost:3000/publication/imagePublication/${data._id}/image`, { responseType: 'blob' })
                    .then(res => {
                        const url = URL.createObjectURL(res.data);
                        setImageSrc(url);
                        console.log("url image--->" + url)

                    })
                    .catch(error => {
                        console.error(error);
                    });
            }

            const ownerPub = await getOwnerPublication(idpub)
            setOwnerPub(ownerPub);


            // ****************
            const listcomments = await getallComments(idpub)
            setComments(listcomments);
            console.log(listcomments)




            //********************get image user************* */

            axios.get(`http://localhost:3000/user/imageUser/${data.user}/image`, { responseType: 'blob' })
                .then(res => {
                    const url = URL.createObjectURL(res.data);
                    setImageUserCommnet(url);
                    console.log("url image--->" + url)

                })
                .catch(error => {
                    console.error(error);
                });




            //********get user info */

            await axios.get(`http://localhost:3000/user/userInfo/${data.user}/userInfo`)
                .then(res => {
                    setUserInfo(res.data);
                    console.log("userinfo--->" + res)

                })
                .catch(error => {
                    console.error(error);
                });










        };
        PublicationDetails();

        //Get NewestPublicationData

        const userFromLocalStorage = JSON.parse(localStorage.getItem('user'));
        setUser(userFromLocalStorage);
        console.log("userFromLocalStorage  - >" + userFromLocalStorage._id)












    }, []);




    const handleAddComment = async (comment) => {
        // setComments([...comments, comment]);

        //  setCommentToAdd({ ...commenttoadd,  text: comment.text}  );

        //  setCommentToAdd({ ...commenttoadd,  publication: idpub}  );

        const updatedCommentToAdd = {
            ...commenttoadd,
            text: comment.text,
            publication: idpub,
        };


        setCommentToAdd(updatedCommentToAdd);
        console.log(updatedCommentToAdd);
        setShowPopup(false);

        const userFromLocalStorage = JSON.parse(localStorage.getItem('user'));
        console.log(userFromLocalStorage);



        if (!IdCommnet) {
            const res = await addCommentAPI(userFromLocalStorage._id, updatedCommentToAdd)
            console.log("--> " + JSON.stringify(res.data.comment));
        }

        if (IdCommnet) {
            console.log("IdCommnet " + IdCommnet)

            const res = await addReplytoCommentAPI(userFromLocalStorage._id, IdCommnet, updatedCommentToAdd)
            console.log("--> " + JSON.stringify(res.data.comment));
        }









    };





    // pour la traitement des balises html

    const createMarkup = (htmlContent) => {
        return { __html: htmlContent };
    };


    const handleLinkClick = (commentId) => {
        setShowPopup(true);
        setIdComment(commentId);
    };



    //delete Commnet



    const [showDelete, setShowDelete] = useState(false);

    const handleDeleteComment = () => {
        setShowDelete(true);
    }



    async function deleteCommnet(commId) {

        await deleteCommnetApi(commId).then(
            //  alert("Commnet hes been deleteaad")

        )
    }












    // CSS styles for the no comments message
    const noCommentsStyle = {
        color: "gray",
        fontStyle: "italic",
        marginTop: "10px",
    };



    return (<>

        <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">

            <div className="container-fluid px-2 px-md-4">
                <div className="page-header min-height-300 border-radius-xl mt-4" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1531512073830-ba890ca4eba2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80")' }}>
                    <span className="mask  bg-gradient-primary  opacity-6" />
                </div>
                <div className="card card-body mx-3 mx-md-4 mt-n6">
                    <div className="row gx-4 mb-2">
                        <div className="col-auto">
                            <div className="avatar avatar-xl position-relative">
                                <img src={imageUserCommnet} alt="profile_image" className="w-100 border-radius-lg shadow-sm" />
                            </div>
                        </div>
                        <div className="col-auto my-auto">
                            <div className="h-100">
                                <h5 className="mb-1">
                                    {ownerPub.name}
                                </h5>
                                <p className="mb-0 font-weight-normal text-sm">
                                    Role :  {ownerPub.role}
                                </p>
                            </div>
                        </div>

                    </div>







                    <div className="row">
                        <div class="col-1 align-self-start">
                        </div>


                        <div className="col">
                            <div className="row">

                                {/* -------------------------------------------------------- */}
                                <div className="col-12 mt-4">
                                    <div className="mb-5 ps-3">
                                        <h6 className="mb-1">Category : {publication.category}</h6>
                                        <p className="text-sm">{moment(publication.createdAt).format('DD MMMM, YYYY [At] hh.mm')}</p>
                                    </div>


                                    <div className="row">

                                        <div className="col-xl-10 col-md-6 mb-xl-0 mb-4">
                                            <div className="card card-blog card-plain">
                                                <div className="card-header p-0 mt-n4 mx-3">
                                                    <a className="d-block shadow-xl border-radius-xl">
                                                        <img src={imageSrc} alt="img-blur-shadow" className="img-fluid shadow border-radius-xl imagedetals" />

                                                    </a>
                                                </div>


                                                <div className="card-body p-3">
                                                    {/* <p className="mb-0 text-sm">Project #2</p> */}
                                                    <a href="javascript:;">
                                                        <h5>
                                                            {publication.titre}
                                                        </h5>
                                                    </a>
                                                    <p className="mb-4 text-sm" dangerouslySetInnerHTML={createMarkup(publication.description)}>

                                                    </p>
                                                    {/* <div className="d-flex align-items-center justify-content-between">
                                                        <button type="button" className="btn btn-outline-primary btn-sm mb-0">View Project</button>
                                                        <div className="avatar-group mt-2">
                                                            <a href="javascript:;" className="avatar avatar-xs rounded-circle" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Nick Daniel">
                                                                <img alt="Image placeholder" src="../assets/img/team-3.jpg" />
                                                            </a>
                                                            <a href="javascript:;" className="avatar avatar-xs rounded-circle" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Peterson">
                                                                <img alt="Image placeholder" src="../assets/img/team-4.jpg" />
                                                            </a>
                                                        </div>
                                                    </div> */}

                                                    {/* ------------------- */}


                                                    <div className="col-12 col-xl-6">
                                                        <div className="card card-plain h-100">
                                                            <div className="card-header pb-0 p-3">
                                                                <h6 className="mb-0">Conversations</h6>
                                                            </div>

                                                            <div className="card-body p-3">




                                                                {/* ---------Comments--------------- */}
                                                                {comments.length > 0 ? (
                                                                    // Render the comments 
                                                                    comments.map((comment) => (
                                                                        <ul className="list-group">

                                      


                                                                        <CommentComponent commId = { comment._id } />


                                                                        {/*  */ }
                                                           






                                                            {/*  */}












                                                            {comment.replies.map(replyId => (
                                                                <li key={replyId} className="list-group-item border-0 d-flex align-items-center px-0 mb-2 ms-conv pt-0">
                                                                    <ReplyComponent replyId={replyId} />
                                                                </li>
                                                            ))}
                                                        </ul>
                                                        ))
                                                        ) : (
                                                        // Render a message if there are no comments

                                                        <p style={noCommentsStyle}>No comments yet.</p>

                                                                )}



                                                        {/* ---------//Comments--------------- */}




                                                    </div>
                                                </div>
                                            </div>





                                            {/* ------------------- */}



                                        </div>
                                    </div>
                                </div>


                            </div>
                        </div>
                    </div>
                </div>





                {/* <div class="col-2 align-self-end">
                            </div> */}


            </div>



            {/*center  */}
        </div>
    </div >
        </main >
    </>)

}

export default DetailsPublication;
