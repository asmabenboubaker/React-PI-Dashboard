import React, { useEffect, useState } from "react";

import axios from "axios";

import {deleteCommnetApi, getCommnetbyId} from "./api";
import moment from 'moment'; //pour la mise en forme du date 

// import './detailsPublication.css';
import { Modal, Button } from 'react-bootstrap';






function CommentComponent({ commId }) {




    const [replyContent, setReplyContent] = useState({});

    const [imageSrc, setImageSrc] = useState(''); // importer image user 
  
  
    const [userInfo, setUserInfo] = useState({}); // importer image user 
  



    useEffect(() => {

        getCommnetbyId(commId)
          .then(async data => {
            setReplyContent(data);
    
    
    
    
            //********get user info */
    
            await axios.get(`http://localhost:3000/user/userInfo/${data.user}/userInfo`)
              .then(res => {
                setUserInfo(res.data);
                console.log("userinfo--->" + res)
    
              })
              .catch(error => {
                console.error(error);
              });
    
            //********get user image */
    
    
            axios.get(`http://localhost:3000/user/imageUser/${data.user}/image`, { responseType: 'blob' })
              .then(res => {
                const url = URL.createObjectURL(res.data);
                setImageSrc(url);
                console.log("url image--->" + url)
    
              })
              .catch(error => {
                console.error(error);
              });
    
    
    
    
    
    
          })
          .catch(error => console.log(error));
    
    
    
    
    
    
    
    
    
    
    
      }, [commId]);
    





       //delete Commnet



       const [showDelete, setShowDelete] = useState(false);

       const handleDeleteComment = () => {
           setShowDelete(true);
       }
   
   
   
       async function deleteCommnet(comId) {
   
           await deleteCommnetApi(comId).then(
               //  alert("Commnet hes been deleteaad")
   
           )
       }


         // pour la traitement des balises html

  const createMarkup = (htmlContent) => {
    return { __html: htmlContent };
  };




    return (<>



        <li className="list-group-item border-0 d-flex align-items-center px-0 mb-2 pt-0">
            <div className="avatar me-3">
                <img src={imageSrc} alt="kal" className="border-radius-lg shadow" />
            </div>
            <div className="d-flex align-items-start flex-column justify-content-center">
                <h6 className="mb-0 text-sm">{userInfo.name}</h6>
                <p className="mb-0 text-xs" style={{ fontSize: "10px" }} dangerouslySetInnerHTML={createMarkup(replyContent.text)}></p>

            </div>
            {/* <i  style={{ color: 'red' }} class="fa fa-trash" aria-hidden="true"></i> */}
            <i onClick={handleDeleteComment} style={{ color: 'red' }} className="pe-3 ps-0 mb-0 ms-auto w-25 w-md-auto fa fa-trash" aria-hidden="true"></i>


        </li>





        {/*  */}
        <Modal show={showDelete} onHide={() => setShowDelete(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Delete Comment</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure to Delete this Comment?</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowDelete(false)}>
                    No
                </Button>
                <Button variant="primary" onClick={() => {
                    // Code à exécuter lorsque l'utilisateur clique sur le bouton "Save changes"
                    deleteCommnet(commId).then(() => {
                        // history.push('/list');
                         window.location.reload();

                    });
                    // ...
                    setShowDelete(false);
                }}>
                    Delete Comment
                </Button>
            </Modal.Footer>
        </Modal>






        {/*  */}



    </>
    );
}

export default CommentComponent;


