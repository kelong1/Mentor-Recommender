
import { configureStore } from '@reduxjs/toolkit';
import mentReducer from "../features/mentor/mentorSlice"
import authReducer from "../features/auth/authSlice";
import menteeDetailsReducer from '../features/mentees/MenteeDetailsSlice';
import recommendedMentorsReducer from '../features/mentor/RecommendedMentorsSlice';
import selectedMentorReducer from '../features/mentor/SelectedMentorSlice';
import mentorshipReducer from '../features/mentor/mentorshipSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    ment: mentReducer,
    menteeDetails: menteeDetailsReducer,
    recommendedMentors: recommendedMentorsReducer,
    selectedMentor: selectedMentorReducer,
    mentorship: mentorshipReducer,
  },
});
