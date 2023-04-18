import axios from "axios";
const url = "http://localhost:3000/publication/";
const urlc = "http://localhost:3000/comment";











export const getallPublication = async (userid) => {
    console.log("userid - >"+userid)

    return  await axios.get(`${url}getallpublicaion?userid=${userid}`
    ).then(response => response.data);
}

export const getallPublicationByIdUser = async (userid) => {
    console.log("userid - >"+userid)

    return  await axios.get(`${url}/getallpublicaionByUserId?userid=${userid}`
    ).then(response => response.data);
}



export const deletePublication = async (idpub) => {
    try {
      const response = await axios.delete(`${url}/deletepublication/${idpub}`);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };


  export const deleteReplyApi = async (idrep) => {
    try {
   

      const response = await axios.delete(`http://localhost:3000/comment/deleteReply/${idrep}`);
      return response.data;

      

    
    
    } catch (error) {
      console.error(error);
    }
  };




  export const deleteCommnetApi = async (idcomm) => {
    try {
   

      const response = await axios.delete(`http://localhost:3000/comment/deleteCommnet/${idcomm}`);
      return response.data;


      
      

    
    
    } catch (error) {
      console.error(error);
    }
  };














  export const  BloquerPublication= async (idpub) => {

    return await axios.put(`${url}BloquerPublication/${idpub}`)
       .then(response => response.data);


  };



  export const  ActiverPublication= async (idpub) => {

    return await axios.put(`${url}ActiverPublication/${idpub}`)
       .then(response => response.data);


  };



  // detalis pub


  export const getPublicationById = async (idub) => {
    console.log("idpub - >"+idub)

    return  await axios.get(`${url}/getPubbyid/${idub}`)
          .then(response => response.data);
}

export const getOwnerPublication = async (idpub) => {
  console.log("idpub - >"+idpub)

  return  await axios.get(`${url}/getOwnerPublication/${idpub}`)
        .then(response => response.data);
}



export const getallComments = async (idpubb) => {
  console.log("idpub - >"+idpubb)

  return  await axios.get(`http://localhost:3000/comment/getallCommnetByPublicationId/${idpubb}/allcomments`)
        .then(response => response.data);
}



export const addCommentAPI = async (userid,comment) => {
  console.log("userid - >"+userid)

  return  await axios.post(`http://localhost:3000/comment/addCommnet?userid=${userid}`,comment)
     .then(response => response.data);
}


export const addReplytoCommentAPI = async (userid,commentid,comment) => {
  console.log("userid - >"+userid)
  console.log("userid - >"+commentid)



  return  await axios.post(`http://localhost:3000/comment/replytoComment/${commentid}/reply?userid=${userid}`,comment)
     .then(response => response.data);
}


export const getReplybyId = async (idrep) => {
  console.log("idpub - >"+idrep)

  return  await axios.get(`http://localhost:3000/comment/getreplyById/${idrep}/getreply`)
        .then(response => response.data);
}




export const getCommnetbyId = async (idrep) => {
  console.log("idpub - >"+idrep)

  return  await axios.get(`http://localhost:3000/comment/getCommnetById/${idrep}/getcomment`)
        .then(response => response.data);
}









// FILTER


export const filterOptAPI = async (titredata,catdata,votedata) => {
  console.log("titredata - >"+titredata)
  console.log("catdata - >"+catdata)
  console.log("catdata - >"+votedata)


  


  // return  await axios.get(`${url}getallpublicaion?userid=${userid}`
  // ).then(response => response.data);


  return  await axios.get(`http://localhost:3000/publication/filterOpt?category=${catdata}&titre=${titredata}&votes=${votedata}`
  ).then(response => response.data);



}