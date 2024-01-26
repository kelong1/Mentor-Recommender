// LoginByName.js
import React, { useState,useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login,reset } from '../features/mentor/mentorSlice';
import {toast}from "react-toastify";

const MentorLogin = () => {
  const dispatch = useDispatch();
  const navigate=useNavigate();

  // const { loading, error } = useSelector((state) => state.ment);
  const {user,isError,isSuccess,message}=useSelector((state)=>state.ment)
  useEffect(()=>{
    if(isError){
      toast.error("message")
    }
    if(isSuccess||user){
      navigate("/home")
    }
    dispatch(reset())
  },[user,isError,isSuccess,message,navigate,dispatch])
  const [name, setName] = useState('');
 

  const handleLogin = async (e) => {
    e.preventDefault();
     
   dispatch(login(name))
  };

  return (
    <div className="login-container">
      <h2>Login by Name</h2>
      <label>Name:</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <button onClick={handleLogin}>
        Login
      </button>
    </div>
  );
};

export default MentorLogin;
