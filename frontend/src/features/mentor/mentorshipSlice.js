// import { createSlice } from '@reduxjs/toolkit';

// const mentorshipSlice = createSlice({
//   name: 'mentorship',
//   initialState: {
//     requestedMentors: [],
//   },
//   reducers: {
//     requestMentorship: (state, action) => {
//       const mentor = action.payload;
//       state.requestedMentors.push(mentor);
//     },
//     cancelMentorship: (state, action) => {
//       const mentorId = action.payload._id;
//       state.requestedMentors = state.requestedMentors.filter((mentor) => mentor._id !== mentorId);
//     },
//   },
// });

// export const { requestMentorship, cancelMentorship } = mentorshipSlice.actions;
// export const selectRequestedMentors = (state) => state.mentorship.requestedMentors;

// export default mentorshipSlice.reducer;
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from "axios"

// Async thunk for sending mentorship request
export const sendMentorshipRequest = createAsyncThunk(
  'mentorship/sendRequest',
  async ({ menteeId, mentorId }) => {
    const response = await axios.post('http://localhost:7000/app/mentorships/send-request', { menteeId, mentorId });
    return response.data;
  }
);

// Async thunk for getting mentorship requests
export const getMentorshipRequests = createAsyncThunk(
  'mentorship/getRequests',
  async (userId) => {
    const response = await axios.get(`http://localhost:7000/app/mentorships/get-requests/${userId}`);
    return response.data.mentorshipRequests;
  }
);

// Async thunk for responding to mentorship request
export const respondToMentorshipRequest = createAsyncThunk(
  'mentorship/respondRequest',
  async ({ requestId, response }) => {
    const responseData = await axios.post('http://localhost:7000/app/mentorships/respond-request', { requestId, response });
    return responseData.data;
  }
);

// Initial state
const initialState = {
  mentorshipRequests: [],
  status: 'idle',
  error: null,
};

// Mentorship slice
const mentorshipSlice = createSlice({
  name: 'mentorship',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(sendMentorshipRequest.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(sendMentorshipRequest.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // You may update the state if needed, e.g., add the sent request to local state
      })
      .addCase(sendMentorshipRequest.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(getMentorshipRequests.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getMentorshipRequests.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.mentorshipRequests = action.payload;
      })
      .addCase(getMentorshipRequests.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(respondToMentorshipRequest.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(respondToMentorshipRequest.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Update the state based on the response if needed
      })
      .addCase(respondToMentorshipRequest.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default mentorshipSlice.reducer;
