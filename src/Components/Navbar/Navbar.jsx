import React from 'react'
import { NavLink } from 'react-router'

export const Navbar = () => {
  return (
    <div className=" max-w-11/12 mx-auto navbar bg-base-100  border-b-2 border-[##F8B90C] ">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        <li>
        <NavLink to='/'>
          <button className='buttonDesign'>Home</button>
          </NavLink>
        </li>
        <li>
        <NavLink to='/'>
          <button className='buttonDesign'>About</button>
          </NavLink>
        </li>
        <li>
        <NavLink to='/'>
          <button className='buttonDesign'>Get in Touch</button>
          </NavLink>
        </li>
      </ul>
    </div>
    <a className="lg:text-left text-right text-xl">CH Minhaz</a>
  </div>
  <div className="navbar-end hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
    <li>
        <NavLink to='/'>
          <button className='buttonDesign'>Home</button>
          </NavLink>
        </li>
        <li>
        <NavLink to='/'>
          <button className='buttonDesign'>About</button>
          </NavLink>
        </li>
        <li>
        <NavLink to='/'>
          <button className='buttonDesign'>Get in Touch</button>
          </NavLink>
        </li>
    </ul>
  </div>
  
</div>
  )
}
