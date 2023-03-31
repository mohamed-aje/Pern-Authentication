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
      const response = await fetch(
        "http://localhost:5000/authentication/login",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );

      const parseRes = await response.json();

      if (parseRes.jwtToken) {
        localStorage.setItem("token", parseRes.jwtToken);
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
          <div className="login__logo">
            <div className="box-1">
              <img src={pic1} />
            </div>
          </div>
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
            <button className="submit-btn" type="submit">
              Login
            </button>
            <div className="or">
              <div className="line" />
              <p>OR</p>
              <div className="line" />
            </div>
            <div className="create-account">
              <span className="signup">
                <p> Don't have an account?</p>
                <Link to="/register">Sign up</Link>
              </span>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};
export default Login;
