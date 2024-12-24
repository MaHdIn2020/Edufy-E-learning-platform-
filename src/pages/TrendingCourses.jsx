import { useLoaderData } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const TrendingCourses = () => {
  const trendingCourses = useLoaderData();

  // Sort courses by rating and pick the top 5
  const topCourses = [...trendingCourses]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 5);

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold text-center mb-5">
        Top 5 Trending Courses
      </h2>
      <div className="flex flex-col items-center">
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={topCourses}
            margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="courseName" tick={{ fontSize: 12 }} />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="rating" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-5 mt-10">
        {topCourses.map((course) => (
          <div key={course._id} className="border p-4 rounded-lg shadow-lg">
            <img
              src={course.courseImageUrl}
              alt={course.courseName}
              className="h-32 w-full object-cover rounded-md mb-4"
            />
            <h3 className="text-xl font-semibold">{course.courseName}</h3>
            <p className="text-gray-600">Course Code: {course.courseCode}</p>
            <p className="text-gray-600">Rating: {course.rating}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendingCourses;
