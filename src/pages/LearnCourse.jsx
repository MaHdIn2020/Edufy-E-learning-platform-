/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { useLocation } from "react-router-dom";
import Swal from "sweetalert2";

const LearnCourse = () => {
  const { user, progress, setProgress } = useContext(AuthContext);
  const { state: course } = useLocation();
  // const [progress, setProgress] = useState(null);
  const [progressValue, setProgressValue] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [review, setReview] = useState({ rating: 0, comment: "" });
  // const [completedModules, setCompletedModules] = useState(0);
  // console.log(user.email, course._id);

  useEffect(() => {
    fetch(
      `http://localhost:4000/progress?userEmail=${user.email}&courseId=${course._id}`
    )
      .then((res) => res.json())
      .then((data) => {
        setProgress(data);
        setCompleted(data?.completedModules === 5);
      });
  }, [user.email, course._id, progressValue]);

  const handleProgress = () => {
    const moduleInfo = {
      userEmail: user.email,
      courseId: course._id,
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
        setProgress(data);
        setCompleted(data?.completedModules === 5);
      });
  };

  console.log(progress);

  // const id = course._id;
  const handleCompleteModule = () => {
    // console.log(progress?.id);

    // fetch(`http://localhost:4000/progress/${progress._id}`, {
    //   method: "PATCH",
    // })
    fetch(`http://localhost:4000/progress/${progress.insertedId}`, {
      method: "PATCH",
    })
      .then((res) => res.json())
      .then((data) => {
        Swal.fire("Module Completed!", "", "success");
        // setProgress({
        //   ...progress,
        //   completedModules: progress.completedModules + 1,
        // });
        setProgressValue(progressValue + 1);
        setCompleted(progress.completedModules + 1 === 5);
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

  return (
    <div className="p-5">
      <h2 className="text-3xl font-bold">{course.course_name}</h2>
      <p>{course.details}</p>
      {/* <h3 className="text-xl mt-5">Progress: {progress?.completedModules}/5</h3> */}
      <h3 className="text-xl mt-5">Progress: {progressValue}/5</h3>

      <button onClick={handleProgress}>Create</button>

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
            onClick={() => Swal.fire("Certificate Generated!", "", "success")}
          >
            Collect Certificate
          </button>
        </div>
      )}

      <div className="mt-5">
        <h3 className="text-xl">Leave a Review</h3>
        <input
          type="number"
          placeholder="Rating (1-10)"
          value={review.rating}
          onChange={(e) => setReview({ ...review, rating: e.target.value })}
          className="border p-2 w-full mt-2"
        />
        <textarea
          placeholder="Write a review"
          value={review.comment}
          onChange={(e) => setReview({ ...review, comment: e.target.value })}
          className="border p-2 w-full mt-2"
        />
        <button
          className="mt-3 bg-yellow-500 text-white px-4 py-2 rounded-md"
          onClick={handleSubmitReview}
        >
          Submit Review
        </button>
      </div>
    </div>
  );
};

export default LearnCourse;
