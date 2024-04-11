import axios from "axios";

const URL = 'http://localhost:8000'

export const generatePaper=async(paperD)=>{
    try {
        return axios.post(`${URL}/genpaper`,paperD,{
            headers:{
                "Authorization":`Bearer ${localStorage.getItem('token')}`
            }
        })
    } catch (error) {
        console.log("error in client while generate paper",error)
    }
}

export const getGenPaper= async(id)=>{
    try {
        const res =  await axios.get(`${URL}/getgenpaper/${id}`,{
            headers:{
                "Authorization":`Bearer ${localStorage.getItem('token')}`
            }
        })
        return res;
    } catch (error) {
        console.log("Error while get generated paper ",error)
    }
} 
export const getOverAllPapers=async()=>{
    try {
        const res = await axios.get(`${URL}/getallBspapers`,{
            headers:{
                "Authorization":`Bearer ${localStorage.getItem('token')}`
            }
        })
        return res;
    } catch (error) {
        console.log("error in client while getting over all papers")
    }
}
export const getNumofQtn=async(pDtl)=>{
    try {
        return await axios.post(`${URL}/getnumofqtn`,pDtl,{
            headers:{
                "Authorization":`Bearer ${localStorage.getItem('token')}`
            }
        })
    } catch (error) {
        console.log("Error in client while geting num of paper")
    }
}
export const addProgram =async(program)=>{
    try{
        return await axios.post(`${URL}/addprogram`,program,{
            headers:{
                "Authorization":`Bearer ${localStorage.getItem('token')}`
            }
        })
    }catch(err){
        console.log("error in client api while add program : ", err)
    }
}

export const getProgram =async()=>{    
    try{
        return await axios.get(`${URL}/getprogram`,{
            headers:{
                "Authorization":`Bearer ${localStorage.getItem('token')}`
            }
        })
    }catch(err){
        console.log('error in clinet while get program',err)
    }
}

export const addSemester = async(semester)=>{
    try{
        return await axios.post(`${URL}/addsemester`,semester,{
            headers:{
                "Authorization":`Bearer ${localStorage.getItem('token')}`
            }
        })
    }catch(err){
        console.log('error in client in adding semester', err)
    }
}

export const getSemester=async()=>{
    try{
        return await axios.get(`${URL}/getsemester`,{
            headers:{
                "Authorization":`Bearer ${localStorage.getItem('token')}`
            }
        })
    }catch(err){
        console.log('error in client in get semesters: ',err)
    }
}

export const addPaper=async(paper)=>{
    try {
        return await axios.post(`${URL}/addpaper`,paper,{
            headers:{
                "Authorization":`Bearer ${localStorage.getItem('token')}`
            }
        })
    } catch (error) {
        console.log("error in client in add paper",error)
    }
}
export const getPaper=async()=>{
    try {
        return await axios.get(`${URL}/getpaper`,{
            headers:{
                "Authorization":`Bearer ${localStorage.getItem('token')}`
            }
        })
    } catch (error) {
        console.log('error in client in get paper')
    }
}

export const addShortQtn =async(short)=>{
    try {
        return await axios.post(`${URL}/addshortqtn`,short,{
            headers:{
                "Authorization":`Bearer ${localStorage.getItem('token')}`
            }
        })
    } catch (error) {
        console.log("error in client in add short qtn",error)
        
    }
}

export const addLongQtn= async(long)=>{
    try {
        return await axios.post(`${URL}/addlongqtn`,long,{
            headers:{
                "Authorization":`Bearer ${localStorage.getItem('token')}`
            }
        })
    } catch (error) {
        console.log("error in client in long short qtn",error)
    }
}

export const addMcqs=async(mcqs)=>{
    try {
        return await axios.post(`${URL}/addmcqs`,mcqs,{
            headers:{
                "Authorization":`Bearer ${localStorage.getItem('token')}`
            }
        })
    } catch (error) {
        console.log("error in client in Mcq's ",error)
    }
}

export const signupUser=async(user)=>{
    try {
        return await axios.post(`${URL}/signup`,user)
    } catch (error) {
        console.log('error in client in signup user ',error)
    }
}

export const loginUser=async(user)=>{
    try {
        return await axios.post(`${URL}/login`,user)
    } catch (error) {
        console.log("error in client in login user: ",error)
    }
}

export const addUserSubject=async(subject)=>{
    try {
        return await axios.put(`${URL}/addusersubject`,subject,{
            headers:{
                "Authorization":`Bearer ${localStorage.getItem("token")}`
            }
        })
    } catch (error) {
        console.log("error in client in add user subject : ",error)        
    }
}

export const DeleteBsPaperById=async(id)=>{
    try {
        return await axios.delete(`${URL}/deletebspaper/${id}`,{
            headers:{
                "Authorization":`Bearer ${localStorage.getItem("token")}`
            }
        })
    } catch (error) {
        console.log("error in client delete paper by Id : ",error)
    }
}