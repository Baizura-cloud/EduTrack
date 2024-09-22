import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../client";

export const fetchClassStudent = createAsyncThunk('fetch-class', async(email)=>{
    if(!email){
        throw new Error("Data undefined")
    }
    try {
        const response = await supabase.from('class').select('*').eq('admin', email)
        console.log(response)
        return response
    } catch (error) {
        console.log(error)
    }
})

const classSlice = createSlice({
    name:'studentclass',
    initialState:{ data: [], fetchstatus:''},
    reducers:{},
    extraReducers: (buider) =>{
        buider
        .addCase(fetchClassStudent.fulfilled, (state, action)=>{
            state.data = action.payload.data
            state.fetchstatus = 'success'
        })
        .addCase(fetchClassStudent.pending, (state)=>{
            state.fetchstatus = 'pending'
        })
        .addCase(fetchClassStudent.rejected, (state)=>{
            state.fetchstatus = 'error'
        })
    }
})

export default classSlice