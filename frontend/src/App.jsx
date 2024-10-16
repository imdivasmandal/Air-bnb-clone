import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import {login, logout} from "./store/auth-slice/index.js"
import Navbar from "./components/Navbar.jsx"
import Footer from "./components/Footer.jsx"
import { Outlet } from 'react-router-dom'
import axios from 'axios'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchUser = async () => {
      try {
        await axios.get(
          "http://localhost:8000/api/v1/users/me",
          {
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
          }
        ).then((res) => {
          if (res) {
            dispatch(login({userData : res.data.data}))
          } else {
            dispatch(logout());
          }
        })
        .finally(() => setLoading(false))
      } catch (error) {
        console.log("User not fetching failed", error);
      }
    }
    fetchUser();
    setLoading(false);
  },[])
  
  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between mx-0 px-0'>
       <div className='w-full block'>
       <ToastContainer position="top-center" />
        <Navbar />
        <main>
        <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : <div>Loading...</div>
}

export default App