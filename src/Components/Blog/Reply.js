import React, { useEffect, useState } from "react";

import axios from "axios";

import { getReplybyId,deleteReplyApi} from "./api";
import moment from 'moment'; //pour la mise en forme du date 

// import './detailsPublication.css';
import { Modal, Button } from 'react-bootstrap';





function ReplyComponent({ replyId }) {


  const [replyContent, setReplyContent] = useState({});

  const [imageSrc, setImageSrc] = useState(''); // importer image user 


  const [userInfo, setUserInfo] = useState({}); // importer image user 


  useEffect(() => {

    getReplybyId(replyId)
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











  }, [replyId]);




  //delete Reply


async function deleteReply(repId) {

    await deleteReplyApi(repId).then(
        // alert("reply hes been deleteaad")

    )
}



const [showDelete, setShowDelete] = useState(false);
const handleDeleteReply = () => {
    setShowDelete(true);
}









  // pour la traitement des balises html

  const createMarkup = (htmlContent) => {
    return { __html: htmlContent };
  };




  return (<>

    <div className="avatar me-3">
      <img src={imageSrc} alt="kal" className="border-radius-lg shadow" />
    </div>
    <div className="d-flex align-items-start flex-column justify-content-center">
      <h6 className="mb-0 text-sm">{userInfo.name}</h6>
      <p className="mb-0 text-xs" dangerouslySetInnerHTML={createMarkup(replyContent.text)}></p>
    </div>



    <i onClick={ handleDeleteReply } style={{ color: 'red' }} className="btn btn-link pe-6 ps-0 mb-0 ms-auto w-25 w-md-auto fa fa-trash" aria-hidden="true"></i>



    {/* pour supprimer une publication */}

    <Modal show={showDelete} onHide={() => setShowDelete(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Delete Reply</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure to Delete this Reply?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowDelete(false)}>
          No
        </Button>
        <Button variant="primary" onClick={() => {
          // Code à exécuter lorsque l'utilisateur clique sur le bouton "Save changes"
          deleteReply(replyId).then(() => {
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






  </>
  );
}

export default ReplyComponent;










// // Component for displaying a single comment and its replies
// function SingleComment({ comment }) {
//   const [showReplies, setShowReplies] = useState(false);

//   const handleShowReplies = () => {
//     setShowReplies(!showReplies);
//   }

//   return (
//     <div>
//       <div>{comment.text}</div>
//       <button onClick={handleShowReplies}>Show replies</button>
//       {showReplies && (
//         <ul>
//           {comment.replies.map(replyId => (
//             <li key={replyId}>
//               <ApiCallToGetReplyContent replyId={replyId} />
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// }
