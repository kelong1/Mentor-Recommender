import { createSlice } from '@reduxjs/toolkit';

export const selectedMentorSlice = createSlice({
  name: 'selectedMentor',
  initialState: [],
  reducers: {
    setSelectedMentor: (state, action) => action.payload,
  },
});

export const { setSelectedMentor } = selectedMentorSlice.actions;

export const selectSelectedMentor = (state) => state.selectedMentor;

export default selectedMentorSlice.reducer;
