import { createSlice } from "@reduxjs/toolkit";

const courseSlice = createSlice({
  name: "course",
  initialState: {
    creatorCourseData: [],
    courseData: [],
    selectedCourse: [], 
  },
  reducers: {
    setCreatorCourseData: (state, action) => {
      state.creatorCourseData = action.payload;
    },
    setCourseData: (state, action) => {
      state.courseData = action.payload;
    },
    addCreatorCourse: (state, action) => {
      state.creatorCourseData.push(action.payload);
    },
    setSelectedCourse: (state, action) => {
      state.selectedCourse = action.payload;
    },
  },
});

export const { setCreatorCourseData, addCreatorCourse, setCourseData, setSelectedCourse } = courseSlice.actions;

export default courseSlice.reducer;
