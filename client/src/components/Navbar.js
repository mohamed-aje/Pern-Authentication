import React from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { Link } from "react-router-dom";

const Navbar = ({ logout, name }) => {
  return (
    <div className="navbar ">
      <Link to="/dashboard">Dashboard</Link>
      <div className="dropdown">
        <button className="dropbtn">
          Welcome {name}
          <IoMdArrowDropdown className="arrow down"></IoMdArrowDropdown>
        </button>
        <div className="dropdown-content">
          <Link to="/my-profile">My profile</Link>
          <Link onClick={(e) => logout(e)}>Logout</Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
