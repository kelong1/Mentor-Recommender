// // MentorList.js
// import React, { useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { fetchMentors, selectMentors } from '../features/mentors/mentorsSlice';

// const MentorList = () => {
//   const dispatch = useDispatch();
//   const mentors = useSelector(selectMentors);

//   useEffect(() => {
//     // Fetch mentors when the component mounts
//     dispatch(fetchMentors());
//   }, [dispatch]);

//   return (
//     <div>
//       <h2>Mentor List</h2>
//       <ul>
//         {mentors.map((mentor) => (
//           <li key={mentor.id}>{mentor.name}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default MentorList;
