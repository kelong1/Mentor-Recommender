
import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import mentService from "../mentor/mentorService"

const mentor=JSON.parse(localStorage.getItem("mentor"))
// const mentor=JSON.parse(localStorage.getItem("mentor"))
const initialState={

    mentor:mentor ?mentor:null,
    // mentor:mentor?mentor:null,
    isError:false,
    isSuccess:false, 
    isLoading:false,
    message:''
}
export const login=createAsyncThunk("mentor/login",async(mentor,thunkAPI)=>{
    try {
        return await mentService.login(mentor)
    } catch (error) {
        const message=(error.response && error.response.data && error.response.data.message)
        return thunkAPI.rejectWithValue(message)
    }
    
    })
    // export const fetchIndividualMentor=createAsyncThunk("mentor/fetchindividualmentor",async(mentor,thunkAPI)=>{
    //   try {
    //       return await mentService.fetchIndividualMentor(mentor)
    //   } catch (error) {
    //       const message=(error.response && error.response.data && error.response.data.message)
    //       return thunkAPI.rejectWithValue(message)
    //   }
      
    //   })
export const logout=createAsyncThunk("auth/logout",async()=>{
    await mentService.logout()
})

export const mentSlice=createSlice({
    name:"ment",
    initialState,
    reducers:{
        reset:(state)=>{
            state.isLoading=false
            state.isError=false
            state.isSuccess=false
            state.message=""
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(login.pending,(state)=>{
            state.isLoading=true
    })
    .addCase(login.fulfilled,(state,action)=>{
        state.isLoading=false
        state.isSuccess=true
        state.mentor=action.payload
    })
    .addCase(login.rejected,(state,action)=>{
        state.isLoading=false
        state.isError=true
        state.message=action.payload
        state.mentor=null
    })
    .addCase(logout.fulfilled,(state)=>{
        state.mentor=null
    })
    }

})
export const {reset}=mentSlice.actions
export default mentSlice.reducer
