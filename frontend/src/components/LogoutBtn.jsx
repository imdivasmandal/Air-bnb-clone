import React from 'react'
import {useDispatch} from 'react-redux'
import { logout } from '../store/auth-slice/index.js';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";

function LogoutBtn() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/v1/users/logout",
          {
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
          }
        );
  
        if (response && response.data) {
          toast.success("Logout successful! See you next time!"); 
          console.log(response.data.message);
          dispatch(logout());
          navigate("/");
        }
      } catch (error) {
        toast.error("Logout failed. Please try again.");
        console.error("Logout failed", error);
      }
    };

  return (
    <button
    className='px-6 font-bold text-lg'
    onClick={logoutHandler}
    >Logout</button>
  )
}

export default LogoutBtn;
