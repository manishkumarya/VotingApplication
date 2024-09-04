import React from "react";
import { useForm } from "react-hook-form"
import { Link } from "react-router-dom";
import Login from "./Login";
import axios from "axios";
import toast from "react-hot-toast";
function Signup(){
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,   //function to clear input
  } = useForm();

  const onSubmit = async (data) => {
    const Userinfo={
      name:data.name,
      age:data.age,
      Mobile:data.Mobile,
      adress:data.adress,
      aadharCardNumber:data.aadharCardNumber,
      password:data.password,
      role:data.role
    };
    
    await axios.post("http://localhost:3000/User/signup",Userinfo)
    .then((res)=>{
      // console.log(res.data)
      if(res.data){
        toast.success('Signup successfully Created ');
        // localStorage.setItem("Users",JSON.stringify(res.data.response));
        reset(); // Clear the form inputs
        window.location.reload();
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
<div className="flex h-screen items-center justify-center">
 <div id="" className="w-[600px]">
  <div className="modal-box">
    <form onSubmit={handleSubmit(onSubmit)} method="div">
      {/* if there is a button in form, it will close the modal */}
      <Link to="/" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</Link>
    
    <h3 className="text-blue-700 text-font-bold text-lg">Create Account</h3>
 {/* name */}
    <div className="mt-1 space-y-1">
        <span>Name</span>
        <br/>
        <input type="text" placeholder="Enter your Name" className="w-80 px-3 py-1 border rounded-md outline-none" {...register("name", { required: true })}></input>
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
    {/* mobile */}
    <div className="mt-1 space-y-1">
        <span>Contact Number</span>
        <br/>
        <input type="text" placeholder="Enter your contact number " maxLength={10} className="w-80 px-3 py-1 border rounded-md outline-none" {...register("Mobile", { required: true })}></input>
        <br/>
        {errors.Mobile && <span className="text-sm text-red-500">This field is required</span>}
    </div>
    {/* address */}
    <div className="mt-1 space-y-1">
        <span>Address</span>
        <br/>
        <input type="text" placeholder="Enter your Address" className="w-80 px-3 py-1 border rounded-md outline-none" {...register("adress", { required: true })}></input>
        <br/>
        {errors.adress && <span className="text-sm text-red-500">This field is required</span>}
    </div>
    {/* Aadhar  */}
    <div className="mt-1 space-y-1">
        <span>Aadhar Number</span>
        <br/>
        <input type="text" placeholder="Enter your Aadhar Number" maxLength={12} className="w-80 px-3 py-1 border rounded-md outline-none" {...register("aadharCardNumber", { required: true })}></input>
        <br/>
        {errors.aadharCardNumber && <span className="text-sm text-red-500">This field is required</span>}
    </div>
   {/* password */}
    <div className="mt-1 space-y-1">
        <span>Password</span>
        <br/>
        <input type="password" placeholder="Enter your Password" className="w-80 px-3 py-1 border rounded-md outline-none" {...register("password", { required: true })}></input>
        <br/>
        {errors.password && <span className="text-sm text-red-500">This field is required</span>}
    </div>
    {/* role */}
   
    <div className="mt-2 mb-10 space-y-1" {...register("role", { required: true })}>
    <label for="role">Choose a role:</label>
  <select name="role" id="role" className="">
    <option value="Admin">Admin</option>
    <option value="Voter">Voter</option>
  </select>
  
    </div>
  {/* button */}

  <div className="flex justify-around mt-4">
    <button className="bg-pink-500 text-white rounded-md px-3 py-1 hover:bg-pink-700 duration-200">Signup</button>
    <p>Have Account ?{""} <button className="underline text-blue-500 cursor-pointer" onClick={()=>{
        document.getElementById("my_modal_3").showModal()
    }}>Login</button>{""}</p>
    <Login/>
  </div>
  </form>
  </div>
</div>
</div>
        </>
    )
}

export default Signup