import React from "react";
import { SiViaplay } from "react-icons/si";
import { TbDeviceDesktopAnalytics } from "react-icons/tb";
import { FaUikit } from "react-icons/fa6";
import { MdAppShortcut } from "react-icons/md";
import { FaHackerrank } from "react-icons/fa";
import { AiFillOpenAI } from "react-icons/ai";
import { SiGoogledataproc } from "react-icons/si";
import { BsClipboardDataFill } from "react-icons/bs";
import { SiOpenaigym } from "react-icons/si";
import { useNavigate } from "react-router-dom";

const courses = [
  { icon: TbDeviceDesktopAnalytics, title: "Web Development", description: "Learn HTML, CSS, JS, React & more", color: "from-blue-400 to-blue-600" },
  { icon: FaUikit, title: "UI/UX Design", description: "Design beautiful, intuitive interfaces", color: "from-cyan-300 to-cyan-500" },
  { icon: MdAppShortcut, title: "Mobile App Development", description: "Build apps for Android & iOS", color: "from-orange-300 to-orange-500" },
  { icon: FaHackerrank, title: "Ethical Hacking", description: "Protect systems and learn cybersecurity", color: "from-green-300 to-green-500" },
  { icon: AiFillOpenAI, title: "Artificial Intelligence", description: "Explore AI, ML, and deep learning", color: "from-lime-300 to-lime-500" },
  { icon: SiGoogledataproc, title: "Data Science", description: "Analyze data and build predictive models", color: "from-teal-300 to-teal-500" },
  { icon: BsClipboardDataFill, title: "Data Analytics", description: "Turn raw data into insights", color: "from-red-300 to-red-500" },
  { icon: SiOpenaigym, title: "AI Tools & Applications", description: "Use AI tools for real-world tasks", color: "from-purple-300 to-purple-500" },
];

function ExploreCourses() {
  const navigate = useNavigate();

  return (
    <div className="w-full py-16 px-4 md:px-12 bg-gray-100">
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-[25px] md:text-[25px] lg:text-[25px] font-bold mb-4">Explore Our Courses</h2>
        <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base">
          Unlock your potential with our expertly designed courses in Web Development, UI/UX, AI, Mobile Apps, and more. Build skills, advance your career, and stay ahead in technology.
        </p>
        <button
          className="mt-6 px-6 py-3 bg-black text-white rounded-lg font-medium flex items-center gap-2 hover:bg-gray-800 transition"
          onClick={() => navigate("/allcourses")}
        >
          Explore All Courses <SiViaplay className="w-6 h-6 md:w-7 md:h-7" />
        </button>
      </div>

      {/* Course Cards */}
      <div className="relative grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-15">
        {courses.map((course, index) => {
          const Icon = course.icon;
          return (
            <div
              key={index}
              className={`relative flex flex-col items-center p-6 rounded-2xl bg-gradient-to-br ${course.color} shadow-xl hover:scale-105 transform transition cursor-pointer group`}
            >
              {/* Glow border effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-white/10 to-white/0 opacity-50 blur-lg pointer-events-none"></div>

              {/* Icon */}
              <div className="w-20 h-20 md:w-24 md:h-24 flex items-center justify-center bg-white rounded-full mb-4 shadow-md relative z-10">
                <Icon className="w-10 h-10 md:w-14 md:h-14 text-gray-800" />
              </div>

              {/* Title */}
              <h3 className="text-center font-semibold text-gray-800 text-sm md:text-base relative z-10">{course.title}</h3>

              {/* Description tooltip */}
              <p className="absolute bottom-[-3rem] opacity-0 group-hover:opacity-100 transition-all duration-300 bg-black text-white text-xs md:text-sm p-2 rounded-md w-[160px] text-center z-20">
                {course.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ExploreCourses;
