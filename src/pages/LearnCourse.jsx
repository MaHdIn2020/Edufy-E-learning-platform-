/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import { toPng } from "html-to-image"; // For downloading the certificate as an image

const videoLinks = {
  CSE: [
    "https://www.youtube.com/embed/4vU4aEFmTSo?si=95mu2BBA--hhY_LQ",
    "https://www.youtube.com/embed/1YzAz3gB1fM",
    "https://www.youtube.com/embed/LXb3EKWsInQ",
    "https://www.youtube.com/embed/ktlQrO2Sifg",
    "https://www.youtube.com/embed/tgbNymZ7vqY",
  ],
  EEE: [
    "https://www.youtube.com/embed/K4TOrB7at0Y",
    "https://www.youtube.com/embed/W6NZfCO5SIk",
    "https://www.youtube.com/embed/vLnPwxZdW4Y",
    "https://www.youtube.com/embed/bMknfKXIFA8",
    "https://www.youtube.com/embed/Ke90Tje7VS0",
  ],
  // Add other course codes with iframe links here...
};

const LearnCourse = () => {
  const { user } = useContext(AuthContext);
  const { state: course } = useLocation();
  const [progress, setProgress] = useState(null);
  const [completed, setCompleted] = useState(false);
  const [review, setReview] = useState({ rating: 0, comment: "" });
  const [showCertificate, setShowCertificate] = useState(false);

  useEffect(() => {
    fetch(
      `http://localhost:4000/progress?userEmail=${user.email}&courseId=${course._id}`
    )
      .then((res) => res.json())
      .then((data) => {
        setProgress(data);
        setCompleted(data?.completedModules === 5);
      });
  }, [user.email, course._id]);

  const handleCompleteModule = () => {
    fetch(`http://localhost:4000/progress/${progress._id}`, {
      method: "PATCH",
    })
      .then((res) => res.json())
      .then(() => {
        Swal.fire("Module Completed!", "", "success");
        const updatedModules = progress.completedModules + 1;
        setProgress({ ...progress, completedModules: updatedModules });
        setCompleted(updatedModules === 5);
      });
  };

  const handleSubmitReview = () => {
    fetch("http://localhost:4000/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...review,
        courseId: course._id,
        userEmail: user.email,
      }),
    }).then(() => {
      Swal.fire("Review Submitted!", "", "success");
    });
  };

  const downloadCertificate = () => {
    const certificateElement = document.getElementById("certificate");
    toPng(certificateElement).then((dataUrl) => {
      const link = document.createElement("a");
      link.download = `${course.course_name}-certificate.png`;
      link.href = dataUrl;
      link.click();
    });
  };

  return (
    <div className="p-5 space-y-8">
      <h2 className="text-3xl font-bold">{course.course_name}</h2>
      <p>{course.details}</p>
      {progress ? (
        <h3 className="text-xl mt-5">
          Progress: {progress?.completedModules}/5
        </h3>
      ) : (
        <h1 className="text-red-500 font-bold text-5xl">
          Please start the course first
        </h1>
      )}

      {/* Carousel Section */}
      <div className="carousel w-full max-w-3xl mx-auto space-y-4">
        {videoLinks[course.course_code]?.map((video, index) => (
          <div
            key={index}
            id={`slide${index}`}
            className="carousel-item relative w-full"
          >
            <iframe
              className="w-full h-96"
              src={video}
              title={`Module ${index + 1}`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
              <a
                href={`#slide${index === 0 ? 4 : index - 1}`}
                className="btn btn-circle"
              >
                ❮
              </a>
              <a
                href={`#slide${index === 4 ? 0 : index + 1}`}
                className="btn btn-circle"
              >
                ❯
              </a>
            </div>
          </div>
        ))}
      </div>

      {!completed ? (
        <button
          className="mt-3 bg-green-600 text-white px-4 py-2 rounded-md"
          onClick={handleCompleteModule}
        >
          Complete Module {progress?.completedModules + 1}
        </button>
      ) : (
        <div>
          <button
            className="mt-3 bg-blue-600 text-white px-4 py-2 rounded-md"
            onClick={() => setShowCertificate(true)}
          >
            Collect Certificate
          </button>
        </div>
      )}

      {/* Certificate Section */}
      {showCertificate && (
        <div
          id="certificate"
          className="mt-5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white p-10 rounded-md text-center relative"
        >
          <div className="flex items-center justify-center space-x-4 mb-5">
            <img
              src={user.photoURL}
              alt="User"
              className="w-20 h-20 rounded-full border-4 border-white"
            />
            <img
              src={course.imageUrl}
              alt="Course"
              className="w-20 h-20 rounded-full border-4 border-white"
            />
          </div>
          <h3 className="text-3xl font-bold">Certificate of Completion</h3>
          <p className="mt-3 text-xl">
            This is to certify that{" "}
            <span className="text-yellow-300 font-bold">
              {user.displayName}
            </span>{" "}
            has successfully completed the course{" "}
            <span className="text-yellow-300 font-bold">
              {course.course_name}
            </span>
            .
          </p>
          <button
            onClick={downloadCertificate}
            className="mt-5 bg-white text-purple-700 px-4 py-2 rounded-md font-bold hover:bg-gray-200"
          >
            Download Certificate
          </button>
        </div>
      )}

      {/* Review Section */}
      <div className="mt-5">
        <h3 className="text-xl font-bold mb-2">Leave a Review</h3>
        <div className="flex flex-col space-y-2">
          <input
            type="number"
            placeholder="Rating (1-10)"
            value={review.rating}
            onChange={(e) => setReview({ ...review, rating: e.target.value })}
            className="border p-2 w-full rounded-md"
          />
          <textarea
            placeholder="Write a review"
            value={review.comment}
            onChange={(e) => setReview({ ...review, comment: e.target.value })}
            className="border p-2 w-full rounded-md"
          />
          <button
            className="bg-yellow-500 text-white px-4 py-2 rounded-md"
            onClick={handleSubmitReview}
          >
            Submit Review
          </button>
        </div>
      </div>
    </div>
  );
};

export default LearnCourse;

// /* eslint-disable no-unused-vars */
// import { useContext, useEffect, useState } from "react";
// import { AuthContext } from "../providers/AuthProvider";
// import { useLocation } from "react-router-dom";
// import Swal from "sweetalert2";

// const LearnCourse = () => {
//   const { user } = useContext(AuthContext);
//   const { state: course } = useLocation();
//   const [progress, setProgress] = useState(null);
//   const [completed, setCompleted] = useState(false);
//   const [review, setReview] = useState({ rating: 0, comment: "" });

//   useEffect(() => {
//     fetch(
//       `http://localhost:4000/progress?userEmail=${user.email}&courseId=${course._id}`
//     )
//       .then((res) => res.json())
//       .then((data) => {
//         setProgress(data);
//         setCompleted(data?.completedModules === 5);
//       });
//   }, [user.email, course._id, setProgress]);

//   const handleCompleteModule = () => {
//     fetch(`http://localhost:4000/progress/${progress._id}`, {
//       method: "PATCH",
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         Swal.fire("Module Completed!", "", "success");
//         setProgress({
//           ...progress,
//           completedModules: progress.completedModules + 1,
//         });
//         setCompleted(progress.completedModules + 1 === 5);
//       });
//   };

//   const handleSubmitReview = () => {
//     fetch("http://localhost:4000/reviews", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         ...review,
//         courseId: course._id,
//         userEmail: user.email,
//       }),
//     }).then(() => {
//       Swal.fire("Review Submitted!", "", "success");
//     });
//   };

//   return (
//     <div className="p-5">
//       <h2 className="text-3xl font-bold">{course.course_name}</h2>
//       <p>{course.details}</p>
//       {progress ? (
//         <h3 className="text-xl mt-5">
//           Progress: {progress?.completedModules}/5
//         </h3>
//       ) : (
//         <h1 className="text-red-500 font-bold text-5xl">
//           Please start the course first
//         </h1>
//       )}

//       {!completed ? (
//         <button
//           className="mt-3 bg-green-600 text-white px-4 py-2 rounded-md"
//           onClick={handleCompleteModule}
//         >
//           Complete Module {progress?.completedModules}
//         </button>
//       ) : (
//         <div>
//           <button
//             className="mt-3 bg-blue-600 text-white px-4 py-2 rounded-md"
//             onClick={() => Swal.fire("Certificate Generated!", "", "success")}
//           >
//             Collect Certificate
//           </button>
//         </div>
//       )}

//       <div className="mt-5">
//         <h3 className="text-xl">Leave a Review</h3>
//         <input
//           type="number"
//           placeholder="Rating (1-10)"
//           value={review.rating}
//           onChange={(e) => setReview({ ...review, rating: e.target.value })}
//           className="border p-2 w-full mt-2"
//         />
//         <textarea
//           placeholder="Write a review"
//           value={review.comment}
//           onChange={(e) => setReview({ ...review, comment: e.target.value })}
//           className="border p-2 w-full mt-2"
//         />
//         <button
//           className="mt-3 bg-yellow-500 text-white px-4 py-2 rounded-md"
//           onClick={handleSubmitReview}
//         >
//           Submit Review
//         </button>
//       </div>
//     </div>
//   );
// };

// export default LearnCourse;
