import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import "./styles/Navbar.css";
import { IoMdArrowDropdown } from "react-icons/io";
import Navbar from "./Navbar";

const Dashboard = ({ setAuth }) => {
  const [name, setName] = useState("");
  const [admin, setAdmin] = useState(true);
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
      <Navbar logout={logout} name={name} />
      <div>
        <h1 style={{ textAlign: "center", color: "white" }}>
          Welcome to Authentication Dashboard.
        </h1>
      </div>
    </>
  );
};

export default Dashboard;
