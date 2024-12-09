/* eslint-disable no-unused-vars */
import { useContext } from "react";
import { useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../providers/AuthProvider";

const CourseDetails = () => {
  const { user, userType } = useContext(AuthContext);
  const course = useLoaderData();

  const {
    course_code,
    course_name,
    duration,
    difficulty,
    category,
    details,
    instructor,
    price,
    imageUrl,
  } = course;

  const handleEnrollment = () => {
    const { _id, ...course_data } = course;
    const enrolledCourseData = {
      ...course_data,
      userEmail: user.email,
    };

    fetch("http://localhost:4000/enrolledCourses", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(enrolledCourseData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          Swal.fire("Course enrolled successfully");
        }
      });
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-4xl">
        {/* Course Image */}
        <img
          src={imageUrl}
          alt={course_name}
          className="w-full h-64 object-cover"
        />
        {/* Details Section */}
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            {course_name}
          </h1>
          <p className="text-gray-500 text-sm uppercase mb-6">
            Course Code: {course_code}
          </p>
          <div className="space-y-4">
            {/* Category */}
            <div className="flex justify-between items-center">
              <span className="text-gray-700 font-medium">Category:</span>
              <span className="text-gray-800">{category}</span>
            </div>
            {/* Duration */}
            <div className="flex justify-between items-center">
              <span className="text-gray-700 font-medium">Duration:</span>
              <span className="text-gray-800">{duration} years</span>
            </div>
            {/* Difficulty */}
            <div className="flex justify-between items-center">
              <span className="text-gray-700 font-medium">Difficulty:</span>
              <span className="text-gray-800">{difficulty}/10</span>
            </div>
            {/* Price */}
            <div className="flex justify-between items-center">
              <span className="text-gray-700 font-medium">Price:</span>
              <span className="text-gray-800">${price}</span>
            </div>
            {/* Instructor */}
            <div className="flex justify-between items-center">
              <span className="text-gray-700 font-medium">Instructor:</span>
              <span className="text-gray-800">{instructor}</span>
            </div>
          </div>
          {/* Details */}
          <div className="mt-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              Course Details
            </h2>
            <p className="text-gray-700">{details}</p>
          </div>

          {userType === "Student" && (
            <div className="flex justify-center gap-6">
              <button
                onClick={handleEnrollment}
                className="btn bg-blue-500 text-white"
              >
                Enroll
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
