import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../client";

export const fetchClassStudent = createAsyncThunk(
  "fetch-class",
  async () => {
    // if (!email) {
    //   throw new Error("Data undefined");
    // }
    try {
      const response = await supabase
        .from("class")
        .select("*")
       // .eq("admin", email);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

export const createClassStudent = createAsyncThunk(
  "create-class",
  async (data, { rejectWithValue }) => {
    if (!data) {
      throw new Error("Data undefined");
    }
    try {
      const { response, error } = await supabase.from("class").insert(data);
      if (error) {
        return error;
      }
      return response;
    } catch (error) {
      rejectWithValue(error.message);
    }
  }
);

export const updateClassStudent = createAsyncThunk(
  "update-class",
  async (data, { rejectWithValue }) => {
    if (!data) {
      throw new Error("Data undefined");
    }
    try {
        const { response, error } = await supabase
        .from("class")
        .update(data)
        .eq("id", data.id);
      if (error) {
        return error;
      }
      return response;
    } catch (error) {
        rejectWithValue(error.message)
    }

  }
);

export const deleteClassStudent = createAsyncThunk(
  "delete-class",
  async (id) => {
    if (!id) {
      throw new Error("Data undefined");
    }
    const { error } = await supabase.from("class").delete().eq("id", id);
    if (error) {
      return error;
    }
    return;
  }
);

const classSlice = createSlice({
  name: "studentclass",
  initialState: { data: [], fetchstatus: "" },
  reducers: {},
  extraReducers: (buider) => {
    buider
      .addCase(fetchClassStudent.fulfilled, (state, action) => {
        state.data = action.payload.data;
        state.fetchstatus = "success";
      })
      .addCase(fetchClassStudent.pending, (state) => {
        state.fetchstatus = "pending";
      })
      .addCase(fetchClassStudent.rejected, (state) => {
        state.fetchstatus = "error";
      })
      .addCase(createClassStudent.fulfilled, (state, action) => {
        // state.data = action.payload.data
        state.fetchstatus = "success";
      })
      .addCase(createClassStudent.pending, (state) => {
        state.fetchstatus = "pending";
      })
      .addCase(createClassStudent.rejected, (state) => {
        state.fetchstatus = "error";
      })
      .addCase(updateClassStudent.fulfilled, (state, action) => {
        //state.data = action.payload.data
        state.fetchstatus = "success";
      })
      .addCase(updateClassStudent.pending, (state) => {
        state.fetchstatus = "pending";
      })
      .addCase(updateClassStudent.rejected, (state) => {
        state.fetchstatus = "error";
      })
      .addCase(deleteClassStudent.fulfilled, (state) => {
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
