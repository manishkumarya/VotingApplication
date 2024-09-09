import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
function VotingCount() {
    const [Candidate, setCandidate] = useState([]);
    const [sticky, setSticky] = useState(false);

    useEffect(() => {
        const getCandidate = async () => {
            try {
                const res = await axios.get("http://localhost:3000/Candidate/votecount");
                console.log(res.data);
                setCandidate(res.data);
            }
            catch (error) {
                console.log(error);
            }
        }
        getCandidate();
    }, []);
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

    }, []);
    return (
        <>
            <div className={`max-w-screen-2xl container mx-auto md:px-20 px-4 fixed top-0 left-0 right-0 z-50 ${sticky ? "sticky-navbar shadow-md bg-sky-50 duration-300 transition-all ease-in-out" : ""}`}>
                <div className="navbar bg-sky-50 flex justify-around ">
                    <a className="btn bg-sky-50 btn-ghost text-2xl text-green-500 ">Voting Count of Candidate</a>

                </div>
            </div>
            <div className="max-w-screen-2xl container mx-auto md:px-20 px-4">
                <div className="mt-20 text-center">
                    <h1 className="mb-10 text-2xl md:text-4xl">Voting count of elected  Candidates are  <span className="text-pink-500">here !:)</span> </h1>
                    <Link to="/" className=" mt-10 bg-pink-500 text-white px-3 py-2 rounded-md hover:bg-pink-700 duration-300">Back</Link>
                </div>
                <div className="mt-12 grid grid-cols-1 md:grid-cols-1">
                    { Candidate.length > 0 ?
                    (
                        <ol className="list-decimal pl-5">
                  {      Candidate.map((item)=>{
                       return( 
                        <li key={item.id} className="p-4 border rounded-md shadow-md bg-white">
                                <p><strong>Party:</strong> {item.party}</p>
                                <p><strong>Votes:</strong> {item.voteCount}</p>
                        </li> ) 

                })}

</ol>
            )   
                 :(<p>No candidates available.</p>

                   )
                        
                      }
                </div>
            </div>
        </>
    )
}

export default VotingCount;