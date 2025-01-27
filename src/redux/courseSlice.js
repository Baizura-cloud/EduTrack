import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../client";

export const fetchCourse = createAsyncThunk(
  "fetch-course",
  async (_, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase.from("course").select("*");
      if (error) throw error;
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteCourse = createAsyncThunk(
  "delete-course",
  async (id, { rejectWithValue }) => {
    try {
      const { error } = await supabase.from("course").delete().eq("id", id);
      if (error) throw error;
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createCourse = createAsyncThunk(
  "create-course",
  async (data, { rejectWithValue }) => {
    try {
      const { data: newData, error } = await supabase
        .from("course")
        .insert(data)
        .select();
      if (error) throw error;
      return newData[0];
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateCourse = createAsyncThunk(
  "update-course",
  async (data, { rejectWithValue }) => {
    try {
      const { data: upDatedData, error } = await supabase
        .from("course")
        .update(data)
        .eq("id", data.id)
        .select();
      if (error) throw error;
      return upDatedData[0];
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const courseSlice = createSlice({
  name: "course",
  initialState: { data: [], fetchstatus: "" },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourse.fulfilled, (state, action) => {
        state.data = action.payload;
        state.fetchstatus = "success";
      })
      .addCase(fetchCourse.pending, (state) => {
        state.fetchstatus = "pending";
      })
      .addCase(fetchCourse.rejected, (state) => {
        state.fetchstatus = "error";
      })
      .addCase(deleteCourse.fulfilled, (state, action) => {
        state.data = state.data.filter((item) => item.id !== action.payload);
        state.fetchstatus = "success";
      })
      .addCase(deleteCourse.pending, (state) => {
        state.fetchstatus = "pending";
      })
      .addCase(deleteCourse.rejected, (state) => {
        state.fetchstatus = "error";
      })
      .addCase(createCourse.fulfilled, (state, action) => {
        state.data.push(action.payload);
        state.fetchstatus = "success";
      })
      .addCase(createCourse.pending, (state) => {
        state.fetchstatus = "pending";
      })
      .addCase(createCourse.rejected, (state) => {
        state.fetchstatus = "error";
      })
      .addCase(updateCourse.fulfilled, (state, action) => {
        const index = state.data.findIndex(
            (item) => item.id === action.payload.id
          );
          if (index !== -1) state.data[index] = action.payload;
        state.fetchstatus = "success";
      })
      .addCase(updateCourse.pending, (state) => {
        state.fetchstatus = "pending";
      })
      .addCase(updateCourse.rejected, (state) => {
        state.fetchstatus = "error";
      });
  },
});

export default courseSlice;
