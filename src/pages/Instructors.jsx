import { useLoaderData } from "react-router-dom";
import logo from "../assets/instructor.png";
const Instructors = () => {
  const allCourses = useLoaderData();

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold text-center mb-8">Our Instructors</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {allCourses.map((course) => (
          <div
            key={course._id}
            className="bg-white shadow-lg rounded-lg p-4 text-center border border-gray-200"
          >
            {/* Default User Avatar */}
            <div className="w-24 h-24 mx-auto mb-4">
              <img
                // src="https://via.placeholder.com/150/000000/FFFFFF/?text=User"
                src={logo}
                alt="Default Avatar"
                className="w-full h-full object-cover rounded-full"
              />
            </div>

            {/* Instructor Info */}
            <h3 className="text-lg font-semibold mb-2">{course.instructor}</h3>
            <p className="text-gray-500 text-sm">
              <span className="font-bold">Course:</span> {course.course_name}
            </p>
            <p className="text-gray-500 text-sm">
              <span className="font-bold">Code:</span> {course.course_code}
            </p>
            <p className="text-gray-500 text-sm">
              <span className="font-bold">Category:</span> {course.category}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Instructors;
