import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../client";

export const fetchProfile = createAsyncThunk(
  "fetch-profile",
  async (email, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase
        .from("profile")
        .select("*")
        .eq("email", email);
      if (error) throw error;
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const updateProfile = createAsyncThunk(
  "edit-profile",
  async (data, { rejectWithValue }) => {
    try {
      const { data: upDatedData, error } = await supabase
        .from("profile")
        .update(data)
        .eq("id", data.id).select();
      if (error) throw error;
      return upDatedData;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const createProfile = createAsyncThunk(
  "create-profile",
  async (data, { rejectWithValue }) => {
    try {
      const { data: createData, error } = await supabase.from("profile").insert(data);
      if (error) throw error
      return createData;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const profileSilce = createSlice({
  name: "profile",
  initialState: { data: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createProfile.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(createProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default profileSilce;
