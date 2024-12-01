import { useLoaderData, useNavigate } from "react-router-dom";
import { useState } from "react";
import Swal from "sweetalert2";

const UpdateCourse = () => {
  const course = useLoaderData();
  const navigate = useNavigate();
  // console.log(course);
  // Initialize form data with existing course details
  const [courseData, setCourseData] = useState({ ...course });
  // console.log(courseData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseData({ ...courseData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Send updated course data to the server
    fetch(`https://edufy-server.vercel.app/courses/${course._id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(courseData),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        if (data.modifiedCount > 0) {
          Swal.fire({
            title: "Success!",
            text: "Course updated successfully",
            icon: "success",
            confirmButtonText: "Cool",
          });
          navigate("/"); // Redirect to home or courses page after successful update
        }
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-3xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Update Course
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Course Code */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Course Code
            </label>
            <input
              type="text"
              name="course_code"
              value={courseData.course_code}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          {/* Course Name */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Course Name
            </label>
            <input
              type="text"
              name="course_name"
              value={courseData.course_name}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          {/* Duration */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Duration (e.g., 3-4 years)
            </label>
            <input
              type="text"
              name="duration"
              value={courseData.duration}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          {/* Difficulty */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Difficulty
            </label>
            <input
              type="text"
              name="difficulty"
              value={courseData.difficulty}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          {/* Category */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Category
            </label>
            <select
              name="category"
              value={courseData.category}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="Engineering">Engineering</option>
              <option value="Medical">Medical</option>
              <option value="Business">Business</option>
              <option value="General">General</option>
            </select>
          </div>
          {/* Course Details */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Course Details
            </label>
            <textarea
              name="details"
              value={courseData.details}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="4"
              required
            />
          </div>
          {/* Instructor */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Instructor
            </label>
            <input
              type="text"
              name="instructor"
              value={courseData.instructor}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          {/* Price */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Course Price (USD)
            </label>
            <input
              type="number"
              name="price"
              value={courseData.price}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          {/* Image URL */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Image URL
            </label>
            <input
              type="url"
              name="imageUrl"
              value={courseData.imageUrl}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
            >
              Update Course
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateCourse;
