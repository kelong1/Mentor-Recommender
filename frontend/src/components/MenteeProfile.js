// import React from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { selectRequestedMentors, cancelMentorship } from '../features/mentor/mentorshipSlice';


// const MenteeProfile = () => {
//   const dispatch = useDispatch();
//   const requestedMentors = useSelector(selectRequestedMentors);

//   const handleCancelRequest = (mentorId, mentorName) => {
//     // Display a confirmation modal before canceling the request
//     const isConfirmed = window.confirm(`Are you sure you want to cancel the mentorship request to ${mentorName}?`);

//     if (isConfirmed) {
//       dispatch(cancelMentorship(mentorId));
//     }
//   };

//   return (
//     <div>
//       <h2>Mentee Profile</h2>
//       {requestedMentors.length === 0 ? (
//         <p>No mentorship requests yet.</p>
//       ) : (
//         <ul>
//           {requestedMentors.map((mentor) => (
//             <li key={mentor.id}>
//               <div>
//                 <strong>{mentor.name}</strong>
//                 <span>{mentor.status === 'pending' ? 'Pending' : 'Accepted'}</span>
//               </div>
//               {mentor.status === 'pending' && (
//                 <button onClick={() => handleCancelRequest(mentor.id, mentor.name)}>Cancel Request</button>
//               )}
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default MenteeProfile;
