// Login.js
import React, { useState,useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login,reset } from '../features/auth/authSlice';
import {toast}from "react-toastify";

const Login = () => {
  const dispatch = useDispatch();
  const navigate=useNavigate();
  // const { loading, error } = useSelector((state) => state.auth);
  const {user,isError,isSuccess,message}=useSelector((state)=>state.auth)
  useEffect(()=>{
    if(isError){
      toast.error("message")
    }
    if(isSuccess||user){
      navigate("/home")
    }
    dispatch(reset())
  },[user,isError,isSuccess,message,navigate,dispatch])
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
 
  const handleSubmit = async (e) => {
    e.preventDefault();
      const userData = {
        email,
        password,
      };
   dispatch(login(userData))
   
  };

  return (
    <section className='login'>
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <ul className='loginType'>
          <li><a href="/login">Mentee</a></li>
          <li><a href="/mentorLogin">Mentor</a></li>
        </ul>
        <label>Email:</label>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Login</button>
       
        <p>Dont  have an account  <a href="/register">Register here</a></p>
      </form>
    </div>
    </section>
  );
};

export default Login;
