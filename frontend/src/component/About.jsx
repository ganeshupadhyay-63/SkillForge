import React from "react";
import about from "../assets/image1/about.jpg";
import { MdLinearScale } from "react-icons/md";
import { FaCircleCheck } from "react-icons/fa6";

function About() {
  return (
    <section className="w-full bg-gray-100 py-16 px-6 flex flex-col items-center gap-10">
      {/* Section Title */}
      <div className="flex items-center gap-3 text-black font-bold text-2xl">
        <span>About Us</span>
        <MdLinearScale className="w-6 h-6" />
      </div>

      {/* Heading */}
      <h2 className="text-xl md:text-xl font-bold text-gray-800 text-center leading-snug max-w-3xl">
        Unlock Your <span className="text-blue-600">Full Learning</span>{" "}
        Potential
      </h2>

      {/* Image */}
      <div className="w-full flex items-center justify-center">
        <div className="w-full md:w-3/4 lg:w-2/3 flex items-center justify-center">
          <img
            src={about}
            alt="About SkillForge"
            className="w-full lg:w-[80%] h-auto rounded-2xl shadow-2xl transform transition duration-500 group-hover:scale-105 group-hover:shadow-3xl"
          />
        </div>
      </div>

      {/* Description */}
      <p className="text-gray-700 text-base md:text-lg leading-relaxed text-center max-w-3xl">
        Our modern Learning Management System simplifies online education,
        tracks student progress effectively, and strengthens collaboration
        between learners and instructors. Experience seamless, innovative, and
        impactful learning with SkillForge.
      </p>

      {/* Features */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6 max-w-3xl">
        {[
          "Seamless Learning",
          "Expert Mentors",
          "Proven Experience",
          "Lifetime Access",
        ].map((feature, i) => (
          <div
            key={i}
            className="flex items-center gap-3 text-gray-700 hover:text-blue-600 transition duration-300"
          >
            <FaCircleCheck className="w-6 h-6 text-blue-600" />
            <span className="text-base font-medium">{feature}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default About;
