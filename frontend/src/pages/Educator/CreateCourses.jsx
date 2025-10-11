import axios from "axios";
import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ClipLoader from "react-spinners/ClipLoader";
import { serverUrl } from "../../App";


function CreateCourses() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);

    const handleCreateCourse = async () => {
  if (!title || !category) {
    toast.error("Title and category are required");
    return;
  }

  setLoading(true);
  try {
    const result = await axios.post(
      `${serverUrl}/api/course/create`,
      { title, category },
      { withCredentials: true }
    );
    console.log("Course created:", result.data);
    toast.success("Course Created");
    navigate("/courses");
  } catch (error) {
    console.error("Error creating course:", error.response?.data || error);
    toast.error(error.response?.data?.message || "Something went wrong");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-10">
      <div className="max-w-xl w-[600px] mx-auto p-6 bg-white shadow-md rounded-md mt-10 relative">
        <FaArrowLeft
          className="absolute top-[6%] left-[6%] w-[22px] h-[22px] cursor-pointer active:bg-[#4b4b4b] transition "
          onClick={() => navigate("/courses")}
        />

        <h2 className="text-2xl font-semibold mb-6 text-center">
          Create Course
        </h2>
        <form
          className="space-y-5"
          onSubmit={(e) => {
            e.preventDefault();
            handleCreateCourse();
            
            
          }}
        >
          <div>
            <label
              htmlFor="title"
              className=" block text-sm font-medium text-gray-700 mb-1"
            >
              Course Title
            </label>
            <input
              type="text"
              id="title"
              placeholder="Enter Course title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[black]"
            />
          </div>

          <div>
            <label
              htmlFor="category"
              className=" block text-sm font-medium text-gray-700 mb-1"
            >
              Course Category
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[black]"
            >
              <option value="">Select Category</option>
              <option value="App Development">App Development</option>
              <option value="AI/ML">AI/ML</option>
              <option value="AI Tools">AI Tools</option>
              <option value="Data Science">Data Science</option>
              <option value="Data Analytics">Data Analytics</option>
              <option value="Ethical Hacking">Ethical Hacking</option>
              <option value="UI UX Designing">UI UX Designing</option>
              <option value="Web Development">Web Development</option>
              <option value="Others">Others</option>
            </select>
          </div>
          <button
            className="w-full bg-[black] text-white py-2 px-4 rounded-md active:bg-[#3a3a3a] transition"
            disabled={loading}
            type="submit"
            
            
          >
            {loading ? <ClipLoader size={30} color="white" /> : "Create"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateCourses;
