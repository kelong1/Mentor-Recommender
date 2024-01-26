import {createSlice} from "@reduxjs/toolkit";


const menteeDetailsSlice = createSlice({
  name: 'menteeDetails',
  initialState: {
    menteeInput: '',
  },
  reducers: {
    setMenteeInput: (state, action) => {
      state.menteeInput = action.payload;
    },
  },
});

export const { setMenteeInput } = menteeDetailsSlice.actions;
export const selectMenteeInput = (state) => state.menteeDetails.menteeInput;

export default menteeDetailsSlice.reducer;
