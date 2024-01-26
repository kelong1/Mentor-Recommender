import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { selectRecommendedMentors } from '../features/mentor/RecommendedMentorsSlice';
import { sendMentorshipRequest } from '../features/mentor/mentorshipSlice';

const MentorDetails = () => {
  const { mentorId } = useParams();
  const dispatch = useDispatch();
  const recommendedMentors = useSelector(selectRecommendedMentors);
  const {user} = useSelector((state) => state.auth);

  // Find the mentor with the matching ID
  const mentor = recommendedMentors.find((m) => m._id === mentorId);

  if (!mentor) {
    return <div>Mentor not found</div>;
  }
 

  const handleRequestMentorship = async () => {
    try {
      if(user && user._id){
        console.log(user._id)
      }
      await dispatch(sendMentorshipRequest({ menteeId: user._id, mentorId }));
      // You can add additional logic here, e.g., display a success message
    
    } catch (error) {
      console.error('Error requesting mentorship:', error);
      // Handle errors, e.g., display an error message
    }
  };

  // const handleCancelMentorship = async () => {
  //   try {
  //     // Dispatch an action to remove the mentor from the requested mentors array
  //     await dispatch(cancelMentorship(mentor));
  //     // You can add additional logic here, e.g., display a success message
  //   } catch (error) {
  //     console.error('Error canceling mentorship:', error);
  //     // Handle errors, e.g., display an error message
  //   }
  // };

  return (
    <div>
      <h2>Mentor Details</h2>
      <div className="mentor-details">
        <div className="image-section">
          
        </div>
        <div className="details-section">
          <h3>{mentor.name}</h3>
          <p>{mentor.position}</p>
          <p>{mentor.about}</p>
          {/* Add more mentor details here */}
        </div>
      </div>
      <div className="mentorship-buttons">
        <button onClick={handleRequestMentorship}>Request Mentorship</button>
       
      </div>
    </div>
  );
};

export default MentorDetails;
