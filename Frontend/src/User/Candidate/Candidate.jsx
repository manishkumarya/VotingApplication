import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "../../components/Card";
import { Link } from "react-router-dom";
import AddCandi from "./AddCandi";
import UpdateCandi from "./UpdateCandi";
function Candidate() {
    const [Candidate, setCandidate] = useState([]);
    const [sticky, setSticky] = useState(false);

    useEffect(() => {
        const getCandidate = async () => {
            try {
                const res = await axios.get("http://localhost:3000/Candidate");
                // console.log(res.data._id);
                setCandidate(res.data);
            }
            catch (error) {
                console.log(error);
            }
        }
        getCandidate();
    }, [])

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

    return (
        <>
            <div className={`max-w-screen-2xl container mx-auto md:px-20 px-4 fixed top-0 left-0 right-0 z-50 ${sticky ? "sticky-navbar shadow-md bg-sky-50 duration-300 transition-all ease-in-out" : ""}`}>
                <div className="navbar bg-sky-30 flex justify-around ">
                    <Link  to="/VotingCount" className="btn btn-ghost text-2xl text-black-500 bg-green-500 hover:bg-green-700 m-0">Result</Link>
                    <div className="">
                        <button className="btn btn-ghost text-white bg-pink-500 hover:bg-pink-700 mr-10 " onClick={() => {
                            document.getElementById("my_modal_4").showModal()
                        }}>Add new</button>
                        <AddCandi/>
                    </div>
                </div>
            </div>
            <div className="max-w-screen-2xl container mx-auto md:px-20 px-4">
                <div className="mt-20 text-center">
                    <h1 className=" text-2xl md:text-4xl">Elected Candidates are  <span className="text-pink-500">here !:)</span> </h1>
                    <p className="mt-5 mb-10">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo modi dolorum dolor ducimus fugit in! Itaque iusto cumque dolor dolorem?</p>
                    <Link to="/" className=" mt-10 bg-pink-500 text-white px-3 py-2 rounded-md hover:bg-pink-700 duration-300">Back</Link>
                </div>
                <div className="mt-12 grid grid-cols-1 md:grid-cols-2">
                    {
                        Candidate.map((item) => (
                            
                            <>
                            <Card key={item.id} item={item} />
                            <UpdateCandi key={item.id} item={item}/>
                            </>
                        ))
                    }
                </div>
            </div>

        </>
    )
}

export default Candidate