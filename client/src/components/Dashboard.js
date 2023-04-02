import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import "./styles/Navbar.css";
import { IoMdArrowDropdown } from "react-icons/io";

const Dashboard = ({ setAuth }) => {
  const [name, setName] = useState("");
  const getName = async () => {
    try {
      const response = await fetch("http://localhost:3001/dashboard", {
        method: "GET",
        headers: { token: localStorage.token },
      });
      const parseRes = await response.json();
      console.log(parseRes);
      setName(parseRes.user_name);
    } catch (error) {}
  };
  const logout = async (e) => {
    e.preventDefault();
    try {
      localStorage.removeItem("token");
      window.location.reload();
    } catch (err) {
      console.error(err.message);
    }
  };
  useEffect(() => {
    getName();
  }, []);
  return (
    <>
      <div className="navbar ">
        <Link to="/">Dashboard</Link>
        <div className="dropdown">
          <button className="dropbtn">
            Welcome {name}
            <IoMdArrowDropdown className="arrow down"></IoMdArrowDropdown>
          </button>
          <div className="dropdown-content">
            <Link onClick={(e) => logout(e)}>Logout</Link>
          </div>
        </div>
      </div>
      <div>
        <h1 style={{ textAlign: "center" }}>
          Welcome to Authentication Dashboard.
        </h1>
      </div>
    </>
  );
};

export default Dashboard;
