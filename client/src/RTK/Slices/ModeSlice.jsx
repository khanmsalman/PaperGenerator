import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    mode:'light'
}

const modeSlice = createSlice({
    name:"Mode",
    initialState,
    reducers:{
        setMode:(state,action)=>{
            state.mode = state.mode === 'light' ? 'dark': 'light'
        }
    }
})

export default modeSlice.reducer;
export const {setMode } = modeSlice.actions;