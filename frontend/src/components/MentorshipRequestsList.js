import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMentorshipRequests } from '../features/mentor/mentorshipSlice';

const MentorshipRequestsList = ({ userId }) => {
  const dispatch = useDispatch();
  const mentorshipRequests = useSelector((state) => state.mentorship.mentorshipRequests);

  useEffect(() => {
    dispatch(getMentorshipRequests(userId));
  }, [dispatch, userId]);

  return (
    <div>
      <h2>Mentorship Requests</h2>
      <ul>
        {mentorshipRequests.map((request) => (
          <li key={request._id}>
            {request.menteeId.username} has {request.status === 'accepted' ? 'accepted' : 'pending'} your mentorship request.
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MentorshipRequestsList;
