import React, { useEffect, useRef, useState } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate, useParams } from "react-router-dom";
import image from "../../assets/image1/empty.jpg";
import { FaEdit } from "react-icons/fa";
import axios from "axios";
import { serverUrl } from "../../App";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import { useDispatch, useSelector } from "react-redux";
import { setCourseData } from "../../redux/courseSlice";

function EditCourses() {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const [isPublished, setIsPublished] = useState(true);
  const thumb = useRef();
  const [selectCourse, setSelectCourse] = useState("");
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [level, setLevel] = useState("");
  const [price, setPrice] = useState("");
  const [frontendImage, setFrontendImage] = useState(image);
  const [backendImage, setBackendImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const dispatch = useDispatch()
  const {courseData} = useSelector(state=>state.course)


  const handleThumbnail = (e) => {
    const file = e.target.files[0];
    setBackendImage(file);
    setFrontendImage(URL.createObjectURL(file));
  };

  const getCourseById = async () => {
    try {
      const result = await axios.get(
        serverUrl + `/api/course/getcourse/${courseId}`,
        { withCredentials: true }
      );
      setSelectCourse(result.data);
      console.log(result.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (selectCourse) {
      setTitle(selectCourse.title || "");
      setSubTitle(selectCourse.subTitle || "");
      setDescription(selectCourse.description || "");
      setCategory(selectCourse.category || "");
      setLevel(selectCourse.level || "");
      setPrice(selectCourse.price || "");
      setTitle(selectCourse.title || "");
      setFrontendImage(selectCourse.thumbnail || "");
      setTitle(selectCourse.title || "");
      setIsPublished(selectCourse?.isPublished);
    }
  }, [selectCourse]);

  useEffect(() => {
    getCourseById();
  }, []);

  const handleEditCourse = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("subTitle", subTitle);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("level", level);
    formData.append("price", price);
    formData.append("thumbnail", backendImage);
    formData.append("isPublished", isPublished);
    try {
      const result = await axios.post(
        serverUrl + `/api/course/editcourse/${courseId}`,formData,
        { withCredentials: true }
      );
      console.log(result.data);
      const updateData = result.data
      if(updateData.isPublished){
        const updateCourses = courseData.map(c=> c._id===courseId ?updateData : c)
        if(!courseData.some(c=> c._id===courseId)){
          updateCourses.push(updateData)
        }
        dispatch(setCourseData(updateCourses))
      }
      else{
        const filterCourses = courseData.filter(c=>c._id !== courseId)
      dispatch(setCourseData(filterCourses))

      }
      setLoading(false);
      toast.success("Course Updated");
      navigate("/courses");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const handleRemoveCourse = async()=>{
    setLoading1(true)
    try{
      const result = await axios.delete(serverUrl + `/api/course/remove/${courseId}`, {withCredentials:true})
      console.log(result.data)
      const filterCourses = courseData.filter(c=>c._id !== courseId)
      dispatch(setCourseData(filterCourses))
      setLoading1(false)
      toast.success("Course Removed")
      navigate("/courses")


    }catch(error){
      setLoading1(false)
      console.log(error)
      toast.error(error.response.data.message)

    }
  }

  return (
    <div className="max-w-5xl mx-auto p-6 mt-10 bg-white rounded-lg shadow-md">
      {/* top bar */}
      <div className="flex items-center justify-center gap-[20px] md:justify-between flex-col md:flex-row mb-6 relative">
        <FaArrowLeft
          className="absolute top-[-20%] md:top-[20%] left-0 md:left-[2%] w-[22px] h-[22px] cursor-pointer"
          onClick={() => navigate("/courses")}
        />

        <h2 className="text-2xl font-semibold md:pl-[60px]">
          Add Detail Information Regarding the Course
        </h2>
        <div className="space-x-2 space-y-2">
          <button className="bg-black text-white px-4 py-2 rounded-md" onClick={()=>navigate(`/createlecture/${selectCourse?._id}`)}>
            Go to Lecture page
          </button>
        </div>
      </div>

      {/* form detail page */}
      <div className="bg-gray-50 p-6 rounded-md">
        <h2 className="text-lg font-medium mb-4">Basic Course Information</h2>
        <div className="space-x-2 space-y-2">
          {!isPublished ? (
            <button
              className="bg-green-100 text-green-600 px-4 py-2 rounded-md border"
              onClick={() => setIsPublished((prev) => !prev)}
            >
              Click to Publish
            </button>
          ) : (
            <button
              className="bg-green-100 text-red-600 px-4 py-2 rounded-md border"
              onClick={() => setIsPublished((prev) => !prev)}
            >
              Click to UnPublish
            </button>
          )}
          <button className="bg-red-600 text-white px-4 py-2 rounded-md" onClick={handleRemoveCourse}>
            Remove Course
          </button>
        </div>

        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Title
            </label>
            <input
              id="title"
              type="text"
              placeholder="Course Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border px-4 py-2 rounded-md"
            />
          </div>
          <div>
            <label
              htmlFor="subtitle"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Subtitle
            </label>
            <input
              id="subtitle"
              type="text"
              placeholder="Course Subtitle"
              value={subTitle}
              onChange={(e) => setSubTitle(e.target.value)}
              className="w-full border px-4 py-2 rounded-md"
            />
          </div>
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Description
            </label>
            <textarea
              id="description"
              placeholder="Course Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border px-4 py-2 rounded-md h-24 resize-none"
            ></textarea>
          </div>

          <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
            {/* for categories */}
            <div className="flex-1">
              <label
                htmlFor=""
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Course Category
              </label>
              <select
                name=""
                id=""
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full border px-4 py-2 rounded-md bg-white"
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

            {/* for level  */}
            <div className="flex-1">
              <label
                htmlFor=""
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Course Level
              </label>
              <select
                name=""
                id=""
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                className="w-full border px-4 py-2 rounded-md bg-white"
              >
                <option value="">Select Level</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advance">Advance</option>
              </select>
            </div>

            {/* for price */}
            <div className="flex-1">
              <label
                htmlFor=""
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Course Price(in $)
              </label>
              <input
                type="number"
                id="price"
                placeholder="$"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full border px-4 py-2 rounded-md"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor=""
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Choose Course Thumbnail
            </label>
            <input
              type="file"
              hidden
              ref={thumb}
              accept="/image/*"
              onChange={handleThumbnail}
            />
          </div>
          <div className="relative max-w-[250px] min-h-[150px] border border-black rounded-[5px] overflow-hidden">
            <img
              src={frontendImage || image}
              onClick={() =>thumb.current && thumb.current.click()}
              className="w-full h-full object-cover cursor-pointer"
            />
            <FaEdit
              className="w-[20px] h-[20px] absolute top-2 right-2 text-black cursor-pointer"
              onClick={() => thumb.current.click()}
              title="Edit"
            />
          </div>

          <div className="flex items-center justify-start gap-[15px]">
            <button
              className="bg-[#e9e8e8] hover:bg-red-200 text-black border-2 border-black cursor-pointer px-4 py-2 rounded-md"
              onClick={() => navigate("/courses")}
            >
              Cancel
            </button>

            <button
              className="bg-black text-white px-7 py-2 rounded-md hover:bg-gray-500 cursor-pointer"
              onClick={ handleEditCourse }
            >
              {loading ? <ClipLoader size={30} color="white" /> : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditCourses;
