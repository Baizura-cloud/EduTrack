import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {supabase} from "../client"

export const fetchCourse = createAsyncThunk('fetch-course', async()=>{
    try {
        const response = await supabase.from('course').select('*')
        return response
    } catch (error) {
        console.log(error)
    }
})

export const deleteCourse = createAsyncThunk('delete-course', async(id, {rejectWithValue})=>{
    if(!id){
        throw new Error("Data undefined")
    }
    try {
        const {error} = await supabase.from('course').delete().eq('id', id)
        if(error){
            rejectWithValue(error.message)
        }
    } catch (error) {
        console.log(error)
    }
})

export const createCourse = createAsyncThunk('create-course', async(data,{rejectWithValue})=>{
    if(!data){
        throw new Error("Data undefined")
    }
    try {
        const {response, error} = await supabase.from('course').insert(data)
        if(error){
            rejectWithValue(error.message)
        }
        return response
    } catch (error) {
        console.log(error)
    }
})

export const updateCourse = createAsyncThunk('update-course', async(data,{rejectWithValue})=>{
    if(!data){
        throw new Error("Data undefined")
    }
    try {
        const {response, error} = await supabase.from('course').update(data).eq('id', data.id)
        if(error){
            rejectWithValue(error.message)
        }
        return response
    } catch (error) {
        console.log(error)
    }
})

const courseSlice = createSlice({
    name: 'course',
    initialState: {data:[], fetchstatus:''},
    reducers:{},
    extraReducers: (builder) =>{
        builder
        .addCase(fetchCourse.fulfilled, (state, action) =>{
            state.data=action.payload.data
            state.fetchstatus = 'success'
        })
        .addCase(fetchCourse.pending, (state) =>{
            state.fetchstatus ='pending'
        })
        .addCase(fetchCourse.rejected, (state)=>{
            state.fetchstatus = 'error'
        })
        .addCase(deleteCourse.fulfilled, (state)=>{
            state.fetchstatus = 'success'
        })
        .addCase(deleteCourse.pending, (state)=>{
            state.fetchstatus = 'pending'
        })
        .addCase(deleteCourse.rejected, (state)=>{
            state.fetchstatus = 'error'
        })
        .addCase(createCourse.fulfilled, (state, action)=>{
            //state.data = action.payload.data
            state.fetchstatus = 'success'
        })
        .addCase(createCourse.pending, (state) =>{
            state.fetchstatus = 'pending'
        })
        .addCase(createCourse.rejected, (state)=>{
            state.fetchstatus = 'error'
        })
        .addCase(updateCourse.fulfilled, (state, action) =>{
            //state.data = action.payload.data
            state.fetchstatus = 'success'
        })
        .addCase(updateCourse.pending, (state) =>{
            state.fetchstatus = 'pending'
        })
        .addCase(updateCourse.rejected, (state)=>{
            state.fetchstatus = 'error'
        })
    }
})

export default courseSlice