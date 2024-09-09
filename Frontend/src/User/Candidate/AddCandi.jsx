import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, Navigate } from "react-router-dom";
function AddCandi() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
      } = useForm();
    
      const onSubmit = async (data) =>{
        const Userinfo={
          name:data.name,
          age:data.age,
          party:data.party,
          img:data.img
        };
        const token = localStorage.getItem("Users");
        const cleanToken = token.replace(/^"|"$/g, ''); // Remove any surrounding quotes
        
        await axios.post("http://localhost:3000/Candidate",Userinfo,
          {
          headers: {
            Authorization: `Bearer ${cleanToken}`, // Send the token in the Authorization header
          },
        })
        .then((res)=>{
          console.log(res.data)
          if(res.data){
            toast.success('Candidate added');
            // localStorage.setItem("Users",JSON.stringify(res.data));
            window.location.reload();
            reset(); // Clear the form inputs
            document.getElementById("my_modal_3").close();
          }
        })
        .catch((err)=>{
          if (err.response) {
            // Server responded with a status other than 2xx
            toast.error(`Error: ${err.response.data.error || 'Unknown error'} - ${err.response.data.details || ''}`);
          } else if (err.request) {
            // Request was made but no response was received
            console.error('Error request:', err.request);
            toast.error("Error: No response from server");
          } else {
            // Something happened while setting up the request
            console.error('Error message:', err.message);
            toast.error(`Error: ${err.message}`);
          }
        })
      }
    return(
  <>
      <dialog id="my_modal_4" className="modal">
  <div className="modal-box">
    <form onSubmit={handleSubmit(onSubmit)} method="dialog">
      {/* if there is a button in form, it will close the modal */}
      <Link to="/" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</Link>
    
    <h3 className="font-bold text-lg">Add Candidate</h3>
    {/* name */}
    <div className="mt-1 space-y-1">
        <span>Name</span>
        <br/>
        <input type="text" placeholder="Enter Candidate Name" className="w-80 px-3 py-1 border rounded-md outline-none" {...register("name", { required: true })}></input>
        <br/>
        {errors.name && <span className="text-sm text-red-500">This field is required</span>}
    </div>
    {/* age */}
    <div className="mt-1 space-y-1">
        <span>Age</span>
        <br/>
        <input type="number" placeholder="Age" maxLength={2} className="w-20 px-3 py-1 border rounded-md outline-none" {...register("age", { required: true })}></input>
        <br/>
        {errors.age && <span className="text-sm text-red-500">This field is required</span>}
    </div>
    {/* party */}
    <div className="mt-1 space-y-1">
        <span>Party</span>
        <br/>
        <input type="text" placeholder="Enter Party Name" className="w-80 px-3 py-1 border rounded-md outline-none" {...register("party", { required: true })}></input>
        <br/>
        {errors.party && <span className="text-sm text-red-500">This field is required</span>}
    </div>
   {/* image */}
   <div className="mt-1 space-y-1">
        <span>image link</span>
        <br/>
        <input type="text" placeholder="Enter Party Name" className="w-80 px-3 py-1 border rounded-md outline-none" {...register("img", { required: true })}></input>
        <br/>
        {errors.img && <span className="text-sm text-red-500">This field is required</span>}
    </div>
  {/* button */}

  <div className="flex justify-around mt-4">
    <button className="bg-pink-500 text-white rounded-md px-3 py-1 hover:bg-pink-700 duration-200">Add</button>
  </div>
  </form>
  </div>
 
</dialog>
 </>


    )
}

export default AddCandi