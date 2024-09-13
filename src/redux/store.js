import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import profileSlice from './profileSlice'
//import todoReducer from './todoSlice'
import authSlice from "./authSlice2";

const persistConfig = {
    key: 'root',
    storage,
}

const rootReducer = combineReducers({
    auth: authSlice.reducer,
    profile: profileSlice.reducer,
    //todos: todoReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer:persistedReducer   
})

export const persistor = persistStore(store)
// export default store;