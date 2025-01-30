import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../client";

export const fetchExam = createAsyncThunk(
  "fetch-exam",
  async (_, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase.from("exam").select("*");
      if (error) throw error;
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteExam = createAsyncThunk(
  "delete-exam",
  async (id, { rejectWithValue }) => {
    try {
      const { error } = await supabase.from("exam").delete().eq("id", id);
      if (error) throw error;
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createExam = createAsyncThunk(
  "create-exam",
  async (data, { rejectWithValue }) => {
    try {
      const { data: newData, error } = await supabase
        .from("exam")
        .insert(data)
        .select();
      if (error) throw error;
      return newData;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateExam = createAsyncThunk(
  "update-exam",
  async (data, { rejectWithValue }) => {
    try {
      const { data: updateData, error } = await supabase
        .from("exam")
        .update(data)
        .eq("id", data.id)
        .select();
      if (error) throw error;
      return updateData[0];
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const examSlice = createSlice({
  name: "exam",
  initialState: { data: [], fetchstatus: "" },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchExam.fulfilled, (state, action) => {
        state.data = action.payload;
        state.fetchstatus = "success";
      })
      .addCase(fetchExam.pending, (state) => {
        state.fetchstatus = "pending";
      })
      .addCase(fetchExam.rejected, (state) => {
        state.fetchstatus = "error";
      })
      .addCase(deleteExam.fulfilled, (state, action) => {
        state.data = state.data.filter((item) => item.id !== action.payload);
        state.fetchstatus = "success";
      })
      .addCase(deleteExam.pending, (state) => {
        state.fetchstatus = "pending";
      })
      .addCase(deleteExam.rejected, (state, action) => {
        state.fetchstatus = "error";
      })
      .addCase(createExam.fulfilled, (state, action) => {
        if (action.payload && Array.isArray(action.payload)) {
          state.data.push(...action.payload); // Push all rows if `payload` is an array
        } else if (action.payload) {
          state.data.push(action.payload); // Push if `payload` is a single object
        }
        state.fetchstatus = "success";
      })
      .addCase(createExam.pending, (state) => {
        state.fetchstatus = "pending";
      })
      .addCase(createExam.rejected, (state) => {
        state.fetchstatus = "error";
      })
      .addCase(updateExam.fulfilled, (state, action) => {
        const index = state.data.findIndex(
          (item) => item.id === action.payload.id
        );
        if (index !== -1) state.data[index] = action.payload;
        state.fetchstatus = "success";
      })
      .addCase(updateExam.pending, (state) => {
        state.fetchstatus = "pending";
      })
      .addCase(updateExam.rejected, (state) => {
        state.fetchstatus = "error";
      });
  },
});

export default examSlice;
