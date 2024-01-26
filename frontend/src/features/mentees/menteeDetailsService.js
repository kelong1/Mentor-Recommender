import axios from 'axios';
// const API_URL_MENTEE='http://localhost:7000/app/mentees';



export const fetchRecommendedMentors = async (menteeInput) => {
  try {
   
    const response = await axios.post("http://localhost:5000/recommend", { mentee_input: menteeInput });
    if(response.data){
      localStorage.setItem('recommendedMentors',JSON.stringify(response.data))
  }

  return response.data
  } catch (error) {
    console.error('Error fetching recommended mentors:', error);
    throw error;
  }
};


