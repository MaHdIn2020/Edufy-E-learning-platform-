import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const ShowModules = () => {
  const { user } = useContext(AuthContext);
  const { state: course } = useLocation();
  const navigate = useNavigate();

  const handleProgress = () => {
    const moduleInfo = {
      userEmail: user.email,
      courseId: course._id,
      courseName: course.course_code,
    };

    fetch(`http://localhost:4000/progress`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(moduleInfo),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          Swal.fire(`${course.course_code} has been started for you`);
        }
      });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <div className="max-w-4xl w-full bg-white shadow-md rounded-lg overflow-hidden">
        {/* Course Image */}
        <img
          src={course.imageUrl}
          alt={course.course_name}
          className="w-full h-64 object-cover"
        />

        {/* Course Content */}
        <div className="p-6">
          {/* Header Section */}
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-800">
              {course.course_name}
            </h1>
            <span className="text-blue-600 font-semibold">
              Category: {course.category}
            </span>
          </div>

          <p className="text-gray-600 mt-2">{course.details}</p>

          {/* Course Properties */}
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <h3 className="font-semibold text-gray-800">Course Code</h3>
              <p>{course.course_code}</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Duration</h3>
              <p>{course.duration} months</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Difficulty</h3>
              <p>{course.difficulty}</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Instructor</h3>
              <p>{course.instructor}</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Price</h3>
              <p>৳{course.price}</p>
            </div>
          </div>

          {/* User Information */}
          <div className="mt-4 border-t pt-4">
            <h3 className="text-lg font-bold text-gray-800">
              Welcome, {user.displayName}!
            </h3>
            <p className="text-gray-600">Email: {user.email}</p>
          </div>

          {/* Buttons */}
          <div className="mt-6 flex flex-col md:flex-row gap-4">
            <button
              onClick={handleProgress}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md w-full md:w-auto"
            >
              Start Course Progress
            </button>
            <button
              onClick={() =>
                navigate(`/learn-course/${course._id}`, { state: course })
              }
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md w-full md:w-auto"
            >
              Start Learning
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowModules;

// import { useContext } from "react";
// import { AuthContext } from "../providers/AuthProvider";
// import { useLocation, useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";

// const ShowModules = () => {
//   const { user } = useContext(AuthContext);
//   const { state: course } = useLocation();
//   const navigate = useNavigate();

//   const handleProgress = () => {
//     const moduleInfo = {
//       userEmail: user.email,
//       courseId: course._id,
//       courseName: course.course_code,
//     };

//     fetch(`http://localhost:4000/progress`, {
//       method: "POST",
//       headers: {
//         "content-type": "application/json",
//       },
//       body: JSON.stringify(moduleInfo),
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         if (data.insertedId) {
//           Swal.fire(`${course.course_code} has been started for you`);
//         }
//       });
//   };
//   return (
//     <div>
//       {user.displayName}
//       {course._id}
//       <button onClick={handleProgress} className="btn">
//         Create Course
//       </button>

//       <button
//         className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md"
//         onClick={() =>
//           navigate(`/learn-course/${course._id}`, { state: course })
//         }
//       >
//         Start Course
//       </button>
//     </div>
//   );
// };

// export default ShowModules;
