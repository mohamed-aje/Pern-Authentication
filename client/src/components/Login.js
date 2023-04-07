import React, { useState } from "react";
import "./styles/login.css";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import pic1 from "../assets/pic1.png";

const Login = ({ setAuth }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState("");

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { email, password };
      const response = await fetch("http://localhost:3001/auth/login", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const parseRes = await response.json();

      if (parseRes.token) {
        localStorage.setItem("token", parseRes.token);
        setAuth(true);
        toast.success("Logged in Successfully");
      } else {
        setAuth(false);
        toast.error(parseRes);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <form onSubmit={onSubmitForm}>
      <div className="login__container ">
        <div className="login__welcome">
          <h1 style={{ color: "var(--glow-color)", textAlign: "center" }}>
            PERN STACK{" "}
          </h1>

          <br />
          <h2 style={{ color: "var(--glow-color)", textAlign: "center" }}>
            ‹ Authentication Application ›{" "}
          </h2>
        </div>
        <div className="login__form-container  ">
          <div className="login__form ">
            <input
              type="text"
              placeholder="Email or phone number"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="glowing-btn" type="submit">
              <span className="glowing-txt">Login</span>
            </button>
            <div className="or">
              <div className="line" />
              <p>OR</p>
              <div className="line" />
            </div>
            <div className="create-account">
              <span className="signup">
                <p> Don't have an account?</p>
                <Link to="/register">
                  <span className="glowing-txt">Sign up</span>
                </Link>
              </span>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};
export default Login;
