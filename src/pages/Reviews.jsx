import { useLoaderData } from "react-router-dom";
import { useContext, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../providers/AuthProvider";

const Reviews = () => {
  const { userType } = useContext(AuthContext);
  const [reviews, setReviews] = useState(useLoaderData());

  const handleDelete = (id) => {
    // const confirmed = window.confirm(
    //   "Are you sure you want to delete this review?"
    // );
    // if (confirmed) {
    //   setReviews(reviews.filter((review) => review._id !== id));
    //   // Add delete logic here, e.g., API call to remove the review from the backend
    // }

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
        fetch(`https://edufy-server.vercel.app/reviews/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount) {
              Swal.fire({
                title: "Deleted!",
                text: "The review has been deleted.",
                icon: "success",
              });

              const remainingReviews = reviews.filter(
                (review) => review._id !== id
              );
              setReviews(remainingReviews);
            }
          });
      }
    });
  };

  return (
    <div className="p-5">
      <h1 className="text-3xl font-bold text-center mb-8">User Reviews</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.map((review) => (
          <div
            key={review._id}
            className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow duration-300"
          >
            <img
              src={review.courseImageUrl}
              alt={review.courseName}
              className="w-full h-40 object-cover"
            />
            <div className="p-5 space-y-3">
              <h2 className="text-lg font-semibold text-gray-800">
                {review.courseName}
              </h2>
              <p className="text-sm text-gray-600">
                <strong>Course Code:</strong> {review.courseCode}
              </p>
              <p className="text-sm text-gray-600 bg-green-200 px-4 py-2 rounded-md inline-block">
                <strong>Rating:</strong> {review.rating}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Reviewed by:</strong> {review.userEmail}
              </p>

              <div className="text-sm text-gray-600 bg-yellow-100 px-4 py-2 rounded-md">
                <strong>Commnet:</strong> {review.comment}
              </div>

              {userType === "Admin" && (
                <button
                  onClick={() => handleDelete(review._id)}
                  className="mt-4 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors duration-200"
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reviews;
