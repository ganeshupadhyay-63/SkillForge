import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ReviewCard from "./reviewCard";

function ReviewPage() {
  const { reviewData } = useSelector((state) => state.review);
  const [latestReview, setLatestReview] = useState([]);

  useEffect(() => {
    setLatestReview(reviewData?.slice(0, 5));
  }, [reviewData]);

  return (
   <div className="w-full py-24 px-4 md:px-12 bg-gray-100 min-h-screen">
  {/* Section Heading */}
  <div className="text-center mb-16">
    <div className="flex items-center justify-center gap-3 text-black font-semibold text-[25px] md:text-[25px] lg:text-[25px] mb-2">
      <span>Student Reviews</span>
      <div className="w-8 h-[2px] bg-black rounded"></div>
    </div>
    <h1 className="text-[17px] md:text-[17px] lg:text-[17px] font-bold text-gray-800">
      What Students Really Say About Our Courses
    </h1>
    <p className="text-gray-600 max-w-2xl mx-auto mt-4 text-sm md:text-base">
      See how <span className="font-semibold text-blue-600">SkillForge</span> is transforming education with real feedback from learners and industry professionals across the globe.
    </p>
  </div>

  {/* Review Cards */}
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 place-items-center">
    {latestReview?.map((review, index) => (
      <div
        key={index}
        className="transform hover:scale-[1.03] transition duration-300"
      >
        <ReviewCard
          comment={review.comment}
          rating={review.rating}
          photoUrl={review.user?.photoUrl}
          courseTitle={review.course?.title}
          description={review.user?.description}
          name={review.user?.name}
        />
      </div>
    ))}
  </div>
</div>

  );
}

export default ReviewPage;
