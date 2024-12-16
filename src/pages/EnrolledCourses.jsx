import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { useNavigate } from "react-router-dom";

const EnrolledCourses = () => {
  const { user } = useContext(AuthContext);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:4000/enrolledCourses?email=${user.email}`)
      .then((res) => res.json())
      .then((data) => setEnrolledCourses(data));
  }, [user.email]);

  return (
    <div className="p-5">
      <h2 className="text-3xl font-bold">My Enrolled Courses</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-5">
        {enrolledCourses.map((course) => (
          <div
            key={course._id}
            className="card bg-white shadow-md p-4 border rounded-lg"
          >
            <img
              src={course.imageUrl}
              alt={course.course_name}
              className="w-full h-40 object-cover rounded-md"
            />
            <h3 className="text-xl font-semibold mt-3">{course.course_name}</h3>
            <p>{course.details.slice(0, 100)}...</p>
            <button
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md"
              onClick={() =>
                navigate(`/showMoudules/${course._id}`, { state: course })
              }
            >
              Go to course page
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EnrolledCourses;
