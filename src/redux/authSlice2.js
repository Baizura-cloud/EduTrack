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
export const loginUser = createAsyncThunk("login-user", async (loginData) => {
  try {
    if (!loginData) {
      throw new Error("Data undefined");
    }
    const { email, password } = loginData;
    const response = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    return response;
  } catch (error) {
    console.log(error);
  }
});

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
        state.data = { email: action.payload.data.user.email, isauth: true };
        state.fetchstatus = "success";
      })
      .addCase(loginUser.pending, (state) => {
        state.fetchstatus = "pending";
      })
      .addCase(loginUser.rejected, (state) => {
        state.fetchstatus = "error";
      });
  },
});

export default authSlice;
