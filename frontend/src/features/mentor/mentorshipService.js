import axios from "axios"
// Service function to send mentorship request
export const sendMentorshipRequestService = async ({ menteeId, mentorId }) => {
  try {
    const response = await axios.post('http://localhost:7000/app/mentorships/send-request', { menteeId, mentorId });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Service function to get mentorship requests
export const getMentorshipRequestsService = async (userId) => {
  try {
    const response = await axios.get(`http://localhost:7000/app/mentorships/get-requests/${userId}`);
    return response.data.mentorshipRequests;
  } catch (error) {
    throw error;
  }
};

// Service function to respond to mentorship request
export const respondToMentorshipRequestService = async ({ requestId, response }) => {
  try {
    const responseData = await axios.post('http://localhost:7000/app/mentorships/respond-request', { requestId, response });
    return responseData.data;
  } catch (error) {
    throw error;
  }
};
