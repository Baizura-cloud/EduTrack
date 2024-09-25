import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {supabase} from '../client'

export const fetchEvent = createAsyncThunk('fetch-event', async()=>{
    const response = await supabase.from('event').select('*')
    return response
})

export const createEvent = createAsyncThunk('create-event', async(data,{rejectWithValue})=>{
    if(!data){
        throw new Error("Data undefined")
    }
    const {response, error} = await supabase.from('event').insert(data)
    if(error){
        rejectWithValue(error.message)
    }
    return response
})

export const updateEvent = createAsyncThunk('update-event', async(data,{rejectWithValue})=>{
    if(!data){
        throw new Error("Data Undefined")
    }
    const {response, error} = await supabase.from('event').update(data).eq('id', data.id)
    if(error){
        rejectWithValue(error.message)
    }
    return response
})

export const deleteEvent = createAsyncThunk('delete-event', async(id,{rejectWithValue})=>{
    if(!id){
        throw new Error("Data Undefined")
    }
    const {error} = await supabase.from('event').delete().eq('id',id)
    if(error){
        rejectWithValue(error.message)
    }
    return
})

const eventSlice = createSlice({
    name:'event',
    initialState: {data:[], fetchstatus:''},
    reducers:{},
    extraReducers: (builder) => {
        builder
        .addCase(fetchEvent.fulfilled, (state, action)=>{
            state.data = action.payload.data
            state.fetchstatus = 'success'
        })
        .addCase(fetchEvent.pending, (state) =>{
            state.fetchstatus = 'pending'
        })
        .addCase(fetchEvent.rejected, (state)=>{
            state.fetchstatus = 'error'
        })
        .addCase(createEvent.fulfilled, (state, action)=>{
           // state.data = action.payload.data
            state.fetchstatus = 'success'
        })
        .addCase(createEvent.pending, (state) =>{
            state.fetchstatus = 'pending'
        })
        .addCase(createEvent.rejected, (state)=>{
            state.fetchstatus = 'error'
        })
        .addCase(updateEvent.fulfilled, (state, action)=>{
            // state.data = action.payload.data
             state.fetchstatus = 'success'
         })
         .addCase(updateEvent.pending, (state) =>{
             state.fetchstatus = 'pending'
         })
         .addCase(updateEvent.rejected, (state)=>{
             state.fetchstatus = 'error'
         })
         .addCase(deleteEvent.fulfilled, (state)=>{
             state.fetchstatus = 'success'
         })
         .addCase(deleteEvent.pending, (state) =>{
             state.fetchstatus = 'pending'
         })
         .addCase(deleteEvent.rejected, (state)=>{
             state.fetchstatus = 'error'
         })
    }
})

export default eventSlice