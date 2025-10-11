import React from "react";
import Nav from "../component/Nav";
import home from "../assets/image1/homepageimg.jpg";
import { SiViaplay } from "react-icons/si";
import ai from "../assets/image1/ai.png";
import ai1 from "../assets/image1/SearchAi.png";
import Logos from "../component/Logos";
import ExploreCourses from "../component/ExploreCourses";
import CardPage from "../component/CardPage";
import { useNavigate } from "react-router-dom";
import About from "../component/About";
import Footer from "../component/Footer";
import ReviewPage from "../component/ReviewPage";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="w-full overflow-hidden bg-gray-50">
      {/* Navbar */}
      <div className="relative z-50">
        <Nav />
      </div>

      {/* Hero Section */}
      <div className="relative w-full lg:h-[100vh] h-[80vh] flex items-center justify-center">
        {/* Background Image */}
        <img
          src={home}
          alt="Hero"
          className="w-full h-full object-cover"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-transparent"></div>

        {/* Hero Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 animate-fadeIn">
          <h1 className="text-white font-extrabold text-[27px] md:text-[27px] lg:text-[30px] leading-snug drop-shadow-lg">
            Master New Skills
          </h1>
          <h2 className="text-gray-200 font-medium text-[20px] md:text-[20px] lg:text-[20px] mt-4 mb-8">
            Elevate Your Career Path with AI-powered Learning
          </h2>

          {/* Buttons */}
          <div className="flex flex-wrap gap-5 justify-center">
            <button
              className="flex items-center gap-3 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold hover:from-indigo-700 hover:to-blue-700 transition-transform transform hover:scale-105 shadow-md"
              onClick={() => navigate("/allcourses")}
            >
              View All Courses <SiViaplay className="w-6 h-6" />
            </button>
            <button
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-gray-900 font-semibold hover:bg-gray-200 transition-transform transform hover:scale-105 shadow-md"
              onClick={() => navigate("/searchwithai")}
            >
              Search with AI
              <img
                src={ai}
                alt="ai"
                className="w-8 h-8 rounded-full hidden lg:block"
              />
              <img
                src={ai1}
                alt="ai1"
                className="w-9 h-9 rounded-full lg:hidden"
              />
            </button>
          </div>
        </div>
      </div>

      {/* Sections */}
      <Logos />
      <ExploreCourses />
      <CardPage />
      <About />
      <ReviewPage />
      <Footer />
    </div>
  );
}

export default Home;
