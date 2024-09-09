import axios from "axios";
import React, { useState } from "react"
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import UpdateCandi from "../User/Candidate/UpdateCandi";


export default function Card({item}) {
  const token = localStorage.getItem("Users");
  const cleanToken = token.replace(/^"|"$/g, ''); // Remove any surrounding quotes
  const candId=item._id;
  const handleVote = async () => {
    
   await axios.get(`http://localhost:3000/candidate/vote/${candId}`,{
      headers: {
        Authorization: `Bearer ${cleanToken}`, // Send the token in the Authorization header
      },
    })
    .then((res)=>{
      if(res.data){
        toast.success('you have voted successfully');
      }
    })
    .catch((error)=>{
      if (error.response) {
        // Server responded with a status other than 2xx
        toast.error(`Error: ${error.response.data.message || 'An error occurred'} - ${error.response.data.details || ''}`);
    } else if (error.request) {
        // Request was made but no response was received
        toast.error('Error: No response from server');
    } else {
        // Something happened in setting up the request
        toast.error(`Error: ${error.message}`);
    }
    })
    // Handle voting logic here using item._id
    // console.log("Voting for candidate with ID:", item._id);
};

//to handle removal of candidate

const handleRemove=async ()=>{
 try{
    const response=await axios.delete(`http://localhost:3000/candidate/${candId}`,
    {
        headers:{
          Authorization: `Bearer ${cleanToken}`, // Send the token in the Authorization header
        },
    });
    toast.success("successfully removed ")


 }
 catch(error){
  if (error.response) {
    // Server responded with a status other than 2xx
    toast.error(`Error: ${error.response.data.message || 'An error occurred'} - ${error.response.data.details || ''}`);
} else if (error.request) {
    // Request was made but no response was received
    toast.error('Error: No response from server');
} else {
    // Something happened in setting up the request
    toast.error(`Error: ${error.message}`);
}
 }
};


  
  return (
   <>
   <div className='mt-4 my-3 p-3'>
   <div className="card card-compact bg-base-100 w-96 shadow-xl">
  <figure>
    <img
      src={item.img}
      alt="elected_candidate" />
  </figure>
  <div className="card-body">
    <h2 className="card-title text-red-700 underline">{item.party}</h2>
    
   
    <div className="card-actions justify-between">
      <button className="btn bg-red-500 text-white hover:bg-red-700" onClick={handleRemove}>Remove</button>
      <button className="btn bg-blue-500 text-white hover:bg-blue-700" onClick={()=>{
         document.getElementById("my_modal_5").showModal();
      }}>Update</button>
      <UpdateCandi item={item}/>
      <button className="btn btn-primary" onClick={handleVote} >Vote Now</button>
    </div>
  </div>
</div>
   </div>
   
   </>
  )
}
