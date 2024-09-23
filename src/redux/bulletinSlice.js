import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../client";

export const fetchBulletin = createAsyncThunk('fetch-bulletin', async()=>{
    try {
        const response = await supabase.from('bulletin').select('*')
        return response
    } catch (error) {
        console.log(error)
    }
})

export const deleteBulletin = createAsyncThunk('delete-bulletin', async(id,{rejectWithValue})=>{
    if(!id){
        throw new Error("Data Undefined")
    }
    try {
        const {error} = await supabase.from('bulletin').delete().eq("id", id)
        if(error){
            rejectWithValue(error.message)
        }
    } catch (error) {
        console.log(error)
    }
})

export const createBulletin = createAsyncThunk('create-bulletin', async(data,{rejectWithValue})=>{
    if(!data){
        throw new Error("Data Undefined")
    }
    try {
        const {response, error} = await supabase.from('bulletin').insert(data)
        if(error){
            rejectWithValue(error.message)
        }
        return response
    } catch (error) {
        console.log(error)
    }
})

export const updateBulletin = createAsyncThunk('update-bulletin', async(data,{rejectWithValue})=>{
    if(!data){
        throw new Error("Data Undefined")
    }
    try {
        const {response, error} = await supabase.from('bulletin').update(data).eq("id", data.id)
        if(error){
            rejectWithValue(error.message)
        }
        return response
    } catch (error) {
        console.log(error)
    }
})

const bulletinSlice = createSlice({
    name:'bulletin',
    initialState: {data:[], fetchstatus: ''},
    reducers:{},
    extraReducers: (builder) =>{
        builder
        .addCase(fetchBulletin.fulfilled, (state, action)=>{
            state.data = action.payload.data
            state.fetchstatus = 'success'
        })
        .addCase(fetchBulletin.pending, (state)=>{
            state.fetchstatus = 'pending'
        })
        .addCase(fetchBulletin.rejected, (state)=>{
            state.fetchstatus = 'error'
        })
        .addCase(deleteBulletin.fulfilled, (state)=>{
            state.fetchstatus = 'success'
        })
        .addCase(deleteBulletin.pending, (state)=>{
            state.fetchstatus = 'pending'
        })
        .addCase(deleteBulletin.rejected, (state)=>{
            state.fetchstatus = 'error'
        })
        .addCase(createBulletin.fulfilled, (state, action) =>{
            state.fetchstatus = 'success'
        })
        .addCase(createBulletin.pending, (state)=>{
            state.fetchstatus = 'pending'
        })
        .addCase(createBulletin.rejected, (state)=>{
            state.fetchstatus = 'error'
        })
        .addCase(updateBulletin.fulfilled, (state, action) =>{
            state.fetchstatus = 'success'
        })
        .addCase(updateBulletin.pending, (state)=>{
            state.fetchstatus = 'pending'
        })
        .addCase(updateBulletin.rejected, (state)=>{
            state.fetchstatus = 'error'
        })
    }
})

export default bulletinSlice