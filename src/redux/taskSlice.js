import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../client";

export const fetchTask = createAsyncThunk(
  "fetch-task",
  async (email, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase
        .from("task")
        .select("*")
        .eq("created_by", email);
      if (error) throw error;
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const deleteTask = createAsyncThunk(
  "delete-task",
  async (id, { rejectWithValue }) => {
    try {
      const { error } = await supabase.from("task").delete().eq("id", id);
      if (error) throw error
      return id
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
);
export const updateTask = createAsyncThunk(
  "update-task",
  async (data, { rejectWithValue }) => {
    try {
      const { data:upDatedData, error } = await supabase
        .from("task")
        .update(data)
        .eq("id", data.id).select()
      if (error) throw error
      return upDatedData[0];
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
);

export const createTask = createAsyncThunk(
  "create-task",
  async (data, { rejectWithValue }) => {
    try {
      const { data:newData, error } = await supabase
        .from("task")
        .insert(data)
        .select();
      if (error) throw error
      return newData[0];
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
);

const taskSlice = createSlice({
  name: "task",
  initialState: { data: [], fetchstatus: "" },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTask.fulfilled, (state, action) => {
        state.data = action.payload;
        state.fetchstatus = "success";
      })
      .addCase(fetchTask.pending, (state) => {
        state.fetchstatus = "pending";
      })
      .addCase(fetchTask.rejected, (state) => {
        state.fetchstatus = "error";
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const index = state.data.findIndex(
            (item) => item.id === action.payload.id
          );
          if (index !== -1) state.data[index] = action.payload;
        state.fetchstatus = "success";
      })
      .addCase(updateTask.pending, (state) => {
        state.fetchstatus = "pending";
      })
      .addCase(updateTask.rejected, (state) => {
        state.fetchstatus = "error";
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.data = state.data.filter((item) => item.id !== action.payload);
        state.fetchstatus = "success";
      })
      .addCase(deleteTask.pending, (state) => {
        state.fetchstatus = "pending";
      })
      .addCase(deleteTask.rejected, (state) => {
        state.fetchstatus = "error";
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.data.push(action.payload);
        state.fetchstatus = "success";
      })
      .addCase(createTask.pending, (state) => {
        state.fetchstatus = "pending";
      })
      .addCase(createTask.rejected, (state) => {
        state.fetchstatus = "error";
      });
  },
});

export default taskSlice;
