
import { useDispatch } from 'react-redux';


import { setRecommendedMentors } from '../features/mentor/RecommendedMentorsSlice';

import React, { useState } from 'react';
import { setMenteeInput } from '../features/mentees/MenteeDetailsSlice';
import RecommendedMentorsList from './RecommendedMentorsList';

const MenteeForm = () => {
  const [inputValue, setInputValue] = useState('');
  const dispatch = useDispatch();
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleRecommend = async () => {
    try {
      dispatch(setMenteeInput(inputValue));
      console.log(inputValue)
      const response = await fetch('http://127.0.0.1:5000/recommend', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ mentee_input: inputValue }),
      });

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const recommendedMentors = await response.json();
      dispatch(setRecommendedMentors(recommendedMentors));
      console.log('Recommended Mentors:', recommendedMentors);
    } catch (error) {
      console.error('Error fetching recommended mentors:', error);
    }
  };

  return (
    <div className="mentee-form-container">
    <h2>Mentee Form</h2>
    <textarea
      className="textarea-input"
      rows="4"
      placeholder="Enter your details (about, experience, education)"
      value={inputValue}
      onChange={handleInputChange}
    ></textarea>
    <button className="recommend-button" onClick={handleRecommend}>
      Recommend Mentors
    </button>
    <div>
      <RecommendedMentorsList />
    </div>
  </div>
  );
};

export default MenteeForm;
