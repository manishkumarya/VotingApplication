import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form"
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

function Login(){
  
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
      } = useForm();
    
      const onSubmit = async (data) => {
        const Userinfo={
          aadharCardNumber:data.aadharCardNumber,
          password:data.password
        };
    await axios.post("http://localhost:3000/User/login",Userinfo)
    .then((res)=>{
      // console.log(res.data)
      if(res.data){
        toast.success('user successfully logged in');
        localStorage.setItem("Users",JSON.stringify(res.data.token));
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
        };
 return(
    <>
<dialog id="my_modal_3" className="modal">
  <div className="modal-box">
    <form onSubmit={handleSubmit(onSubmit)} method="dialog">
      {/* if there is a button in form, it will close the modal */}
      <button
              type="button"
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={() => document.getElementById("my_modal_3").close()} // Close modal on click
            >
              ✕
            </button>

    
    <h3 className="font-bold text-lg">Login</h3>
    {/* Aadhar  */}
    <div className="mt-4 space-y-2">
        <span>Aadhar Number</span>
        <br/>
        <input type="text" placeholder="Enter your Aadhar Number" maxLength={12} className="w-80 px-3 py-1 border rounded-md outline-none" {...register("aadharCardNumber", { required: true })}/>
       <br/>
        {errors.aadharCardNumber && <span className="text-sm text-red-500">This field is required</span>}
    </div>
   {/* password */}
    <div className="mt-4 space-y-2">
        <span>Password</span>
        <br/>
        <input type="password" placeholder="Enter your Password" className="w-80 px-3 py-1 border rounded-md outline-none" {...register("password", { required: true })}/>
        <br/>
        {errors.password && <span className="text-sm text-red-500">This field is required</span>}
    </div>
   
  {/* button */}

  <div className="flex justify-around mt-4">
    <button className="bg-pink-500 text-white rounded-md px-3 py-1 hover:bg-pink-700 duration-200">Login</button>
    <p>Not Registered ?{""} <Link to="/Signup" className="underline text-blue-500 cursor-pointer">Signup</Link>{""}</p>
  </div>
  </form>
  </div>
 
</dialog>
    </>
 )
}

export default Login
