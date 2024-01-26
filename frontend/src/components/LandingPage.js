
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const MentorLanding = () => {
  const navigate = useNavigate();

  
  const {user} = useSelector((state) => state.auth);

  const handleGetStarted = () => {

    const isUserLoggedIn = user && user.token
  if(isUserLoggedIn){
    navigate('/menteeform' )
  }else{
    navigate('/login')
  }
  };

  return (
    <div className="mentor-landing-container">
      <div className="welcome-text">
        <h1>Welcome to MentorHub</h1>
        <p>Your Journey Starts Here</p>
      </div>
      <button className="get-started-btn" onClick={handleGetStarted}>
      {user ? 'Find Mentor' : 'Get Started'}

      </button>
    </div>
  );
};

export default MentorLanding;

