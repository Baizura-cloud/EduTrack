import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../client";

export const createStudent = createAsyncThunk(
  "create-student",
  async (data, { rejectWithValue }) => {
    if (!data) {
      throw new Error("Data undefined");
    }
    try {
      const { response, error } = await supabase.from("student").insert(data);
      if (error) {
        return error;
      }
      return response;
    } catch (error) {
      rejectWithValue(error.message);
    }
  }
);
export const fetchStudent = createAsyncThunk(
  "fetch-student",
  async (classname) => {
    if (!classname) {
      throw new Error("Data undefined");
    }
    try {
      const response = await supabase
        .from("student")
        .select()
        .eq("class", classname);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);
export const fetchmultipleStudent = createAsyncThunk(
  "fetch-mulstudent",
  async (mulclassname) => {
    if (!mulclassname) {
      throw new Error("Data undefined");
    }
    try {
      const response = await supabase
        .from("student")
        .select()
        .in("class", mulclassname);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);
export const deleteStudent = createAsyncThunk(
  "delete-student",
  async (id, { rejectWithValue }) => {
    if (!id) {
      throw new Error("Data undefined");
    }
    try {
      const { error } = await supabase.from("student").delete().eq("id", id);
      if (error) {
        return error;
      }
      return;
    } catch (error) {
      rejectWithValue(error.message);
    }
  }
);
export const updateStudent = createAsyncThunk(
  "update-student",
  async (data, { rejectWithValue }) => {
    if (!data) {
      throw new Error("Data undefined");
    }
    try {
      const { response, error } = await supabase
        .from("student")
        .update(data)
        .eq("id", data.id);
      if (error) {
        return error;
      }
      return response;
    } catch (error) {
      rejectWithValue(error.message);
    }
  }
);
const studentSlice = createSlice({
  name: "student",
  initialState: { data: [], loading: false, error:null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createStudent.fulfilled, (state) => {
        state.loading = false
        state.error = null
      })
      .addCase(createStudent.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(createStudent.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(fetchStudent.fulfilled, (state, action) => {
        state.data = action.payload.data;
        state.loading = false
        state.error = null
      })
      .addCase(fetchStudent.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchStudent.rejected, (state, action) => {
        state.error = action.payload
        state.loading = false
      })
      .addCase(updateStudent.fulfilled, (state) => {
        state.loading = false
        state.error = null
      })
      .addCase(updateStudent.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(updateStudent.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(deleteStudent.fulfilled, (state) => {
        state.loading = false
        state.error = null
      })
      .addCase(deleteStudent.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(deleteStudent.rejected, (state,action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(fetchmultipleStudent.fulfilled, (state, action) => {
        state.data = action.payload.data;
        state.loading = false
        state.error = null
      })
      .addCase(fetchmultipleStudent.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchmultipleStudent.rejected, (state, action) => {
        state.error = action.payload
        state.loading = false
      });
  },
});

export default studentSlice;
