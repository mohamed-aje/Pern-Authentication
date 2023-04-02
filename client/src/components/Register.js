import React, { useState } from "react";
import "./styles/register.css";
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
    <div className="login__container bg__gardient">
      <div className="login__welcome">
        <div className="register__logo">
          <div className="box-1">
            <img src={pic5} />
          </div>
        </div>
      </div>
      <form onSubmit={onSubmitForm} className="login_form">
        <div className="form-inputs">
          <input
            type="text"
            name="email"
            placeholder="email"
            className=""
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            name="password"
            placeholder="password"
            className=""
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="text"
            name="name"
            placeholder="name"
            className=""
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button className="">Sign up</button>
          <div className="or">
            <div className="line" />
            <p>OR</p>
            <div className="line" />
          </div>
          <div className="create-account">
            <span className="signup">
              <p> Already have an account?</p>
              <Link to="/login">Sign in</Link>
            </span>
          </div>
        </div>
      </form>
    </div>
  );
};
export default Register;
