import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {supabase} from "../client"

export const fetchProfile = createAsyncThunk('fetch-profile', async(email) =>{
    try {
        const response = await supabase.from('profile').select('*').eq('email', email)
        return response
    } catch (error) {
        console.log(error)
    }

})

export const updateProfile = createAsyncThunk('edit-profile', async(data, {rejectWithValue})=>{
    if(!data){
        throw new Error("Data undefined")
    }
    try {
        const {response, error} = await supabase.auth.update(data).eq("id", data.id)
        if(error){
            return rejectWithValue(error.message)
        }
        return response
    } catch (error) {
        console.log(error)
    }
})

const profileSilce = createSlice({
    name:'profile',
    initialState:{data:[], fetchstatus:''},
    reducers:{},
    extraReducers: (builder) =>{
        builder
        .addCase(fetchProfile.fulfilled, (state,action)=>{
            state.data = action.payload.data
            state.fetchstatus = 'success'
        })
        .addCase(fetchProfile.pending, (state) =>{
            state.fetchstatus = 'pending'
        } )
        .addCase(fetchProfile.rejected, (state)=>{
            state.fetchstatus = 'error'
        })
        .addCase(updateProfile.fulfilled, (state,action) =>{
            state.data = action.payload.data
            state.fetchstatus = 'success'
        })
        .addCase(updateProfile.pending, (state) =>{
            state.fetchstatus = 'pending'
        })
        .addCase(updateProfile.rejected, (state) =>{
            state.fetchstatus = 'error'
        })
    }
})

export default profileSilce;