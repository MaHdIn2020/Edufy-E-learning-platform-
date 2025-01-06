import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";

const MyProfile = () => {
  const { user } = useContext(AuthContext);
  const [profile, setProfile] = useState({});
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetch(`https://edufy-server.vercel.app/users/${user.email}`)
      .then((res) => res.json())
      .then((data) => setProfile(data));
  }, [user.email]);

  useEffect(() => {
    fetch(`https://edufy-server.vercel.app/progress/${user.email}`)
      .then((res) => res.json())
      .then((data) => setCourses(data));
  }, [user.email]);

  const { name, imageUrl, email, userType } = profile;

  const completedCourses = courses.filter(
    (course) => course.completedModules === 5
  );
  const ongoingCourses = courses.filter(
    (course) => course.completedModules < 5
  );

  return (
    <div className="p-4 sm:p-10 bg-gray-50">
      {/* Profile Section */}
      <div className="flex flex-col justify-center  items-center bg-white rounded-lg shadow-lg p-6  md:space-x-6">
        <img
          src={imageUrl || "https://via.placeholder.com/150"}
          alt="Profile"
          className="w-32 h-32 rounded-full object-cover"
        />
        <div className="mt-4 md:mt-0 text-center">
          <h1 className="text-2xl font-bold text-gray-800">{name}</h1>
          <p className="text-gray-600">{email}</p>
          <span className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-full mt-2 inline-block">
            {userType}
          </span>
        </div>
      </div>

      {/* Summary Section */}
      <div className="mt-10 bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Course Summary</h2>
        <div className="flex justify-between items-center">
          <p className="text-lg font-semibold">
            Total Courses Accessed: {courses.length}
          </p>
          <p className="text-lg font-semibold">
            Completed: {completedCourses.length}
          </p>
          <p className="text-lg font-semibold">
            Ongoing: {ongoingCourses.length}
          </p>
        </div>
      </div>

      {/* Courses Section */}
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div
            key={course._id}
            className="bg-white rounded-lg shadow-lg p-4 relative"
          >
            <h3 className="text-lg font-bold text-gray-800">
              {course.courseName}
            </h3>
            <p className="text-gray-600">
              Completed Modules: {course.completedModules}/5
            </p>
            <p
              className={`mt-2 text-sm font-semibold ${
                course.completedModules === 5
                  ? "text-green-600"
                  : "text-yellow-600"
              }`}
            >
              {course.completedModules === 5 ? "Completed" : "Ongoing"}
            </p>
            {course.completedModules === 5 && (
              <span className="absolute top-2 right-2 px-3 py-1 text-xs font-bold text-white bg-green-600 rounded-full">
                Completed
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyProfile;
