import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
function UpdatePassword(){
    const {
        handleSubmit,register,
        formState: { errors },
        reset,
      } = useForm();
    const onSubmit = async (data) => {
        try {
            const token = localStorage.getItem("Users");
            const cleanToken = token.replace(/^"|"$/g, ''); // Remove any surrounding quotes

            await axios.put("http://localhost:3000/User/profile/password", data, {
                headers: {
                    Authorization: `Bearer ${cleanToken}`,
                },
            });
            
            // Handle success, such as showing a success message or closing the modal
            toast.success("Password updated successfully");
            reset(); // Reset form fields
            document.getElementById("my_modal_1").close(); // Close the modal
        } catch (err) {
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
            // Handle error, such as showing an error message
        }
    };
    return (
    
        <>
  <dialog id="my_modal_1" className="modal">
  <div className="modal-box">
    <form onSubmit={handleSubmit(onSubmit)} method="dialog">
      {/* if there is a button in form, it will close the modal */}
      <Link to="/" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</Link>
    
    <h3 className="font-bold text-lg">Update Password</h3>
   {/* current [assword] */}
   <div className="mt-1 space-y-1">
        <span>Current Password</span>
        <br/>
        <input type="password" placeholder="Enter current password" className="w-80 px-3 py-1 border rounded-md outline-none" {...register("currentPassword", { required: true })}></input>
        <br/>
        {errors.currentPassword && <span className="text-sm text-red-500">This field is required</span>}
    </div>
      {/* new password] */}
   <div className="mt-1 space-y-1">
        <span>New Password</span>
        <br/>
        <input type="password" placeholder="Enter current password" className="w-80 px-3 py-1 border rounded-md outline-none" {...register("newPassword", { required: true })}></input>
        <br/>
        {errors.newPassword && <span className="text-sm text-red-500">This field is required</span>}
    </div>
  {/* button */}

  <div className="flex justify-around mt-4">
    <button className="bg-pink-500 text-white rounded-md px-3 py-1 hover:bg-pink-700 duration-200">update</button>
  </div>
  </form>
  </div>
 
</dialog>
 </>
        
    )
}

export default UpdatePassword;