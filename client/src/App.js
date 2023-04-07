import React, { useState, useEffect } from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import "./App.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  Navigate,
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import Setting from "./components/Setting";
import Profile from "./components/Setting";

const App = () => {
  const [isAuth, setIsauth] = useState(false);
  const setAuth = (boolean) => {
    setIsauth(boolean);
  };
  const checkAuthenticated = async () => {
    try {
      const res = await fetch("http://localhost:3001/authentication/verify", {
        method: "POST",
        headers: { jwt_token: localStorage.token },
      });

      const parseRes = await res.json();

      parseRes === true ? setIsauth(true) : setIsauth(false);
    } catch (err) {
      console.error(err.message);
    }
  };
  useEffect(() => {
    checkAuthenticated();
  }, []);

  return (
    <>
      <ToastContainer />
      <Routes>
        <Route
          path="/login"
          element={
            !isAuth ? <Login setAuth={setAuth} /> : <Navigate to="/dashboard" />
          }
        />
        <Route
          path="/dashboard"
          element={
            isAuth ? <Dashboard setAuth={setAuth} /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/register"
          element={
            !isAuth ? <Register setAuth={setAuth} /> : <Navigate to="/login" />
          }
        />
        <Route path="/my-profile" element={<Profile />} />
      </Routes>
    </>
  );
};

export default App;
