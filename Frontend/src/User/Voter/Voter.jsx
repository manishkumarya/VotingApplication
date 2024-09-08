import axios from "axios";
import React, { useEffect, useState } from "react";
import List from "../../components/List";
import { Link } from "react-router-dom";
function Voter(){
    const [Voter,setVoter]=useState([]);
    const [sticky,setSticky]=useState(false);



   useEffect(()=>{
    const getVoter= async ()=>{
        try{
    const  res=await axios.get("http://localhost:3000/User");
    console.log(res.data);
    setVoter(res.data);
        }
        catch(error){
         console.log(error);
        }
    }
    getVoter();
   },[])
   useEffect(() => {
    const handleScroll = () => {
        if (window.scrollY > 0) {
            setSticky(true);
        }
        else {
            setSticky(false);
        }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
        window.removeEventListener('scroll', handleScroll);
    }

}, [])

   const filterData=Voter.filter((data)=>data.role ==="Voter")
    return (
        <>
        <div className={`max-w-screen-2xl container mx-auto md:px-20 px-4 fixed top-0 left-0 right-0 z-50 ${sticky ? "sticky-navbar shadow-md bg-sky-50 duration-300 transition-all ease-in-out" : ""}`}>
                <div className="navbar bg-sky-30 flex justify-around ">
                    <a className="btn btn-ghost text-4xl">Voters </a>
                    <div className="">
                        <Link  to="/Signup" className="btn btn-ghost text-white bg-pink-500 hover:bg-pink-700 mr-5">Add new</Link>
                        <button className="btn btn-ghost text-white bg-pink-500 hover:bg-pink-700 ">Remove</button>
                        <button className="btn btn-ghost text-white bg-pink-500 hover:bg-pink-700 ml-5">update</button>
                    </div>
                </div>
                </div>
        <div className="max-w-screen-2xl container mx-auto md:px-20 px-4">
            <div className="mt-20 text-center">
                <h1 className=" text-2xl md:text-4xl">Registered Voters are   <span className="text-pink-500">here !:)</span> </h1>
                <p className="mt-5 mb-10">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo modi dolorum dolor ducimus fugit in! Itaque iusto cumque dolor dolorem?</p>
                <Link to="/" className=" mt-10 bg-pink-500 text-white px-3 py-2 rounded-md hover:bg-pink-700 duration-300">Back</Link>
            </div>
            <div className="mt-12 grid grid-cols-1">
                {
                    filterData.map((item)=>(
                       <List key={item.id} item={item}/>
                    ))
                }

                
            </div>
    
        </div>
        </>
    )
}

export default Voter