import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../Helper/axiosinstance";
import { toast } from "react-hot-toast";

const initialState = {
    lecturedata: [],
    status: 'idle', // Added for handling request status
    error: null
};

// Create a lecture
export const createlecture = createAsyncThunk("lectures/create", async ({ data, id }, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.post(`/courses/${id}`, data);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || "Something went wrong");
    }
});

// Get all lectures by course ID
export const getAllLectures = createAsyncThunk(
    "lectures/fetchAll", 
    async (id, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`/courses/${id}`);
            const res = response.data;
            return Array.isArray(res.lectures) ? res.lectures : [];  // Ensure it's an array
        } catch (error) {
            return rejectWithValue(error.response?.data || "Something went wrong");
        }
    }
);
const lectureSlice = createSlice({
    name: 'lecture',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createlecture.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(createlecture.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.lecturedata.push(action.payload);
            })
            .addCase(createlecture.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
                toast.error('Failed to create lecture');
            })
            .addCase(getAllLectures.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.lecturedata = [...action.payload]; // Overwrite with fetched data
            })
            .addCase(getAllLectures.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
                toast.error('Failed to fetch lectures');
            });
    }
});

export default lectureSlice.reducer;
