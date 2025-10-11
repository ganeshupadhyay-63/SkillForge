import React from 'react';
import { FaStar, FaRegStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Card({ id, thumbnail, title, category, price, avgRating = 0, reviewCount = 0 }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/viewcourse/${id}`)}
      className="max-w-sm w-full bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl hover:scale-105 transition-transform duration-300 border border-gray-200 cursor-pointer"
    >
      {/* Course Image */}
      <img
        src={thumbnail || "/default-course.png"}
        alt={title || "Course"}
        className="w-full h-48 object-cover"
      />

      {/* Course Details */}
      <div className="p-5 space-y-3">
        {/* Title */}
        <h2 className="text-lg font-bold text-gray-900 truncate">{title || "Untitled Course"}</h2>

        {/* Category */}
        <span className="inline-block px-3 py-1 bg-gray-100 rounded-full text-gray-700 text-sm capitalize">
          {category || "General"}
        </span>

        {/* Rating */}
        <div className="flex items-center gap-1 mt-2">
          {Array.from({ length: 5 }, (_, i) => (
            <span key={i}>
              {i < Math.round(avgRating) ? (
                <FaStar className="text-yellow-500" />
              ) : (
                <FaRegStar className="text-gray-300" />
              )}
            </span>
          ))}
          <span className="text-gray-600 text-sm ml-2">({reviewCount})</span>
        </div>

        {/* Price */}
        <div className="flex justify-between items-center mt-3">
          <span className="text-xl font-semibold text-gray-800">${price || "Free"}</span>
          <button className="bg-black text-white px-4 py-1 rounded hover:bg-gray-800 transition-colors text-sm">
            Enroll
          </button>
        </div>
      </div>
    </div>
  );
}

export default Card;
