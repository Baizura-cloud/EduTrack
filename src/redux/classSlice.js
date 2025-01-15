import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../client";

export const fetchClassStudent = createAsyncThunk(
  "fetch-class",
  async (_,{ rejectWithValue }) => {
    try {
      const { data, error } = await supabase.from("class").select("*");
      if (error) throw error;
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createClassStudent = createAsyncThunk(
  "create-class",
  async (data, { rejectWithValue }) => {
    try {
      const { data: newData, error } = await supabase.from("class").insert(data);
      if (error) throw error;
      return data[0];
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateClassStudent = createAsyncThunk(
  "update-class",
  async (data, { rejectWithValue }) => {
    try {
      const { data:upDatedData, error } = await supabase.from("class").update(data).eq("id", data.id);
      if (error) throw error;
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteClassStudent = createAsyncThunk(
  "delete-class",
  async (id, {rejectWithValue}) => {
    try {
      const {error} = await supabase.from("class").delete().eq("id", id)
      if(error) throw error
      return id;
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
);

const classSlice = createSlice({
  name: "studentclass",
  initialState: { data: [], fetchstatus: "" },
  reducers: {},
  extraReducers: (buider) => {
    buider
      .addCase(fetchClassStudent.fulfilled, (state, action) => {
        state.data = action.payload;
        state.fetchstatus = "success";
      })
      .addCase(fetchClassStudent.pending, (state) => {
        state.fetchstatus = "pending";
      })
      .addCase(fetchClassStudent.rejected, (state) => {
        console.error(state);
        state.fetchstatus = "error";
      })
      .addCase(createClassStudent.fulfilled, (state, action) => {
        state.data.push(action.payload);
        state.fetchstatus = "success";
      })
      .addCase(createClassStudent.pending, (state) => {
        state.fetchstatus = "pending";
      })
      .addCase(createClassStudent.rejected, (state) => {
        state.fetchstatus = "error";
      })
      .addCase(updateClassStudent.fulfilled, (state, action) => {
        const index = state.data.findIndex((item) => item.id === action.payload.id);
        if (index !== -1) state.data[index] = action.payload;
        state.fetchstatus = "success";
      })
      .addCase(updateClassStudent.pending, (state) => {
        state.fetchstatus = "pending";
      })
      .addCase(updateClassStudent.rejected, (state) => {
        state.fetchstatus = "error";
      })
      .addCase(deleteClassStudent.fulfilled, (state, action) => {
        state.data = state.data.filter((item) => item.id !== action.payload);
        state.fetchstatus = "success";
      })
      .addCase(deleteClassStudent.pending, (state) => {
        state.fetchstatus = "pending";
      })
      .addCase(deleteClassStudent.rejected, (state) => {
        state.fetchstatus = "error";
      });
  },
});

export default classSlice;
