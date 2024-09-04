import React from 'react'
import { useAuth } from '../Context/AuthProvider'
import toast from 'react-hot-toast';

export default function Logout() {
    const [authUser,setAuthuser] =useAuth();
    const handleLogout=()=>{
        try{
          setAuthuser({
            ...authUser,
            user:null
          })
          localStorage.removeItem("Users");
          toast.success("Logout successfully");
          window.location.reload();
        }
        catch(err){
          toast.error("error"+ err.message)
        }
    }
  return (
    <div>
      <button className='px-3 py-2 bg-red-500 text-white rounded-md cursor-pointer' onClick={handleLogout}>Logout</button>
    </div>
  )
}

