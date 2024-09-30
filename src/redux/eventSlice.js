import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../client";

export const fetchEvent = createAsyncThunk("fetch-event", async () => {
  const response = await supabase.from("event").select("*");
  return response;
});

export const createEvent = createAsyncThunk(
  "create-event",
  async (data, { rejectWithValue }) => {
    if (!data) {
      throw new Error("Data undefined");
    }
    try {
      const { response, error } = await supabase.from("event").insert(data);
      if (error) {
        return error;
      }
      return response;
    } catch (error) {
      rejectWithValue(error.message);
    }
  }
);

export const updateEvent = createAsyncThunk(
  "update-event",
  async (data, { rejectWithValue }) => {
    if (!data) {
      throw new Error("Data undefined");
    }
    try {
      const { response, error } = await supabase
        .from("event")
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

export const deleteEvent = createAsyncThunk(
  "delete-event",
  async (id, { rejectWithValue }) => {
    if (!id) {
        throw new Error("Data undefined");
    }
    try {
      const { error } = await supabase.from("event").delete().eq("id", id);
      if (error) {
        return error;
      }
      return;
    } catch (error) {
      rejectWithValue(error.message);
    }
  }
);

const eventSlice = createSlice({
  name: "event",
  initialState: { data: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEvent.fulfilled, (state, action) => {
        state.data = action.payload.data;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchEvent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEvent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createEvent.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(createEvent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createEvent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateEvent.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(updateEvent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateEvent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteEvent.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(deleteEvent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteEvent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default eventSlice;
