import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { format } from "date-fns";

const ReportedComments = () => {
  const [reportedComments, setReportedComments] = useState([]);

  useEffect(() => {
    const fetchReportedComments = async () => {
      try {
        const res = await axios.get('http://localhost:3000/event/reportedComment');
        setReportedComments(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchReportedComments();
  }, []);

  const handleDeleteComment = async (commentId) => {
    try {
      const res = await axios.delete(`http://localhost:3000/event/deleteComments/${commentId}`);
      console.log(res.data);
      // Remove the deleted comment from the state
      setReportedComments(reportedComments.filter(comment => comment._id !== commentId));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className="main-content  mt-0">
    <div className="container-fluid py-4">
<div className="row">
 <div className="col-12">
   <div className="card my-4">
     <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
       <div className="bg-gradient-primary shadow-primary border-radius-lg pt-4 pb-3">
         <h6 className="text-white text-capitalize ps-3">List of reported comments</h6>
       </div>
     </div>
     <div className="card-body px-0 pb-2">
       <div className="table-responsive p-0">
         <table className="table align-items-center mb-0">
           <thead>
             <tr>
             <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                      Date
                    </th>
                    <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                     Author
                    </th>          
                    <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                      Comments
                    </th>
                    <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                      Actions
                    </th>
                    </tr>
                </thead>
                <tbody>
                
        {reportedComments.map(comment => (
          <tr key={comment._id}>
               <td className="align-middle">
                      <span className="text-secondary text-xs font-weight-bold">
                      {format(new Date(comment.createdAt), "dd/MM/yyyy,HH:MM")}
                                            </span>
                    </td>
                    <td>
                     
                        <div className="d-flex flex-column justify-content-center">
                          <h6 className="mb-0 text-sm">{comment.username}</h6>
                        
                        </div>
                    
                    </td>
                    <td>
                    <div className="d-flex flex-column justify-content-center">
                      <p className="text-xs text-secondary mb-0">{comment.text}</p>
                      </div>
                    </td>
         
          
            <td>
<button type="button" class="btn btn-danger" onClick={() => handleDeleteComment(comment._id)}>Delete</button></td>
          </tr>
        ))}
    </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
 

  </div>
  </main>
  );
};

export default ReportedComments;
