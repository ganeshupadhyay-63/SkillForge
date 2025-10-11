import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { serverUrl } from '../App';
import { setCreatorCourseData, addCreatorCourse } from '../redux/courseSlice';

const useCreatorCourse = () => {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [creating, setCreating] = useState(false);

  // Fetch all courses (only for initial load or manual refresh)
  const fetchCourses = async () => {
    setLoading(true);
    try {
      const result = await axios.get(`${serverUrl}/api/course/getCreator`, {
        withCredentials: true,
      });
      dispatch(setCreatorCourseData(result.data)); // replace state here
    } catch (error) {
      console.error('Error fetching courses:', error);
      dispatch(setCreatorCourseData([]));
    } finally {
      setLoading(false);
    }
  };

  // Create a new course
  const createCourse = async (courseData) => {
    setCreating(true);
    try {
      const result = await axios.post(`${serverUrl}/api/course/create`, courseData, {
        withCredentials: true,
      });
      dispatch(addCreatorCourse(result.data)); // append instead of fetching again
      return result.data;
    } catch (error) {
      console.error('Error creating course:', error);
    } finally {
      setCreating(false);
    }
  };

  // Fetch courses only on initial mount
  useEffect(() => {
    if (userData) {
      fetchCourses();
    }
  }, [userData]);

  return { fetchCourses, createCourse, loading, creating };
};

export default useCreatorCourse;
