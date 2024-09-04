import React, { createContext, useContext, useState } from 'react';
export const Authcontext=createContext();

export default function AuthProvider({children}) {
    const initialAuthuser=localStorage.getItem("Users");
    const [authUser,setAuthuser]=useState(
        initialAuthuser? JSON.parse(initialAuthuser) :undefined
    )
    return(
        <Authcontext.Provider value={[authUser,setAuthuser]}>
            {children}
        </Authcontext.Provider>
    )
 
}

export const useAuth=()=>useContext(Authcontext)