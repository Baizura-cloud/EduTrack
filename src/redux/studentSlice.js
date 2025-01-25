import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../client";

export const fetchStudent = createAsyncThunk(
  "fetch-student",
  async (classname, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase
        .from("student")
        .select()
        .eq("class", classname);
      if (error) throw error;
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createStudent = createAsyncThunk(
  "create-student",
  async (data, { rejectWithValue }) => {
    try {
      const { data: newData, error } = await supabase
        .from("student")
        .insert(data)
        .select();
      if (error) throw error;
      return newData;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const updateStudent = createAsyncThunk(
  "update-student",
  async (data, { rejectWithValue }) => {
    try {
      const { data: upDatedData, error } = await supabase
        .from("student")
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
export const fetchmultipleStudent = createAsyncThunk(
  "fetch-mulstudent",
  async (mulclassname, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase
        .from("student")
        .select()
        .in("class", mulclassname);
      if (error) throw error;
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const deleteStudent = createAsyncThunk(
  "delete-student",
  async (id, { rejectWithValue }) => {
    try {
      const { error } = await supabase.from("student").delete().eq("id", id);
      if (error) throw error;
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const studentSlice = createSlice({
  name: "student",
  initialState: { data: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudent.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchStudent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStudent.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(createStudent.fulfilled, (state, action) => {
        if (action.payload && Array.isArray(action.payload)) {
          state.data.push(...action.payload); // Push all rows if `payload` is an array
        } else if (action.payload) {
          state.data.push(action.payload); // Push if `payload` is a single object
        }
        state.loading = false;
        state.error = null;
      })
      .addCase(createStudent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createStudent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateStudent.fulfilled, (state, action) => {
        const index = state.data.findIndex(
          (item) => item.id === action.payload.id
        );
        if (index !== -1) state.data[index] = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(updateStudent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateStudent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteStudent.fulfilled, (state, action) => {
        state.data = state.data.filter((item) => item.id !== action.payload);
        state.loading = false;
        state.error = null;
      })
      .addCase(deleteStudent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteStudent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchmultipleStudent.fulfilled, (state, action) => {
        state.data = action.payload.data;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchmultipleStudent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchmultipleStudent.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export default studentSlice;
