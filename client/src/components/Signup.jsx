import React, { useState } from "react";
import { Link, useNavigate} from "react-router-dom";
import "../styles/LoginSignup.css";
import axios from 'axios';
import { ImEyeBlocked } from "react-icons/im";
import { ImEye } from "react-icons/im";


export const Signup = () => {
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [passState, setPassState] = useState(false);
    const navigate = useNavigate();

    const handleSignup = (e)=>
    {
        e.preventDefault();
        axios.post('http://localhost:3001/signup', {firstName, lastName, email, password})
        .then(()=>{
            console.log("Sucessfully sent to backend")
            navigate('/login')
            })
        .catch((err)=>{
            console.log("Got error while sending data to the backend due to ", err)
            })
    }
  return (
    <div className="signup">
      <div className="text-content">
        <span className="large-text">facebook</span>
        <span className="small-text">
          Connect with friends and the world <br /> around you on Facebook.
        </span>
      </div>
      <div className="form-container">
        <form className="form-content" method="post" onSubmit={handleSignup}>
          <input
            type="text"
            placeholder="First name"
            name="firstName"
            autoComplete="off"
            onChange={(e)=>setFirstName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Last name"
            name="lastName"
            autoComplete="off"
            onChange={(e)=>setLastName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email or phone number"
            name="email"
            autoComplete="off"
            onChange={(e)=>setEmail(e.target.value)}
            required
          />
          <input
            type={passState?"text":"password"}
            placeholder=" New Password"
            name="password"
            autoComplete="off"
            onChange={(e)=>setPassword(e.target.value)}
            required
          />
          <i className="show-hide for-signup" onClick={()=>{passState?setPassState(false):setPassState(true)}}>{passState?<ImEye />:<ImEyeBlocked />}</i>
          <button className="signup-btn" type="submit">
            Sign Up
          </button>
          <Link to="/login" className="already">
            Already have an account?
          </Link>
        </form>
      </div>
    </div>
  );
};
