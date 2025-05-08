import React from "react";
import { Link, NavLink } from "react-router";

const navItems = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Portfolio", path: "/Portfolio" },
  { name: "Hire Me", path: "/contact" },
];

export const Navbar = () => {
  const links = navItems.map((item) => (
    <li key={item.name}>
      <NavLink
        to={item.path}
        className={({ isActive, isPending }) => {
          let baseClass = item.name === "Hire Me" ? "hireButtonDesign" : "buttonDesign";
  
          if (isPending) return baseClass + " pending";
          if (isActive) return baseClass + " active";
  
          return baseClass;
        }}
      >
        {item.name}
      </NavLink>
    </li>
  ));
  

  return (
    <div className="navbar px-4 md:px-6 lg:px-8">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>
        <Link className="text-xl font-extrabold text-shadow-2xs text-[#F8B90C] ">
          CH.<span className="text-blue-400 text-shadow-2xs text-shadow-blue-200">Minhaz</span>
        </Link>
      </div>
      <div className="navbar-end hidden lg:flex">
        <ul className="menu menu-horizontal px-1 flex gap-x-4">{links}</ul>
      </div>
    </div>
  );
};
