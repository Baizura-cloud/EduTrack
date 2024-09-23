import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../client";

export const fetchTask = createAsyncThunk('fetch-task', async(email) =>{
    if(!email){
        throw new Error("Data undefined")
    }
    try {
        const response = await supabase.from('task').select('*').eq('created_by',email)
        return response
    } catch (error) {
        console.log(error)
    }
})
export const deleteTask = createAsyncThunk('delete-task', async(id,{rejectWithValue})=>{
    if(!id){
        throw new Error("Data undefined")
    }
    try {
        const {error} = await supabase.from('task').delete().eq("id", id)
        if(error){
            rejectWithValue(error.message)
        }
    } catch (error) {
        console.log(error)
    }
})
export const updateTask = createAsyncThunk('update-task', async(data,{rejectWithValue}) =>{
    if(!data){
        throw new Error("Data undefined")
    }
    try {
        const {reponse, error} = await supabase.from('task').update(data).eq("id", data.id)
        if(error){
            return rejectWithValue(error.message)
        }
        return reponse
    } catch (error) {
        console.log(error)
    }
})

export const createTask = createAsyncThunk('create-task', async(data,{rejectWithValue})=>{
    if(!data){
        throw new Error("Data undefined")
    }
    try {
        const {response, error} = await supabase.from('task').insert(data).select()
        if(error){
            return rejectWithValue(error.message)
        }
        return response
    } catch (error) {
        console.log(error)
    }
})

const taskSlice = createSlice({
    name:'task',
    initialState:{data:[], fetchstatus:''},
    reducers:{},
    extraReducers: (builder) =>{
        builder
        .addCase(fetchTask.fulfilled, (state,action)=>{
            state.data = action.payload.data
            state.fetchstatus = 'success'
        })
        .addCase(fetchTask.pending, (state)=>{
            state.fetchstatus = 'pending'
        })
        .addCase(fetchTask.rejected, (state) =>{
            state.fetchstatus = 'error'
        })
        .addCase(updateTask.fulfilled, (state, action) =>{
           // state.data =action.payload
            state.fetchstatus = 'success'
        })
        .addCase(updateTask.pending, (state)=>{
            state.fetchstatus = 'pending'
        })
        .addCase(updateTask.rejected, (state)=>{
            state.fetchstatus = 'error'
        })
        .addCase(deleteTask.fulfilled, (state)=>{
            state.fetchstatus = 'success'
        })
        .addCase(deleteTask.pending, (state)=>{
            state.fetchstatus = 'pending'
        })
        .addCase(deleteTask.rejected, (state)=>{
            state.fetchstatus = 'error'
        })
        .addCase(createTask.fulfilled, (state,action)=>{
            //state.data = action.payload
            state.fetchstatus = 'success'
        })
        .addCase(createTask.pending, (state)=>{
            state.fetchstatus = 'pending'
        })
        .addCase(createTask.rejected, (state) =>{
            state.fetchstatus = 'error'
        })
    }
})

export default taskSlice