import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectMentorshipRequests } from '../features/mentor/mentorshipSlice';

const Dashboard = () => {
  const dispatch = useDispatch();
  const mentorshipRequests = useSelector(selectMentorshipRequests);

  useEffect(() => {
    // Fetch mentorship requests when the component mounts
    // You may want to dispatch an action to fetch the data from the backend
    // dispatch(fetchMentorshipRequests());
  }, [dispatch]);

  const filterRequestsByStatus = (status) =>
    mentorshipRequests.filter((request) => request.status === status);

  return (
    <div>
      <h2>Dashboard</h2>
      <div className="dashboard-section">
        <div className="pending-requests">
          <h3>Pending Mentorships</h3>
          {filterRequestsByStatus('pending').map((request) => (
            <div key={request._id}>
              {/* Display mentorship details, e.g., mentor/mentee name, timestamp, etc. */}
              <p>{request.mentorId.username} - {request.status}</p>
            </div>
          ))}
        </div>

        <div className="accepted-requests">
          <h3>Accepted Mentorships</h3>
          {filterRequestsByStatus('accepted').map((request) => (
            <div key={request._id}>
              {/* Display mentorship details */}
              <p>{request.mentorId.username} - {request.status}</p>
            </div>
          ))}
        </div>

        <div className="completed-requests">
          <h3>Completed Mentorships</h3>
          {filterRequestsByStatus('completed').map((request) => (
            <div key={request._id}>
              {/* Display mentorship details */}
              <p>{request.mentorId.username} - {request.status}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
