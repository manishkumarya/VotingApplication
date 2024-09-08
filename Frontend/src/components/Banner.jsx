import React from "react";
import Login from "./Login";
function Banner() {
    return (<>
        <div className="max-w-screen-2xl container mx-auto md:px-20 px-4 flex my-20">
            <div className="w-full md:w-1/2 bg-[url('https://img.freepik.com/free-vector/realistic-vector-icon-voting-elections-concept-human-hand-holding-paper-vote-ballot_134830-1480.jpg?t=st=1725019762~exp=1725023362~hmac=d0f0e3e1b72d790e70dd7c10b304c8a4d07ccd4ce394fccc467232afda4ba3eb&w=740')]">
                <h1 className="text-blue-600 text-2xl bold mb-8 uppercase"> welcome to the voting world </h1>
                Voting is crucial because it ensures that every citizen has a say in how their community and country are governed. It empowers individuals to influence policies, hold leaders accountable, and drive change on issues that matter to them. By participating in elections, people contribute to the democratic process, helping to shape laws and priorities that affect daily life. Voting also strengthens the legitimacy of elected officials and promotes a more representative and responsive government. Ultimately, exercising your right to vote is a way to protect and enhance your freedoms, making it an essential part of a functioning democracy.
            <label className="input input-bordered flex items-center gap-2 mt-10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="w-4 h-4 opacity-70"
              >
                <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
              </svg>
              <input type="text" className="grow" placeholder="Email" />
            </label>
            <button className="btn mt-2 btn-secondary" onClick={()=>{
              document.getElementById("my_modal_3").showModal()
            }}>Get Started</button>
            <Login/>
        

            </div>
            <div className="w-full md:w-1/2 h-1px">
                <img src="https://img.freepik.com/free-vector/electronic-voting-abstract-concept-illustration_335657-1876.jpg?t=st=1725016944~exp=1725020544~hmac=410e03f693bd698f5839e289e8f42d118dba42b04d686ce1d93d636305d145d5&w=740"></img>
            </div>
        </div>

    </>)
}

export default Banner