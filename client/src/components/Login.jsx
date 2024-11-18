import React, { useState } from "react";
import { Link, useNavigate, } from "react-router-dom";
import "../styles/LoginSignup.css";
import axios from 'axios';
import { ImEyeBlocked } from "react-icons/im";
import { ImEye } from "react-icons/im";


export const Login = ({setIsAuthenticated}) => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [passError, setPassError] = useState();
    const [mailError, setMailError] = useState();
    const [passState, setPassState] = useState(false);
    const navigate = useNavigate();

    const handleLogin = (e)=>
    {
        e.preventDefault();
        axios.post('http://localhost:3001/login', {email, password})
        .then((response)=>
        {
            if (response.data.status === "Login sucessful")
            {
              console.log("Sucessfully sent data for the verification in the backend")
              localStorage.setItem('firstName', response.data.firstName)
              localStorage.setItem('lastName', response.data.lastName)
              setIsAuthenticated(true)
              navigate('/')
              console.log('logged in')
            }
            else if (response.data === "Invalid password")
            {
              console.log("invalid password")
              setPassError(response.data)
            }
            else if (response.data === "No any user exist with that email")
              {
                console.log("invalid email or password")
                setPassError("invalid password")
                setMailError("invalid email")
              }
            else
            {
                setMailError("server cannot be connected")
                setPassError("check internet connection")
            }
            
        })
        .catch((err)=>
        {
            console.log("some error occurred while sending data for verification in the backend", err)
            setMailError("server cannot be connected")
            setPassError("check internet connection")
        })
    }
  return (
    <div className="login">
      <div className="text-content">
        <span className="large-text">facebook</span>
        <span className="small-text">
          Connect with friends and the world <br /> around you on Facebook.
        </span>
      </div>
      <div className="form-container">
        <form className="form-content" method="post" onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email or phone number"
            name="email"
            autoComplete="off"
            onChange={(e)=>setEmail(e.target.value)}
            required
          />
          <p className="errors">{mailError}</p>
          <input
            type={passState?"text":"password"}
            placeholder=" Password"
            name="password"
            autoComplete="off"
            onChange={(e)=>setPassword(e.target.value)}
            required
          />
          <i className="show-hide" onClick={()=>{passState?setPassState(false):setPassState(true)}}>{passState?<ImEye />:<ImEyeBlocked />}</i>
          <p className="errors">{passError}</p>
          <button type="submit" className="login-btn">
            Log In
          </button>
          <Link to="/forgotPassword" className="forgot">
            Forgot password?
          </Link>
          <button className="create-btn">
            <Link to="/signup"> Create new account </Link>
          </button>
        </form>
        <div className="create-page">
          <Link to="/createPage" className="bolder-text">
            Create a Page
          </Link>{" "}
          for a celebrity, brand or business.
        </div>
      </div>
    </div>
  );
};