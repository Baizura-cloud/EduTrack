import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {supabase} from '../client'

export const logoutUser = createAsyncThunk('logout-user', async() =>{
    try {
        const response = await supabase.auth.signOut()
        return response
    } catch (error) {
        console.log(error)
    }
})

// export const loginUser = createAsyncThunk('login-user', async()=>{

// })

const authSlice = createSlice({
    name:'auth',
    initialState:{data:[], fetchstatus:''},
    reducers:{},
    extraReducers: (builder) =>{
        builder
        .addCase(logoutUser.fulfilled, (state,action)=>{
            state.data = action.payload.data
            state.fetchstatus = 'success'
        })
        .addCase(logoutUser.pending, (state) =>{
            state.fetchstatus = 'pending'
        })
        .addCase(logoutUser.rejected, (state)=>{
            state.fetchstatus = 'error'
        })
    }
})

export default authSlice