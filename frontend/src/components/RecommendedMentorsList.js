
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchRecommendedMentors } from '../features/mentees/menteeDetailsService';
import { selectRecommendedMentors, setRecommendedMentors } from '../features/mentor/RecommendedMentorsSlice';
import { selectMenteeInput } from '../features/mentees/MenteeDetailsSlice';
import { useNavigate } from 'react-router-dom';

const RecommendedMentorsList = () => {
  const dispatch = useDispatch();
  const recommendedMentors = useSelector(selectRecommendedMentors);
  const menteeInput = useSelector(selectMenteeInput);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const mentorsData = await fetchRecommendedMentors(menteeInput);
        dispatch(setRecommendedMentors(mentorsData));
      } catch (error) {
        console.error('Error fetching recommended mentors:', error);
      }
    };

    fetchMentors();
  }, [dispatch, menteeInput]);

  const handleRequestMentorship = (mentorId) => {
    console.log(`Request mentorship for mentor with ID: ${mentorId}`);
  };

  const handleViewMentor = (mentorId) => {
    navigate(`/selectedMentor/${mentorId}`);
  };

  return (
    <div>
      <h2>Recommended Mentors</h2>
      <div className="mentor-cards">
        {recommendedMentors.map((mentor) => (
          <div key={mentor._id} className="mentor-card" onClick={() => handleViewMentor(mentor._id)}>
            <div className="image-section">
          
        </div>
            <div className="details-section">
              <h3>{mentor.name}</h3>
              <p>{mentor.position}</p>
              {/* Add more mentor details here */}
            </div>
            <div className="button-section">
              <button onClick={() => handleRequestMentorship(mentor._id)}>Visit profile</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendedMentorsList;
