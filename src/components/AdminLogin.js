import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from '../config/firebase';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";


const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate()

  const logInHandler = (e) => {
    e.preventDefault();
    console.log("sasaddsa")
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        alert("User Sign In successfully")
        navigate('/admindashboard')
        
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert("Credential Issues")
      });

  }


  return (
    <section className="signup">
      <div className="container mt-5">
        <div className="signup-content">
          <div className="signup-form">
            <h2 className="form-title">Admin Login</h2>

            <form className="userform" onSubmit={logInHandler}>

              <input type="email" placeholder="Your Email" name='email' id='email' autoComplete='off' value={email} onChange={(e) => setEmail(e.target.value)} />

              <input type="password" placeholder="Password" name='password' id='password' autoComplete='off' value={password} onChange={(e) => setPassword(e.target.value)} />

              <button className="registerBtn">Log In</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AdminLogin