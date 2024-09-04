import React from 'react'
import { useForm } from "react-hook-form"
import { Link } from "react-router-dom";

function Contact(){

    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm()
    
      const onSubmit = (data) => console.log(data)
      
    return (
        <>
        <div className="flex h-screen items-center justify-center">
 <div id="" className="w-[600px] border">
  <div className="px-5 py-1">
    <form onSubmit={handleSubmit(onSubmit)} method="div">
      {/* if there is a button in form, it will close the modal */}
      <Link to="/" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</Link>
    
    <h3 className="flex justify-center text-blue-700 text-font-bold text-lg">Contact Us</h3>
 {/* name */}
    <div className="mt-1 space-y-1">
        <span>Name</span>
        <br/>
        <input type="text" placeholder="Enter your Name" className="w-80 px-3 py-1 border rounded-md outline-none" {...register("name", { required: true })}></input>
        <br/>
        {errors.name && <span className="text-sm text-red-500">This field is required</span>}
    </div>
    
   
    {/* Aadhar  */}
    <div className="mt-1 space-y-1">
        <span>Aadhar Number</span>
        <br/>
        <input type="text" placeholder="Enter your Aadhar Number" maxLength={12} className="w-80 px-3 py-1 border rounded-md outline-none" {...register("aadhar", { required: true })}></input>
        <br/>
        {errors.aadhar && <span className="text-sm text-red-500">This field is required</span>}
    </div>
    <div className="mt-1 space-y-1">
        <span>Message</span>
        <br/>
        <textarea name='message' cols={50} rows={10} placeholder='Type your message' {...register("message", { required: true })}></textarea>
      
    </div>
  {/* button */}

  <div className="flex justify-around mt-4">
    <button className="bg-pink-500 text-white rounded-md px-3 py-1 hover:bg-pink-700 duration-200">Send</button>
  </div>
  </form>
  </div>
</div>
</div>
        </>

    
    )
}
 

export default Contact
