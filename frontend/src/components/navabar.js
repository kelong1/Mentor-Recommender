import React from 'react'
import{Link,useNavigate} from "react-router-dom"
import{useSelector,useDispatch} from "react-redux";
import{logout,reset} from "../features/auth/authSlice";
// import{logout,reset}from "../features/mentor/mentorSlice"


const Navbar = () => {
 
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const{user}=useSelector((state)=>state.auth)

  const onLogout=()=>{
      dispatch(logout())
      dispatch(reset())
  
  }
const findMentor=()=>{
  const isUserLoggedIn = user && user.token
  if(isUserLoggedIn){
    navigate('/menteeform' )
  }else{
    navigate('/login')
  }
}

  return (
    <nav className="navbar-container">
      <div className="logo">
     MentorHub
      </div>
      <ul className="nav-list">
        <li><a href="/home">Home</a></li>
        <li><a href="/about">About</a></li>
        <li><a href="/contact">Contact</a></li>
        {user?( 
                    <li>
                    <button className='btn btn-dark' onClick={onLogout}>Logout</button>
                     </li>):(<>
                     <li>
                      <a href='/login'> Login</a>
                     </li>
                     <li>
                     <a href="/register">Register</a>
                     </li></>)}
                   <li className='username'>HI {user && user.username}</li>  
                   
      </ul>
      <button>Profile</button>
      <button className="find-mentor-btn" onClick={findMentor}>Find a Mentor</button>

    </nav>
  );
};

export default Navbar;
