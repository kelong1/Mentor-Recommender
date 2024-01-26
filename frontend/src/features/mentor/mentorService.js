

import axios from "axios"

const API="http://localhost:7000/app/mentors/"

const login=async(name)=>{
    const response=await axios.post(API+"login",{name})

    if(response.data){
        localStorage.setItem('user',JSON.stringify(response.data))
    }

    return response.data
}
// const fetchIndividualMentor=async(name)=>{
//   const response=await axios.post(API+"getMentor",{name})

//   if(response.data){
//       localStorage.setItem('mentor',JSON.stringify(response.data))
//   }

//   return response.data
// }
const logout=async()=>{
    localStorage.removeItem("user")

}


const mentService={
    login,
    logout,
    // fetchIndividualMentor
}
export default  mentService
