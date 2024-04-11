import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import * as api from '../RTKApi'

export const allPapers = createAsyncThunk("paper/allpapers",
    async () => {
        try {
            const response = await api.getAllPapers();
            return response.data
        } catch (error) {
            console.log("error in paper slice : ", error)
        }
    })

export const deleteById = createAsyncThunk("paper/deletebyid",
    async (id, { rejectWithValue }) => {
        try {
            const res = await api.deletePaperById(id);
            return res.data;
        } catch (error) {
            return rejectWithValue(error)
        }

    })

export const lockPaperById = createAsyncThunk("paper/lock",
    async (id, { rejectWithValue }) => {
        try {
            const res = await api.lockPaper(id);
            return res.data;
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

const paperSlice = createSlice({
    name: "paper",
    initialState: {
        loginsPapers: [],
        Papers: [],
        genPaperDetails: {},
        singlePaper: {},
        loading: false,
        error: "",
    },
    reducers: {
        setPaperDetails: (state, action) => {
            state.genPaperDetails = action.payload;
        },
        setPaperById: (state, action) => {
            state.singlePaper = action.payload;
        },

    },
    extraReducers: (builder) => {
        // Get all paper life cycle methods
        builder.addCase(allPapers.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(allPapers.fulfilled, (state, action) => {
            state.loading = false;
            state.loginsPapers = action.payload.loginsPapers;
            state.Papers = action.payload.Papers;
        })
        builder.addCase(allPapers.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })

        // delete paper by id life Cycle Methods
        builder.addCase(deleteById.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(deleteById.fulfilled, (state, action) => {
            state.loading = false;
            const { arg } = action.meta.arg;
            if (arg) {
                state.papers = state.papers.filter((paper) => arg !== paper._id)
            }
        })
        builder.addCase(deleteById.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;

        })

        // Lock Paper By Id Life Cycle methods
        builder.addCase(lockPaperById.pending, (state, action) => {
            state.loading = true;
        })
        builder.addCase(lockPaperById.fulfilled, (state, action) => {
            state.loading = false;
            const { newPaper } = action.payload;
            const { arg } = action.meta;

            console.log(newPaper)

            state.loginsPapers = state.loginsPapers.map((paper)=> arg===paper._id?newPaper:paper)
            state.Papers = state.Papers.map((paper)=> arg===paper._id?newPaper:paper)

            // state.papers.loginsPapers = state.papers.loginsPapers.map((paper) => arg === paper._id ? newPaper : paper)
            // state.papers.Papers = state.papers.Papers.map((paper) => arg === paper._id ? newPaper : paper)

        })
        builder.addCase(lockPaperById.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })

    }// end of ExtraReducers
})

export default paperSlice.reducer;
export const { setPaperDetails, setPaperById, } = paperSlice.actions;