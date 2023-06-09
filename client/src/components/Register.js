import React, { useState } from "react";
import "./styles/login.css";
import { Link } from "react-router-dom";
import pic5 from "../assets/pic5.png";
import { toast } from "react-toastify";

const Register = ({ setAuth }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { email, password, name };
      const response = await fetch("http://localhost:3001/auth/register", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(body),
      });
      const parseResponse = await response.json();
      if (parseResponse.token) {
        localStorage.setItem("token", parseResponse.token);
        setAuth(true);
        toast.success(
          "You have successfully registered!! you will be redirected to the Dashboard"
        );
      } else {
        setAuth(false);
        toast.error(parseResponse);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <form onSubmit={onSubmitForm}>
      <div className="login__container ">
        <div className="login__welcome">
          <img src={pic5} alt="pic register" />
        </div>
        <div className="login__form-container  ">
          <div className="login__form ">
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
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
              <span className="glowing-txt">Sign up</span>
            </button>
            <div className="or">
              <div className="line" />
              <p>OR</p>
              <div className="line" />
            </div>
            <div className="create-account">
              <span className="signup">
                <p> Already have an account?</p>
                <Link to="/login">
                  <span className="glowing-txt">Login</span>
                </Link>
              </span>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};
export default Register;
