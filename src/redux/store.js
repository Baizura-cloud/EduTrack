import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import profileSlice from './profileSlice'
import authSlice from "./authSlice2";
import taskSlice from "./taskSlice";
import classSlice from "./classSlice";
import bulletinSlice from "./bulletinSlice";
import otherprofileSlice from "./otherprofileSlice";
import courseSlice from "./courseSlice";

const persistConfig = {
    key: 'root',
    storage,
}

const rootReducer = combineReducers({
    auth: authSlice.reducer,
    profile: profileSlice.reducer,
    task: taskSlice.reducer,
    classstudent: classSlice.reducer,
    bulletin: bulletinSlice.reducer,
    otherprofile: otherprofileSlice.reducer,
    course: courseSlice.reducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer:persistedReducer   
})

export const persistor = persistStore(store)