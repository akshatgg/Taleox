import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../Helper/axiosinstance";
import { toast } from "react-hot-toast";

const initialState = {
    lecturedata: [],
    status: 'idle', // Added for handling request status
    error: null
};

export const createlecture = createAsyncThunk("lectures/create", async ({ data, id }, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.post(`/courses/${id}`, data);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

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
            });
    }
});

export default lectureSlice.reducer;
