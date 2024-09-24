import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {supabase} from "../client"

export const fetchotherprofile = createAsyncThunk('fetch-otherprofile', async()=>{
    try {
        const response = await supabase.from('profile').select('firstname, lastname, email')
        return response        
    } catch (error) {
        console.log(error)
    }
})

const otherprofileSlice = createSlice({
    name: 'otherprofile',
    initialState: {data:[], fetchstatus:''},
    reducers: {},
    extraReducers: (builder) =>{
        builder
        .addCase(fetchotherprofile.fulfilled, (state,action)=>{
            state.data = action.payload.data
            state.fetchstatus = 'success'
        })
        .addCase(fetchotherprofile.pending, (state) =>{
            state.fetchstatus = 'pending'
        })
        .addCase(fetchotherprofile.rejected, (state)=>{
            state.fetchstatus = 'error'
        })
    }
})

export default otherprofileSlice