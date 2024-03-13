import React, { useState } from "react";
import getAPIData from "../hooks/getApiData.js";
import { useEffect } from "react";
import Course from "../components/Course.jsx";
import Loader from "../components/Loader.jsx";

const HomePage = () => {
  const [courses, setCourses] = useState(null);
  const { data, getLoading, getError } = getAPIData(
    `${process.env.REACT_APP_NODE_API}/course`
  );
  useEffect(() => {
    if (!getError || !getLoading) {
      setCourses(data?.data);
    }
  }, [data, getLoading, getError]);
  if (getLoading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  }
  return (
    <div className="pt-20 sm:px-20 px-4 py-5 text-white">
      <h2 className="text-3xl font-bold mb-4">All Courses</h2>
      <div className="flex flex-wrap items-center sm:justify-between justify-center gap-4">
        {courses?.map((course) => (
          <Course key={course?.id} course={course} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
