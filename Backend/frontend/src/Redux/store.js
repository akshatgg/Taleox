import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "./Slices/AuthSlice.js";
import CourseSliceReducer from "./Slices/CourseSlice.js";


const store = configureStore({
  reducer: {
    auth: authSliceReducer,
    course:CourseSliceReducer
  },
});

export default store;
