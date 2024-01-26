
import axios from "axios"


const API="http://localhost:7000/app/mentees/"
const register=async(userData)=>{
    const response=await axios.post(API+"registerr",userData)

    if(response.data){
        localStorage.setItem('user',JSON.stringify(response.data))
    }

    return response.data
}
const login=async(userData)=>{
    const response=await axios.post(API+"loginn",userData)

    if(response.data){
        localStorage.setItem('user',JSON.stringify(response.data))
    }

    return response.data
}
const logout=async()=>{
    localStorage.removeItem("user")
    
}


const authService={
    register,
    login,
    logout
}
export default  authService