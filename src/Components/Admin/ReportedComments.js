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
    <table>
      <thead>
        <tr>
          <th>Author</th>
          <th>Comment</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {reportedComments.map(comment => (
          <tr key={comment._id}>
              <td>{format(new Date(comment.createdAt), "dd/MM/yyyy,HH:MM")}</td>
            <td>{comment.username}</td>
            <td>{comment.text}</td>
          
            <td><button onClick={() => handleDeleteComment(comment._id)}>Delete</button></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ReportedComments;
