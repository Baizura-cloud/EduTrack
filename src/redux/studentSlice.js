import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../client";

export const createStudent = createAsyncThunk('create-student', async(data,{rejectWithValue})=>{
    if(!data){
        throw new Error("Data undefined")
    }
    const {response, error} = await supabase.from('student').insert(data)
    if(error){
        rejectWithValue(error.message)
    }
    return response
})
export const fetchStudent = createAsyncThunk('fetch-student', async(classname) =>{
    if(!classname){
        throw new Error("Data undefined")
    }
    try {
        const response = await supabase.from('student').select().eq('class', classname)
        return response
    } catch (error) {
        console.log(error)
    }

})
export const deleteStudent = createAsyncThunk('delete-student', async(id, {rejectWithValue})=>{
    if(!id){
        throw new Error("Data undefined")
    }
    const {error} = await supabase.from('student').delete().eq('id', id)
    if(error){
        rejectWithValue(error.message)
    }
    return
})
export const updateStudent = createAsyncThunk('update-student', async(data, {rejectWithValue})=>{
    if(!data){
        throw new Error("Data undefined")
    }
    const {response, error} = await supabase.from('student').update(data).eq('id', data.id)
    if(error){
        rejectWithValue(error.message)
    }
    return response
})
const studentSlice = createSlice({
    name:'student',
    initialState: {data:[], fetchstatus:''},
    reducers:{},
    extraReducers: (builder) =>{
        builder
        .addCase(createStudent.fulfilled, (state, action) =>{
            state.fetchstatus = 'success'
        })
        .addCase(createStudent.pending, (state)=>{
            state.fetchstatus = 'pending'
        })
        .addCase(createStudent.rejected, (state)=>{
            state.fetchstatus = 'rejected'
        })
        .addCase(fetchStudent.fulfilled, (state,action)=>{
            state.data = action.payload.data
            state.fetchstatus = 'success'
        })
        .addCase(fetchStudent.pending, (state) =>{
            state.fetchstatus = 'pending'
        })
        .addCase(fetchStudent.rejected, (state) =>{
            state.fetchstatus ='error'
        })
        .addCase(updateStudent.fulfilled, (state, action) =>{
            state.fetchstatus = 'success'
        })
        .addCase(updateStudent.pending, (state)=>{
            state.fetchstatus = 'pending'
        })
        .addCase(updateStudent.rejected, (state)=>{
            state.fetchstatus = 'rejected'
        })
        .addCase(deleteStudent.fulfilled, (state) =>{
            state.fetchstatus = 'success'
        })
        .addCase(deleteStudent.pending, (state)=>{
            state.fetchstatus = 'pending'
        })
        .addCase(deleteStudent.rejected, (state)=>{
            state.fetchstatus = 'rejected'
        })
    }
})

export default studentSlice