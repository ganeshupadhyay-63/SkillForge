import React from "react";
import { MdCastForEducation } from "react-icons/md";
import { SiOpenaccess } from "react-icons/si";
import { FaSackDollar } from "react-icons/fa6";
import { BiSupport } from "react-icons/bi";
import { FaUsers } from "react-icons/fa";

const stats = [
  { icon: MdCastForEducation, title: "20K+ Online Courses", color: "from-blue-300 to-blue-500" },
  { icon: SiOpenaccess, title: "Lifetime Access", color: "from-cyan-200 to-cyan-400" },
  { icon: FaSackDollar, title: "Value for Money", color: "from-orange-200 to-orange-400" },
  { icon: BiSupport, title: "Lifetime Support", color: "from-green-200 to-green-400" },
  { icon: FaUsers, title: "Community Support", color: "from-purple-200 to-purple-400" },
];

function Logos() {
  return (
    <div className="w-full py-12 px-4 md:px-12 bg-gray-100 flex flex-wrap justify-center gap-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div
            key={index}
            className={`flex flex-col items-center p-6 rounded-2xl shadow-lg bg-gradient-to-br ${stat.color} hover:scale-105 transform transition cursor-pointer min-w-[160px]`}
          >
            <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center bg-white rounded-full shadow-md mb-3">
              <Icon className="w-8 h-8 md:w-10 md:h-10 text-gray-800" />
            </div>
            <span className="text-center text-sm md:text-base font-medium text-gray-800">{stat.title}</span>
          </div>
        );
      })}
    </div>
  );
}

export default Logos;
