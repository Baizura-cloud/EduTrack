import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import profileSlice from "./profileSlice";
import authSlice from "./authSlice";
import taskSlice from "./taskSlice";
import classSlice from "./classSlice";
import bulletinSlice from "./bulletinSlice";
import otherprofileSlice from "./otherprofileSlice";
import courseSlice from "./courseSlice";
import examSlice from "./examSlice";
import studentSlice from "./studentSlice";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  auth: authSlice.reducer,
  profile: profileSlice.reducer,
  task: taskSlice.reducer,
  classstudent: classSlice.reducer,
  bulletin: bulletinSlice.reducer,
  otherprofile: otherprofileSlice.reducer,
  course: courseSlice.reducer,
  exam: examSlice.reducer,
  student: studentSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
