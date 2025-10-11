import React, { useEffect, useRef, useState } from "react";
import { FaArrowLeft, FaStar } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { setSelectedCourse } from "../redux/courseSlice";
import image from "../assets/image1/empty.jpg";
import { IoIosPlayCircle } from "react-icons/io";
import { FaLock } from "react-icons/fa";
import axios from "axios";
import { serverUrl } from "../App";
import { addReview } from "../redux/reviewSlice";
import Card from "../component/Card";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";

function ViewCourse() {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const dispatch = useDispatch();
  const courseData = useSelector((state) => state.course.courseData);
  const selectedCourse = useSelector((state) => state.course.selectedCourse);
  const [selectedLecture, setSelectedLecture] = useState(null);
  const [creatorData, setCreatorData] = useState(null);
  const [creatorCourses, setCreatorCourses] = useState([]);
  const videoRef = useRef(null);
  const { userData } = useSelector((state) => state.user);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (selectedLecture && videoRef.current) {
      videoRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [selectedLecture]);

  useEffect(() => {
    const hanldeCreator = async () => {
      if (selectedCourse?.creator) {
        try {
          const result = await axios.post(
            serverUrl + "/api/course/creator",
            { userId: selectedCourse?.creator },
            { withCredentials: true }
          );
          console.log(result.data);
          setCreatorData(result.data);
        } catch (error) {
          console.log(error);
        }
      }
    };
    hanldeCreator();
  }, [selectedCourse]);

  useEffect(() => {
    if (courseData && courseData.length > 0) {
      const course = courseData.find((c) => c._id === courseId);
      if (course) dispatch(setSelectedCourse(course));
    }
  }, [courseData, courseId, dispatch]);

  if (!selectedCourse) {
    return <p className="text-center mt-10">Loading course...</p>;
  }

  const checkEnrollment = () => {
    const verify = userData?.enrolledCourses?.some(
      (c) =>
        (typeof c === "string" ? c : c._id).toString() === courseId?.toString()
    );

    if (verify) {
      setIsEnrolled(true);
    } else {
      setIsEnrolled(false);
    }
  };

  useEffect(() => {
    checkEnrollment();
  }, [courseData, courseId, userData]);

  useEffect(() => {
    if (creatorData?._id && courseData.length > 0) {
      const creatorCourse = courseData.filter(
        (course) =>
          course.creator === creatorData?._id && course._id !== courseId
      );
      setCreatorCourses(creatorCourse);
    }
  }, [creatorData, courseData]);

  const handleEnroll = async (userId, courseId) => {
    try {
      const orderData = await axios.post(
        serverUrl + "/api/order/razorpay-order",
        { courseId },
        { withCredentials: true }
      );
      console.log(orderData);

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: orderData.data.amount,
        currency: "INR",
        name: "SKILLFORGE",
        description: "COURSE ENROLLMENT PAYMENT",
        order_id: orderData.data.id,
        handler: async function (response) {
          console.log("Razorpay Response", response);

          try {
            const verifyPayment = await axios.post(
              serverUrl + "/api/order/verifypayment",
              {
                ...response,
                courseId,
                userId,
              },
              { withCredentials: true }
            );
            setIsEnrolled(true);
            toast.success(verifyPayment.data.message);
          } catch (error) {
            toast.error(error.response.data.message);
          }
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while enrolling");
    }
  };

  const handleReview = async () => {
    if (!userData) {
      navigate("/signup");
      return;
    }

    setLoading(true);
    try {
      const result = await axios.post(
        serverUrl + "/api/review/createreview",
        { rating, comment, courseId },
        { withCredentials: true }
      );

      setLoading(false);
      toast.success("Review added");
      setRating(0);
      setComment("");

      // Update course reviews
      dispatch(
        setSelectedCourse({
          ...selectedCourse,
          reviews: [result.data, ...(selectedCourse.reviews || [])],
        })
      );

      // Update review slice
      dispatch(addReview(result.data));
    } catch (error) {
      setLoading(false);
      toast.error(error.response?.data?.message || "Failed to submit review");
      setRating(0);
      setComment("");
    }
  };

  const calculateAvgReview = (reviews) => {
    if (!reviews || reviews.length === 0) {
      return 0;
    }
    const total = reviews.reduce((sum, review) => sum + review.rating, 0);
    return (total / reviews.length).toFixed(1);
  };

  const avgRating = calculateAvgReview(selectedCourse?.reviews);

  return (
    <div className="min-h-screen bg-gray-500 p-6">
      <div className="max-w-6xl mx-auto bg-white shadow-md rounded-xl p-6 space-y-6 relative">
        {/* Top section */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Thumbnails */}
          <div className="w-full md:w-1/2">
            <FaArrowLeft
              className="text-black w-[22px] h-[22px] cursor-pointer"
              onClick={() => navigate("/")}
            />
            {selectedCourse?.thumbnail ? (
              <img
                src={selectedCourse.thumbnail}
                alt={selectedCourse.title || "Course"}
                className="rounded-xl w-full object-cover"
              />
            ) : (
              <img
                src={image}
                alt="No thumbnail"
                className="rounded-xl w-full object-cover"
              />
            )}
          </div>

          {/* Course Info */}
          <div className="flex-1 space-y-2 mt-[20px]">
            <h2 className="text-2xl font-bold">{selectedCourse.title}</h2>
            <p className="text-gray-600">{selectedCourse.subTitle}</p>
            <div className="flex items-start flex-col justify-between">
              <div className="text-yellow-500 font-medium">
                <span className="flex items-center justify-start gap-1">
                  <FaStar /> {avgRating}
                </span>
                <span className="text-gray-400 font-medium flex gap-2">
                  (1,200 Reviews)
                </span>
              </div>
              <div>
                <span className="text-xl font-semibold text-black">
                  ${selectedCourse.price}
                </span>
                <span className="line-through text-sm text-gray-400">
                  {" "}
                  $1000
                </span>
              </div>
              <ul className="text-gray-700 space-y-1 pt-2">
                <li> ✅ 6+ hours of video content</li>
                <li> ✅ Lifetime access to course materials</li>
              </ul>

              {!isEnrolled ? (
                <button
                  className="bg-black text-white px-6 py-2 rounded hover:bg-gray-700 mt-3 cursor-pointer"
                  onClick={() => handleEnroll(userData._id, courseId)}
                >
                  Enroll Now
                </button>
              ) : (
                <button className="bg-green-200 text-green-500 px-6 py-2 rounded hover:bg-gray-700 mt-3 cursor-pointer">
                  Watch Now
                </button>
              )}
            </div>
          </div>
        </div>

        {/* What You'll Learn */}
        <div>
          <h2 className="text-xl font-semibold mb-2">What You'll Learn</h2>
          <ul className="list-disc pl-6 text-gray-700 space-y-1">
            <li>Learn {selectedCourse.category} from Beginning</li>
          </ul>
        </div>

        {/* Who This Course is For */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Who This Course is For</h2>
          <p>
            Beginners, aspiring developers, and professionals looking to upgrade
            skills
          </p>
        </div>

        {/* Course Curriculum */}
        <div className="flex flex-col md:flex-row gap-6">
          <div className="bg-white w-full md:w-2/5 p-6 rounded-2xl shadow-lg border border-gray-200">
            <h2 className="text-xl font-bold mb-1 text-gray-800">
              Course Curriculum
            </h2>
            <p className="text-sm text-gray-500 mb-4">
              {selectedCourse?.lectures?.length || 0} Lectures
            </p>
            <div className="flex flex-col gap-3">
              {selectedCourse?.lectures?.map((lecture) => (
                <button
                  key={lecture._id}
                  disabled={!lecture.isPreviewFree}
                  onClick={() => {
                    if (lecture.isPreviewFree) {
                      setSelectedLecture(lecture);
                    }
                  }}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg border transition-all duration-200 text-left ${
                    lecture.isPreviewFree
                      ? "hover:bg-gray-300 cursor-pointer border-gray-300"
                      : "cursor-not-allowed opacity-60 border-gray-200"
                  } ${
                    selectedLecture?.lectureTitle === lecture?.lectureTitle
                      ? "bg-gray-100 border-gray-400"
                      : ""
                  }`}
                >
                  <span className="tedxt-lg text-gray-700">
                    {lecture.isPreviewFree ? <IoIosPlayCircle /> : <FaLock />}
                  </span>
                  <span className="text-sm font-medium text-gray-800">
                    {lecture.lectureTitle || lecture.title}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white w-full md:w-3/5 p-6 rounded-2xl shadow-lg border border-gray-200">
            <div
              ref={videoRef}
              className="aspect-video w-full rounded-lg overflow-hidden mb-4 bg-black flex items-center justify-center"
            >
              {selectedLecture?.videoUrl ? (
                <video
                  className="w-full h-full object-cover"
                  src={selectedLecture?.videoUrl}
                  controls
                />
              ) : (
                <span className="text-white text-sm">
                  Select a preview lecture to watch{" "}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="mt-8 border-t pt-6">
          <h2 className="text-xl font-semibold mb-2">Write a Review</h2>
          <div className="mb-4">
            <div className="flex gap-1 mb-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar
                  key={star}
                  onClick={() => setRating(star)}
                  className={
                    star <= rating ? "fill-amber-300" : "fill-gray-300"
                  }
                />
              ))}
            </div>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write your review here..."
              rows={3}
              className="w-full border border-gray-300 rounded-lg p-2"
            />
            <button
              className="bg-black text-white mt-3 px-4 py-2 rounded hover:bg-gray-800"
              disabled={loading}
              onClick={handleReview}
            >
              {loading ? (
                <ClipLoader size={30} color="white" />
              ) : (
                "Submit Review"
              )}
            </button>
          </div>
        </div>
        {/* for creator information */}
        <div className="flex items-center gap-4 pt-4 border-t">
          {creatorData?.photoUrl ? (
            <img
              src={creatorData.photoUrl}
              alt={creatorData?.name || "Creator"}
              className="border border-gray-200 w-16 h-16 rounded-full object-cover"
            />
          ) : (
            <img
              src="/default-avatar.png"
              alt="Default avatar"
              className="border border-gray-200 w-16 h-16 rounded-full object-cover"
            />
          )}
          <div>
            <h2 className="text-lg font-semibold">{creatorData?.name}</h2>
            <p className="md:text-sm text-gray-600 text-[10px]">
              {creatorData?.description}
            </p>
            <p className="md:text-sm text-gray-600 text-[10px]">
              {creatorData?.email}
            </p>
          </div>
        </div>

        <div>
          <p className="text-xl font-semibold mb-2">
            Other Published Courses by the Educator
          </p>
        </div>

        <div className="w-full transition-all duration-300 py-5 flex flex-wrap gap-6 justify-center lg:justify-start lg:px-20">
         {creatorCourses.length > 0 ? (
  creatorCourses.map((course) => {
    const reviewCount = course.reviews?.length || 0;
    const avgRating = reviewCount
      ? (
          course.reviews.reduce((sum, r) => sum + r.rating, 0) / reviewCount
        ).toFixed(1)
      : 0;

    return (
      <Card
        key={course._id}
        thumbnail={course.thumbnail}
        id={course._id}
        price={course.price}
        title={course.title}
        category={course.category}
        avgRating={avgRating}
        reviewCount={reviewCount}
      />
    );
  })
) : (
  <p className="text-gray-500 text-center w-full mt-4">
    No other courses by this educator.
  </p>
)}

        </div>
      </div>
    </div>
  );
}

export default ViewCourse;
