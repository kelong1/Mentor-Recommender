import { createSlice } from '@reduxjs/toolkit';

export const recommendedMentorsSlice = createSlice({
  name: 'recommendedMentors',
  initialState: [],
  reducers: {
    setRecommendedMentors: (state, action) => action.payload,
    setSelectedMentor: (state, action) => {
      state.selectedMentor = action.payload;
    },
  },

});

export const { setRecommendedMentors,setSelectedMentor  } = recommendedMentorsSlice.actions;

export const selectRecommendedMentors = (state) => state.recommendedMentors;
export const selectSelectedMentor = (state) => state.recommendedMentors.selectedMentor;
export default recommendedMentorsSlice.reducer;
