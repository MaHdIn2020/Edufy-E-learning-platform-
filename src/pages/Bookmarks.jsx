import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";

const Bookmarks = () => {
  const { user } = useContext(AuthContext);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetch(`https://edufy-server.vercel.app/bookmarks/${user.email}`)
      .then((res) => res.json())
      .then((data) => setCourses(data));
  }, [user]);

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold text-center mb-5">
        Bookmarked Courses
      </h2>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-300 px-4 py-2 text-left">#</th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Course Name
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Course Code
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Difficulty
              </th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course, index) => (
              <tr key={course._id} className="hover:bg-gray-100">
                <td className="border border-gray-300 px-4 py-2">
                  {index + 1}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {course.courseName}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {course.courseCode}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {course.difficulty}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Bookmarks;
