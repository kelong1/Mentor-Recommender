import React from 'react';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Register from './components/Register';
import LandingPage from './components/LandingPage';
import AboutUs from './components/AboutUs';
import Navbar from './components/navabar';
// import MentorList from './components/MentorList';
import MenteeProfile from './components/MenteeProfile';

 import MentorLogin from './components/MentorLogin';
import MenteeForm from './components/MenteeForm';
import RecommendedMentorsList from './components/RecommendedMentorsList';
import MentorDetails from './components/MentorDetails';
import MentorshipRequestsList from './components/MentorshipRequestsList';



function App() {
  return (
    <div className="App">
      
      <Router>
      <Navbar/>
      <Routes>
      <Route path='/home' element={<LandingPage/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/about' element={<AboutUs/>}/>
      {/* <Route path='/mentorlist' element={<MentorList/>}/> */}
       <Route path='/menteeprofile' element={<MenteeProfile/>}/> 
      <Route path='/mentorLogin' element={<MentorLogin/>}/>
      <Route path='/menteeform' element={<MenteeForm/>}/>
       <Route path='/recommendedMentors' element={<RecommendedMentorsList/>}/>
       <Route path='/selectedMentor/:mentorId' element={<MentorDetails/>}/>
       <Route path='/list' element={<MentorshipRequestsList/>}/>
      </Routes>
      </Router>
    </div>
  );
}

export default App;
