import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';
import SignUp from './pages/SignUp';
import ForgetPassword from './pages/ForgetPassword';
import { ToastContainer } from 'react-toastify';
import useCurrentUser from "./customHooks/useCurrentUser";
import {useSelector} from 'react-redux'
import EditProfile from './pages/EditProfile';
import Dashboard from './pages/Educator/Dashboard';
import Courses from './pages/Educator/Courses';
import CreateCourses from './pages/Educator/CreateCourses';
import EditCourses from './pages/Educator/EditCourses';
import useCreatorCourse from './customHooks/useCreatorCourse';
import usePublishedCourse from './customHooks/usePublishedCourse';
import AllCourses from './pages/AllCourses';
import CreateLecture from './pages/CreateLecture';
import EditLecture from './pages/Educator/EditLecture';
import ViewCourse from './pages/ViewCourse';
import ScrollToTop from './component/ScrollToTop';
import ViewLecture from './pages/ViewLecture';
import MyEnrolledCourse from './pages/MyEnrolledCourse';
import useAllReviews from './customHooks/useAllReviews';
import SearchWithAi from './pages/SearchWithAi';
import ReviewPage from './component/ReviewPage';



export const serverUrl = "https://skillforge-backend1.onrender.com";


function App() {
  useCurrentUser();
  useCreatorCourse();
  usePublishedCourse()
  useAllReviews()
  
  const {userData} = useSelector(state=>state.user)
  
  return (
    <>
    <ToastContainer />
    <ScrollToTop/>
      <Routes>
  <Route path='/' element={<Home />} />

  {/* Auth routes */}
  <Route
    path='/signup'
    element={!userData ? <SignUp /> : <Navigate to={"/"} />}
  />
  <Route
    path='/login'
    element={!userData ? <Login /> : <Navigate to={"/"} />}
  />
  <Route
    path='/forget'
    element={!userData ? <ForgetPassword /> : <Navigate to={"/"} />}
  />

  {/* Protected user routes */}
  <Route
    path='/profile'
    element={userData ? <Profile /> : <Navigate to={"/signup"} />}
  />
  <Route
    path='/editprofile'
    element={userData ? <EditProfile /> : <Navigate to={"/signup"} />}
  />
  <Route
    path='/myenrolledment'
    element={userData ? <MyEnrolledCourse /> : <Navigate to={"/signup"} />}
  />

  {/* Protected */}
<Route
  path='/allcourses'
  element={userData ? <AllCourses /> : <Navigate to="/signup" />}
/>
<Route
  path='/viewcourse/:courseId'
  element={userData ? <ViewCourse /> : <Navigate to="/signup" />}
/>
<Route
  path='/viewlecture/:lectureId'
  element={userData ? <ViewLecture /> : <Navigate to="/signup" />}
/>
<Route
  path='/searchwithai'
  element={userData ? <SearchWithAi /> : <Navigate to="/signup" />}
/>


  {/* Educator-only routes */}
  <Route
    path='/dashboard'
    element={userData?.role === "educator" ? <Dashboard /> : <Navigate to={"/signup"} />}
  />
  <Route
    path='/courses'
    element={userData?.role === "educator" ? <Courses /> : <Navigate to={"/signup"} />}
  />
  <Route
    path='/createcourse'
    element={userData?.role === "educator" ? <CreateCourses /> : <Navigate to={"/signup"} />}
  />
  <Route
    path='/editcourse/:courseId'
    element={userData?.role === "educator" ? <EditCourses /> : <Navigate to={"/signup"} />}
  />
  <Route
    path='/createlecture/:courseId'
    element={userData?.role === "educator" ? <CreateLecture /> : <Navigate to={"/signup"} />}
  />
  <Route
    path='/editlecture/:courseId/:lectureId'
    element={userData?.role === "educator" ? <EditLecture /> : <Navigate to={"/signup"} />}
  />
  <Route path="/reviews" element={<ReviewPage />} />
</Routes>

    </>
  );
}

export default App;
