import React from 'react'
import Home from './Home/Home'
import { Navigate, Route, Routes } from "react-router-dom"
import Signup from './components/Signup'
import Contact from './Contact/Contact'
import Candidate from './User/Candidate/Candidate'
import Voter from './User/Voter/Voter'
import { Toaster } from 'react-hot-toast';
import { useAuth } from './Context/AuthProvider'
import AddCandi from './User/Candidate/AddCandi'

function App() {
  const [authUser,setAuthuser]=useAuth();
  console.log(authUser);
  return (
    <div>
      <Routes>
         {/* for the home */}
        <Route path='/' element={ <Home/>}></Route>

           {/* contact route */}
        <Route path='/Contact' element={ <Contact/>}></Route>

        {/* user route  */}
        <Route path='/Candidate' element={authUser?<Candidate/> : <Navigate to="/signup"/>}></Route>
        <Route path='/Candidate/Add' element={authUser?<AddCandi/> : <Navigate to="/Candidate"/>}></Route>

        <Route path='/Voter' element={authUser?<Voter/> : <Navigate to="/signup"/>}></Route>

        {/* signup route  */}
        <Route path='/Signup' element={ <Signup/>}></Route>
       
      </Routes>
      <Toaster />
    </div>
  )
}

export default App
