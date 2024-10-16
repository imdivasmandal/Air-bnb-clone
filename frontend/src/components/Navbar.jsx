import LogoutBtn from "./LogoutBtn.jsx";
import React from 'react'
import Logo from './Logo.jsx'
import { Link } from 'react-router-dom'
import {useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { FiAlignJustify } from "react-icons/fi";


function Navbar() {
    const authStatus = useSelector((state) => state.auth.status)
    const navigate = useNavigate()

    const navItems = [
        {
          name: 'Home',
          slug: "/",
          active: true
        }, 
        {
            name: "Signup",
            slug: "/signup",
            active: !authStatus,
        },
        {
          name: "Login",
          slug: "/login",
          active: !authStatus,
        },
        {
            name: "Create Listing",
            slug: "/listing/new",
            active: authStatus,
        },
      ]
  return (
    <div className="mb-24">
    <header className='shadow-md bg-gray-500 z-50 w-full fixed top-0'>
      <div className="navbar bg-base-100 h-24">
          {/* logo part */}
          <div className="flex-1 md:mx-5">
            <Link to={"/"}><Logo width='160px'/></Link>
          </div>  

          <div className="flex-none hidden md:inline md:mx-3">
            <ul className="menu menu-horizontal px-1">

              {navItems.map((item) => 
                item.active ? (
                  <li key={item.name} className='md:mx-5'>
                    <button
                    className='font-bold text-lg'
                    onClick={() => navigate(item.slug)}
                    >{item.name}</button>
                  </li>
                ) : null
              )}

              {authStatus && (
                <li>
                  <LogoutBtn />
                </li>
              )}
              
            </ul>
          </div>   



          <div className="flex-none md:hidden md:mx-3 bg-white z-10">
            <ul className="menu menu-horizontal px-1">
                {authStatus && (
                  <li>
                  <LogoutBtn />
                  </li>
                )}
              <li>
                <details>
                  <summary className='z-10 font-bold text-2xl pl-9 '><FiAlignJustify/></summary>
                  <ul className="bg-base-100 rounded-t-none p-2">
                    <hr />
                    {navItems.map((item) => 
                      item.active ? (
                        <li key={item.name} className='z-10 bg-white'>
                          <button
                          onClick={() => navigate(item.slug)}                          
                          >{item.name}</button>
                        </li>
                      ) : null
                    )}
                  </ul>
                </details>               
              </li>
            </ul>
          </div>        
      </div>
    </header>
    </div>
  )
}

export default Navbar





