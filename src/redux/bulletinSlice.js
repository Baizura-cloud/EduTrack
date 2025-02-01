import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../client";

export const fetchBulletin = createAsyncThunk(
  "fetch-bulletin",
  async (_, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase.from("bulletin").select("*");
      if (error) throw error;
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteBulletin = createAsyncThunk(
  "delete-bulletin",
  async (id, { rejectWithValue }) => {
    try {
      const { error } = await supabase.from("bulletin").delete().eq("id", id);
      if (error) throw error;
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createBulletin = createAsyncThunk(
  "create-bulletin",
  async (data, { rejectWithValue }) => {
    try {
      const { data: newData, error } = await supabase
        .from("bulletin")
        .insert(data).select();
      if (error) throw error;
      return newData[0];
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateBulletin = createAsyncThunk(
  "update-bulletin",
  async (data, { rejectWithValue }) => {
    try {
      const { data: upDatedData, error } = await supabase
        .from("bulletin")
        .update(data)
        .eq("id", data.id).select();
      if (error) throw error;
      return upDatedData[0];
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const bulletinSlice = createSlice({
  name: "bulletin",
  initialState: { data: [], fetchstatus: "" },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBulletin.fulfilled, (state, action) => {
        state.data = action.payload;
        state.fetchstatus = "success";
      })
      .addCase(fetchBulletin.pending, (state) => {
        state.fetchstatus = "pending";
      })
      .addCase(fetchBulletin.rejected, (state) => {
        state.fetchstatus = "error";
      })
      .addCase(deleteBulletin.fulfilled, (state, action) => {
        state.data = state.data.filter((item) => item.id !== action.payload);
        state.fetchstatus = "success";
      })
      .addCase(deleteBulletin.pending, (state) => {
        state.fetchstatus = "pending";
      })
      .addCase(deleteBulletin.rejected, (state) => {
        state.fetchstatus = "error";
      })
      .addCase(createBulletin.fulfilled, (state, action) => {
        state.data.push(action.payload);
        state.fetchstatus = "success";
      })
      .addCase(createBulletin.pending, (state) => {
        state.fetchstatus = "pending";
      })
      .addCase(createBulletin.rejected, (state) => {
        state.fetchstatus = "error";
      })
      .addCase(updateBulletin.fulfilled, (state, action) => {
        const index = state.data.findIndex(
          (item) => item.id === action.payload.id
        );
        if (index !== -1) state.data[index] = action.payload;
        state.fetchstatus = "success";
      })
      .addCase(updateBulletin.pending, (state) => {
        state.fetchstatus = "pending";
      })
      .addCase(updateBulletin.rejected, (state) => {
        state.fetchstatus = "error";
      });
  },
});

export default bulletinSlice;
