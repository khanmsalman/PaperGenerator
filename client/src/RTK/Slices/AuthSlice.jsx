import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as api from '../RTKApi'


export const userSignUp = createAsyncThunk("auth/signup",
    async ({signup,toast,navigate}, { rejectWithValue }) => {
        try {
            const res = await api.signUp(signup);
            if(res.data.name){
                toast(res.data.name+'Sign Up Successfully')
                navigate('/login')
            }
            return res.data;
        } catch (error) {
            console.log("Error in auth signUp slice ", error)
        }
    })

export const userLogin = createAsyncThunk("auth/login",
    async ({login,toast,navigate}, { rejectWithValue }) => {
        try {
            const res = await api.logIn(login);
            if(res.data.user){
                toast(res.data.user.name+' login Successfully')
                navigate('/')
            }
            return res.data;
        } catch (error) {
            console.log("error in auth login slice ", error)
        }
    })

    export const getUsers = createAsyncThunk("auth/getusers",
    async()=>{
        try {
            const res = await api.getAllUsers();
            return res.data;
        } catch (error) {
            console.log("error in auth slice while geting users: ",error)
        }
    })
    
    export const setAdminStatus= createAsyncThunk("auth/setadmin",
    async(userId)=>{
        try {
            const res = await api.updateAdmin(userId)
            return res.data;
        } catch (error) {
            console.log("error in auth slice while geting users: ",error)            
        }
    })

    export const deleteUserSubject = createAsyncThunk("auth/filter",
    async(subject, {rejectWithValue})=> {
        try {
               const res = await api.deleteSubject(subject)
               console.log(res)
               return res.data
        } catch (error) {
            console.log("error in auth delete user subject slice: ",error)
        }
    })


    export const DeleteUserbyId= createAsyncThunk("auth/deleteuser",
    async(userId, rejectWithValue)=>{
        const res = await api.deleteUser(userId);
        return res.data;
    })

export const AuthSlice = createSlice({
    name: "auth",
    initialState: {
        loading: false,
        msg:'',
        token:'',
        user: null,
        users:[],
        error: ''
    },
    reducers: {
        setLoginUser:(state,action)=>{
            state.token=action.payload.token;
            state.user = action.payload.user;
        }
    },
    extraReducers: (builder) => {
        // lifecycle for user signup
        builder.addCase(userSignUp.pending, (state) => {
            state.loading = true
        })
        builder.addCase(userSignUp.fulfilled, (state, action) => {
            state.loading = false
            state.msg = action.payload.message
            
        })
        builder.addCase(userSignUp.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message;
        })

        // lifecycle for user signup
        builder.addCase(userLogin.pending, (state)=>{
            state.loading = true;
        })
        builder.addCase(userLogin.fulfilled, (state,action)=>{
            state.loading = false
            localStorage.setItem("token",action.payload.token)
            localStorage.setItem("user",JSON.stringify(action.payload.user))
            state.token = action.payload.token;
            state.user = action.payload.user
            state.msg  = action.payload.message
        })
        builder.addCase(userLogin.rejected, (state,action)=>{
            state.loading = false
            state.error = action.error.message
        })

        // LIFE Cycle method for filter user subject
        builder.addCase(deleteUserSubject.pending, (state)=>{
            state.loading = true;
        })
        builder.addCase(deleteUserSubject.fulfilled, (state,action)=>{
            state.loading = false;
            state.users = action.payload
        })
        builder.addCase(deleteUserSubject.rejected, (state,action)=>{
            state.loading = false;
        })

        // LIFE Cycle method for Getting subjects
        builder.addCase(getUsers.pending, (state)=>{
            state.loading = true;
        })
        builder.addCase(getUsers.fulfilled, (state,action)=>{
            state.loading = false;
            state.users = action.payload
        })
        builder.addCase(getUsers.rejected, (state,action)=>{
            state.loading = false;
        })
        
        // Life Cyle methods for update user admin status
        builder.addCase(setAdminStatus.pending, (state)=>{
            state.loading = true;
        })
        builder.addCase(setAdminStatus.fulfilled, (state,action)=>{
            state.loading = false;
            const { arg } = action.meta;
            if(arg){
                state.users = state.users.map((user)=>user._id === arg ? action.payload.user : user)
            }
        })
        builder.addCase(setAdminStatus.rejected, (state,action)=>{
            state.loading = false;
        })

        // Life Cycle method of Delete user by admin
        builder.addCase(DeleteUserbyId.pending, (state)=>{
            state.loading = true;
        })
        builder.addCase(DeleteUserbyId.fulfilled, (state,action)=>{
            state.loading = false;
            const {arg} = action.meta;       
            state.users = state.users.filter(user=>arg!==user._id)
        })
        builder.addCase(DeleteUserbyId.rejected, (state,action)=>{
            state.loading = false;
        })
      
    }
})

export default AuthSlice.reducer;
export const {setLoginUser } = AuthSlice.actions;