import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../client";

export const logoutUser = createAsyncThunk("logout-user", async () => {
  try {
    const response = await supabase.auth.signOut();
    return response;
  } catch (error) {
    console.log(error);
  }
});
export const loginUser = createAsyncThunk(
  "login-user",
  async (loginData, { rejectWithValue }) => {
    try {
      if (!loginData) {
        throw new Error("Data undefined");
      }
      const { email, password } = loginData;
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });
      if (error) {
        return error;
      }
      return data;
    } catch (error) {
      rejectWithValue(error.message);
    }
  }
);
export const signupUser = createAsyncThunk(
  "signup-user",
  async (signupData, { rejectWithValue }) => {
    if (!signupData) {
      throw new Error("Data undefined");
    }
    try {
      const { data, error } = await supabase.auth.signUp(signupData);
      if (error) {
        return error;
      }
      return data;
    } catch (error) {
      rejectWithValue(error.message);
    }
  }
);
export const resetPasswordEmail = createAsyncThunk('reset-password-email', async(email)=>{
  if(!email){
    throw new Error("Data Undefined")
  }
  const {data, error} = await supabase.auth.resetPasswordForEmail(email)
  if(error){
    return error
  }
  return data
})
const authSlice = createSlice({
  name: "auth",
  initialState: { data: [], fetchstatus: "" },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.data = [];
        state.fetchstatus = "success";
      })
      .addCase(logoutUser.pending, (state) => {
        state.fetchstatus = "pending";
      })
      .addCase(logoutUser.rejected, (state) => {
        state.fetchstatus = "error";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.data = { user: action.payload.user };
        state.fetchstatus = "success";
      })
      .addCase(loginUser.pending, (state) => {
        state.fetchstatus = "pending";
      })
      .addCase(loginUser.rejected, (state) => {
        state.fetchstatus = "error";
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.data = { user: action.payload.user };
        state.fetchstatus = "success";
      })
      .addCase(signupUser.pending, (state) => {
        state.fetchstatus = "pending";
      })
      .addCase(signupUser.rejected, (state) => {
        state.fetchstatus = "error";
      })
      .addCase(resetPasswordEmail.fulfilled, (state, action) => {
        state.fetchstatus = "success";
      })
      .addCase(resetPasswordEmail.pending, (state) => {
        state.fetchstatus = "pending";
      })
      .addCase(resetPasswordEmail.rejected, (state) => {
        state.fetchstatus = "error";
      });
  },
});

export default authSlice;
