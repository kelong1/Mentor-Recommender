import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { sendMentorshipRequest } from '../features/mentor/mentorshipSlice';

const SendMentorshipRequestForm = ({ menteeId, mentorId }) => {
  const dispatch = useDispatch();
  const [requestSent, setRequestSent] = useState(false);

  const handleSendRequest = async () => {
    try {
      await dispatch(sendMentorshipRequest({ menteeId, mentorId }));
      setRequestSent(true);
    } catch (error) {
      console.error('Error sending mentorship request:', error);
    }
  };

  return (
    <div>
      {requestSent ? (
        <p>Mentorship request sent!</p>
      ) : (
        <button onClick={handleSendRequest}>Send Mentorship Request</button>
      )}
    </div>
  );
};

export default SendMentorshipRequestForm;
