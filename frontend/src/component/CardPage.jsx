import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Card from "./Card";

function CardPage() {
  const { courseData } = useSelector((state) => state.course);
  const [popularCourses, setPopularCourses] = useState([]);

  useEffect(() => {
    if (courseData?.length > 0) {
      setPopularCourses(courseData.slice(0, 6));
    }
  }, [courseData]);

  return (
    <div className="relative flex flex-col items-center justify-center text-center px-5 bg-gray-100">
      <h1 className="md:text-[25px] text-[25px] font-semibold mt-[30px]">
        Our Popular Courses
      </h1>
      <span className="lg:w-[50%] md:w-[80%] text-[15px] mt-[20px] mb-[30px]">
        Explore top-rated courses designed to boost your skills, enhance careers,
        and unlock opportunities in tech, AI, business, and beyond.
      </span>

      <div className="w-full flex flex-wrap items-center justify-center gap-[50px] lg:p-[50px] md:p-[30px] p-[10px] mb-[40px]">
        {popularCourses.map((course) => (
          <Card
            key={course.id || course._id}
            thumbnail={course.thumbnail}
            title={course.title}
            category={course.category}
            price={course.price}
            id={course.id || course._id}
            reviews={course.reviews}
          />
        ))}
      </div>
    </div>
  );
}

export default CardPage;
