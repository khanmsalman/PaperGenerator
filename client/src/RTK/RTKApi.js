import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:8000" })

API.interceptors.request.use((req) => {
    if (localStorage.getItem("token")) {
        req.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    }
    return req;
})


export const getAllPapers=()=>{
    return API.get('/getallpapers')
}

export const deletePaperById=(id)=>{
    return API.delete(`/deletebyid/${id}`)
}

export const lockPaper=async(paperId)=>{
    return API.put(`/lockpaper/${paperId}`)
}

export const getAllUsers=async()=>{
    return API.get('/getusers')
}

export const updateAdmin=async(userId)=>{
        return API.put(`/updateadmin/${userId}`)
}

export const signUp=(user)=>{
    return API.post('/signup',user)
}

export const logIn=(user)=>{
    return API.post('/login',user)
}

export const deleteSubject=(subject)=>{
        return  API.post(`/deletesubject`,subject)
}

export const deleteUser=(id)=>{
    return API.delete(`/deleteuserbyid/${id}`)
}







// const URL = "http://localhost:8000"


// export const getAllPapers=()=>{
//     return axios.get(`${URL}/getallpapers`,{
//         headers:{
//             "Authorization":`Bearer ${localStorage.getItem('token')}`
//         }
//     })
// }