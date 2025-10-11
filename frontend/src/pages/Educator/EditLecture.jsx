import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { serverUrl } from "../../App";
import { setLectureData } from "../../redux/lectureSlice";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
function EditLecture() {
  const navigate = useNavigate();
  const { courseId, lectureId } = useParams();
  const lectureData = useSelector((state) => state.lecture.lectureData);

  const selectLecture = lectureData.find(
    (lecture) => lecture._id === lectureId
  );
  const [lectureTitle, setLectureTitle] = useState(selectLecture.LectureTitle);
  const [videoUrl, setVideoUrl] = useState("");
  const [isPreviewFree, setIsPreviewFree] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const dispatch = useDispatch();

  const formdata = new FormData();
  formdata.append("lectureTitle", lectureTitle);
  formdata.append("videoUrl", videoUrl);
  formdata.append("isPreviewFree", isPreviewFree);

  const handleEditLecture = async () => {
    setLoading(true);
    try {
      const result = await axios.post(
        serverUrl + `/api/course/editlecture/${lectureId}`,
        formdata,
        { withCredentials: true }
      );
      console.log(result.data);

      const updatedLectures = lectureData.map((lec) =>
        lec._id === lectureId ? result.data : lec
      );

      dispatch(setLectureData(updatedLectures));
      toast.success("Lecture Updated");
      navigate("/courses");
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error(error.response.data.message);
    }
  };

  const removeLecture = async () => {
  setLoading1(true);
  try {
    await axios.delete(
      `${serverUrl}/api/course/removelecture/${lectureId}`,
      { withCredentials: true }
    );

   
    const updatedLectures = lectureData.filter(
      (lec) => lec._id !== lectureId
    );
    dispatch(setLectureData(updatedLectures));

    toast.success("Lecture Removed");
    navigate(`/createlecture/${courseId}`);
    setLoading1(false);
  } catch (error) {
    console.log(error);
    setLoading1(false);
    toast.error(error.response?.data?.message || "Failed to remove lecture");
  }
};


  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-xl bg-white rounded-xl shadow-lg p-6 space-y-6">
        {/* header */}
        <div className="flex items-center gap-2 mb-2">
          <FaArrowLeft
            className="text-gray-600 cursor-pointer"
            onClick={() => navigate(`/createlecture/${courseId}`)}
          />
          <h2 className="text-xl font-semibold text-gray-800">
            Update Course Lecture
          </h2>
        </div>

        <button className="mt-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-all text-sm" disabled={loading1} onClick={removeLecture}>
           {loading1 ? (
                <ClipLoader size={30} color="white" />
              ) : (
                "Remove Lecture"
              )}
        </button>

        <div className="space-y-4">
          <div>
            <label
              htmlFor=""
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              LectureTitle *
            </label>
            <input
              type="text"
              value={lectureTitle}
              onChange={(e) => setLectureTitle(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-[black] focus:outline-none"
              required
            />
          </div>

          <div>
            <label
              htmlFor=""
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              VideoUrl *
            </label>
            <input
              type="file"
              onChange={(e) => setVideoUrl(e.target.files[0])}
              className="w-full border border-gray-300 rounded-md p-2 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:bg-gray-700 file:text-[white] hover:file:bg-gray-500 "
              required
              accept="video *"
            />
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="isFree"
                checked={isPreviewFree}
                onChange={() => setIsPreviewFree((prev) => !prev)}
                className="accent-[black] h-4 w-4"
              />
              <label htmlFor="" id="isFree" className="text-sm text-gray-700">
                Is this Video Free
              </label>
            </div>
            {loading ? <p>Uploading video... Please wait.</p> : ""}
          </div>

          <div className="pt-4">
            <button
              className="w-full bg-black text-white py-3 rounded-md text-sm font-medium hover:bg-gray-700 transition"
              disabled={loading}
              onClick={handleEditLecture}
            >
              {loading ? (
                <ClipLoader size={30} color="white" />
              ) : (
                "Update Lecture"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditLecture;
