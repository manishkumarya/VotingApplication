import axios from "axios";
import React from "react"
import toast from "react-hot-toast";


export default function Card({item}) {
  const handleVote = () => {
    const token = localStorage.getItem("Users");
    const cleanToken = token.replace(/^"|"$/g, ''); // Remove any surrounding quotes
    const candId=item._id;
    axios.get(`http://localhost:3000/candidate/vote/${candId}`,{
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
      if (error.response.status === 403) {
        toast.error("Admins are not allowed to vote.");
      } else if (error.response.status === 400) {
        toast.error("You have already voted.");
      } else {
        toast.error("An error occurred: " + (error.response.data.message || "Unknown error"));
      }
    })
    // Handle voting logic here using item._id
    console.log("Voting for candidate with ID:", item._id);
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
    <p>{item.id}</p>
   
    <div className="card-actions justify-end">
      <button className="btn btn-primary" onClick={handleVote} >Vote Now</button>
    </div>
  </div>
</div>
   </div>
   </>
  )
}
