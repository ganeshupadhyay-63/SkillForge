import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa"; // stable import
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

function Dashboard() {
  const { userData } = useSelector((state) => state.user);
  const { creatorCourseData } = useSelector((state) => state.course);
  const navigate = useNavigate();

  // Fixed variable names
  const CourseProgressData =
    creatorCourseData?.map((course) => ({
      name: course.title?.slice(0, 10) + "...",
      lectures: course.lectures?.length || 0,
    })) || [];

  const EnrollData =
    creatorCourseData?.map((course) => ({
      name: course.title?.slice(0, 10) + "...",
      enrolled: course.enrolledStudents?.length || 0,
    })) || [];

   const totalEarning =
    creatorCourseData?.reduce((sum, course) => {
      const studentCount = course.enrolledStudents?.length || 0;
      const courseRevenue = course.price ? course.price * studentCount : 0;
      return sum + courseRevenue;
    }, 0) || 0;



  return (
    <div className="flex min-h-screen bg-gray-100">
      <FaArrowLeft
        className="absolute top-[6%] left-[6%] w-6 h-6 cursor-pointer active:bg-gray-700 transition"
        onClick={() => navigate("/")}
      />

      <div className="w-full px-6 py-10 bg-gray-50 space-y-10">
        {/* Main Section */}
        <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-md p-6 flex flex-col md:flex-row items-center gap-6">
          <img
            src={userData?.photoUrl || userData?.name.slice(0, 1).toUpperCase()}
            className="w-28 h-28 rounded-full object-cover border-4 border-black shadow-md"
            alt="educator"
          />

          <div className="text-center md:text-left space-y-2">
            <h1 className="text-2xl font-bold text-gray-800">
              Welcome, {userData?.name ? `${userData.name} 👋` : "Educator 👋"}
            </h1>

            <h2 className="text-xl font-semibold text-gray-800">
              Total Earning: ₹{totalEarning.toLocaleString()}
            </h2>

            <p className="text-gray-600 text-sm">
              {userData?.description || "Start creating courses for your students."}
            </p>

            <button
              className="px-4 py-2 bg-black text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition"
              onClick={() => navigate("/courses")}
            >
              Create Courses
            </button>
          </div>
        </div>

        {/* Graph Section */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Course Progress Graph */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold mb-4">Course Progress (Lectures)</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={CourseProgressData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="lectures" fill="black" radius={[5, 5, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Students Enrollment Graph */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold mb-4">Students Enrollment</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={EnrollData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="enrolled" fill="black" radius={[5, 5, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
