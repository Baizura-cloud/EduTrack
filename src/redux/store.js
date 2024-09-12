import { configureStore } from "@reduxjs/toolkit";
import profileSlice from './profileSlice'
import todoReducer from './todoSlice'
import authSlice from "./authSlice2";

const store = configureStore({
    reducer:{
        todos: todoReducer,
        profile: profileSlice.reducer,
        auth: authSlice.reducer
    }   
})

export default store;