// Register.js
import React, { useState,useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { register,reset } from '../features/auth/authSlice';
import {toast}from "react-toastify";

const Register = () => {
  const dispatch = useDispatch();
  const navigate=useNavigate();
  // const { loading, error } = useSelector((state) => state.auth);
  const {user,isError,isSuccess,message}=useSelector((state)=>state.auth)
  useEffect(()=>{
    if(isError){
      toast.error(message)
    }
    if(isSuccess || user){
      navigate("/home")
    }
    dispatch(reset())
  },[user,isError,isSuccess,message,navigate,dispatch])
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');
  const [accountType, setAccountType] = useState('mentee');
  const [about, setAbout] = useState('');
  const [experience, setExperience] = useState('');
  const [education, setEducation] = useState('');


  const handleSubmit = async (e) => {
    e.preventDefault();
      if(password!==confirmPassword){
        console.error("passwords dont match")
      }else{
      const userData = {
        email,
        password,
        username,
        accountType,
        about,
        experience,
        education,
      };

      dispatch(register(userData));
    }

  };

  return (
    <section className='register'>
    <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <label>Confirm Password:</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        <label>Username:</label>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />

        <label>Account Type:</label>
        <select value={accountType} onChange={(e) => setAccountType(e.target.value)}>
          <option value="mentor">Mentor</option>
          <option value="mentee">Mentee</option>
        </select>

        <label>About:</label>
        <textarea value={about} onChange={(e) => setAbout(e.target.value)} rows="4"></textarea>

        <label>Experience:</label>
        <textarea value={experience} onChange={(e) => setExperience(e.target.value)} rows="4"></textarea>

        <label>Education:</label>
        <textarea value={education} onChange={(e) => setEducation(e.target.value)} rows="4"></textarea>

        <button type="submit">Register</button>
        <p>Already  have an account  <a href="/login">Login here</a></p>
      </form>
    </div>
    </section>
  );
};

export default Register;
// import React, { useState } from 'react';


// const Register = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [username, setUsername] = useState('');
//   const [accountType, setAccountType] = useState('mentee');
//   const [about, setAbout] = useState('');
//   const [experience, setExperience] = useState('');
//   const [education, setEducation] = useState('');

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // Add your registration logic here
//     console.log('Registration submitted:', {
//       email,
//       password,
//       confirmPassword,
//       username,
//       accountType,
//       about,
//       experience,
//       education,
//     });
//   };

//   return (
//     <div className="register-container">
//       <h2>Register</h2>
//       <form onSubmit={handleSubmit}>
//         <label>Email:</label>
//         <input
//           type="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />

//         <label>Password:</label>
//         <input
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />

//         <label>Confirm Password:</label>
//         <input
//           type="password"
//           value={confirmPassword}
//           onChange={(e) => setConfirmPassword(e.target.value)}
//           required
//         />

//         <label>Username:</label>
//         <input
//           type="text"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           required
//         />

//         <label>Account Type:</label>
//         <select value={accountType} onChange={(e) => setAccountType(e.target.value)}>
//           <option value="mentor">Mentor</option>
//           <option value="mentee">Mentee</option>
//         </select>

//         <label>About:</label>
//         <textarea
//           value={about}
//           onChange={(e) => setAbout(e.target.value)}
//           rows="4"
//         ></textarea>

//         <label>Experience:</label>
//         <textarea
//           value={experience}
//           onChange={(e) => setExperience(e.target.value)}
//           rows="4"
//         ></textarea>

//         <label>Education:</label>
//         <textarea
//           value={education}
//           onChange={(e) => setEducation(e.target.value)}
//           rows="4"
//         ></textarea>

//         <button type="submit">Register</button>
//       </form>
//     </div>
//   );
// };

// export default Register;
