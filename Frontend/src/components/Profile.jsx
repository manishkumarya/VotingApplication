import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from "../Context/AuthProvider";
import toast from "react-hot-toast";
import axios from "axios";
import UpdatePassword from "../User/UpdatePassword";
function Profile() {
    const [getprofile, setprofile] = useState([]);
    const [isProfileVisible, setIsProfileVisible] = useState(false); // Control visibility
    const [authUser, setAuthuser] = useAuth();
    //to handle logout
    const handleLogout = () => {
        try {
            setAuthuser({
                ...authUser,
                user: null
            })
            localStorage.removeItem("Users");
            toast.success("Logout successfully");
            window.location.reload();
        }
        catch (err) {
            toast.error("error" + err.message)
        }
    }
    //to handle profile
    const token = localStorage.getItem("Users");
    const cleanToken = token.replace(/^"|"$/g, ''); // Remove any surrounding quotes


    const handleProfile = async () => {
        try {
            if (isProfileVisible) {
                // If profile is already visible, hide it
                setIsProfileVisible(false);
            }
            else {
                const res = await axios.get("http://localhost:3000/User/profile", {
                    headers: {
                        Authorization: `Bearer ${cleanToken}`, // Send the token in the Authorization header
                    },
                });
                setprofile(res.data);
                setIsProfileVisible(true); // Show profile details
            }

        }
        catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <div>
                <div className="dropdown dropdown-hover">
                    <div tabIndex={0} role="button" className="btn m-1"><FontAwesomeIcon size="2xl" icon={faUser} style={{ color: "#63E6BE", }} /></div>
                    <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">

                        <div className="dropdown dropdown-left">
                            <li><button onClick={handleProfile}>profile</button></li>
                            <ul tabIndex={0} className="dropdown-content menu rounded-box w-50 p-2">
                                {isProfileVisible && getprofile && (
                                    <ul className="w-100">
                                        <li className="p-4 border rounded-md shadow-md bg-white">
                                            <p><strong>Name:</strong> {getprofile.name}</p>
                                            <p><strong>Age:</strong> {getprofile.age}</p>
                                            <p><strong>Mobile:</strong>{getprofile.Mobile}</p>
                                            <p><strong>Aadhar:</strong> {getprofile.aadharCardNumber}</p>
                                            <p><strong>Address:</strong> {getprofile.adress}</p>
                                            <p><strong>Role:</strong> {getprofile.role}</p>
                                        </li>
                                    </ul>
                                )}
                            </ul>
                        </div>
                        <li><button onClick={()=>{
                            document.getElementById('my_modal_1').showModal()
                        }}>Update</button></li>
                        <UpdatePassword/>
                        <li><button onClick={handleLogout}>Logout</button></li>

                    </ul>
                </div>
            </div>
        </>
    )
}
export default Profile;