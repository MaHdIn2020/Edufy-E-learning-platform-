import { Link, useLoaderData, useNavigate } from "react-router-dom";
import Banner from "./Banner";
import Heading from "./Heading";
import { useContext, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../providers/AuthProvider";

const Home = () => {
  const { userType, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const allCourses = useLoaderData();
  const [courses, setCourses] = useState(allCourses);

  // Sorting courses by difficulty
  const handleSortByDifficulty = () => {
    const sortedCourses = [...courses].sort(
      (a, b) => a.difficulty - b.difficulty
    );
    setCourses(sortedCourses);
  };

  //----------------------------------------------------------------

  const handleDelete = (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://edufy-server.vercel.app/courses/${_id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            // console.log(data);
            if (data.deletedCount) {
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",
              });

              // update the loaded coffee state
              const remainingCourses = courses.filter(
                (course) => course._id !== _id
              );
              setCourses(remainingCourses);
            }
          });
      }
    });
  };

  //----------------------------------------------------------------

  const handleBookmark = (id, course_code, course_name, difficulty, email) => {
    console.log("book", id, course_code, course_name, difficulty, email);

    const courseData = {
      courseId: id,
      courseName: course_name,
      courseCode: course_code,
      difficulty: difficulty,
      bookmarkedEmail: email,
    };

    fetch("https://edufy-server.vercel.app/bookmarks", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(courseData),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);

        if (data.insertedId) {
          Swal.fire({
            title: "Success!!!",
            text: "Course bookmarked successfully",
            icon: "success",
            confirmButtonText: "Cool",
          });

          navigate("/bookmarks");
        }
      });
  };

  return (
    <div>
      <header>
        <Banner></Banner>
      </header>

      {/* Heading */}
      <div>
        <Heading
          title={"Explore Diverse Learning Opportunities"}
          subtitle={
            "Broaden your horizons with our wide range of courses, designed to cater to learners of all levels. Whether you're a beginner or an expert, our platform offers engaging and enriching experiences in various disciplines. Join us in the pursuit of knowledge and skill-building that empowers you for the future."
          }
        ></Heading>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-3xl font-bold">
          Total Courses: {courses.length}
        </div>

        {/* Sort by Difficulty Button */}
        <div className="px-4 mb-4">
          <button
            onClick={handleSortByDifficulty}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded shadow"
          >
            Sort by Difficulty
          </button>
        </div>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
        {courses.slice(0, 3).map((course) => (
          <div
            key={course._id}
            className="bg-white shadow-md rounded-lg overflow-hidden"
          >
            {/* Course Image */}
            <img
              src={course.imageUrl}
              alt={course.course_name}
              className="w-full h-48 object-cover"
            />
            {/* Course Details */}
            <div className="p-4">
              <h2 className="text-lg font-bold mb-2">{course.course_name}</h2>
              <p className="text-gray-700 text-sm mb-2">
                Code: {course.course_code}
              </p>
              <p className="text-gray-700 text-sm mb-2">
                Duration: {course.duration} years
              </p>
              <p className="text-gray-700 text-sm mb-2">
                Difficulty: {course.difficulty}/10
              </p>
              <p className="text-gray-700 text-sm mb-2">
                Category: {course.category}
              </p>

              {/* Learn More Button */}
              <div className="flex justify-center items-center gap-6">
                <Link to={`/courseDetails/${course._id}`}>
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Learn More
                  </button>
                </Link>

                {userType === "Student" && (
                  <div>
                    <button
                      onClick={() =>
                        handleBookmark(
                          course._id,
                          course.course_code,
                          course.course_name,
                          course.difficulty,
                          user.email
                        )
                      }
                      className="btn bg-blue-400 text-white"
                    >
                      Bookmark
                    </button>
                  </div>
                )}

                {userType === "Admin" && (
                  <Link to={`updateCourse/${course._id}`}>
                    <button className="btn bg-yellow-300">Edit</button>
                  </Link>
                )}

                {userType === "Admin" && (
                  <button
                    onClick={() => handleDelete(course._id)}
                    className="btn bg-red-600 text-white"
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center my-8">
        <button onClick={() => navigate("/allCourses")} className="btn">
          Show All Courses
        </button>
      </div>
    </div>
  );
};

export default Home;
