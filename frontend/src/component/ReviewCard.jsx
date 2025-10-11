import React from "react";
import { FaStar, FaRegStar } from "react-icons/fa";

function ReviewCard({ comment, rating, photoUrl, name, description, courseTitle }) {
  return (
    <div className="relative bg-white p-6 rounded-xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 max-w-sm w-full border border-gray-100">
      {/* Accent Line */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-t-xl"></div>

      {/* Rating Stars */}
      <div className="flex items-center mb-3 text-yellow-400 text-sm">
        {Array(5)
          .fill(0)
          .map((_, i) => (
            <span key={i}>{i < (rating || 0) ? <FaStar /> : <FaRegStar />}</span>
          ))}
      </div>

      {/* Review Text */}
      <p className="text-gray-500 text-xs mb-1 uppercase tracking-wide">
        Review For <span className="font-semibold text-gray-800">{courseTitle || "Unknown Course"}</span>
      </p>
      <p className="text-gray-700 text-sm mb-5 leading-relaxed italic">
        "{comment || "No comment provided."}"
      </p>

      {/* User Info */}
      <div className="flex items-center gap-3 mt-auto">
        <img
          src={photoUrl || "/default-avatar.png"}
          alt={name || "Anonymous"}
          className="w-12 h-12 rounded-full object-cover border border-gray-200"
        />
        <div>
          <h2 className="font-semibold text-gray-800 text-sm">{name || "Anonymous"}</h2>
          <p className="text-xs text-gray-500">{description || "Student"}</p>
        </div>
      </div>
    </div>
  );
}

export default ReviewCard;
