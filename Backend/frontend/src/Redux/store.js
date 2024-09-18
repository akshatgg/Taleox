import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "./Slices/AuthSlice.js";
import CourseSliceReducer from "./Slices/CourseSlice.js";
import LectureSliceReducer from "./Slices/LectureSlice.js";


const store = configureStore({
  reducer: {
    auth: authSliceReducer,
    course:CourseSliceReducer,
    lecture:LectureSliceReducer
  },
});

export default store;
