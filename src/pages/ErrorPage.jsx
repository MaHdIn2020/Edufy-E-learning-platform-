import { useNavigate } from "react-router-dom";
import errorImage from "../assets/error_image.avif";

const ErrorPage = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <img
        src={errorImage}
        alt="Error Illustration"
        className="max-w-xs md:max-w-md lg:max-w-lg mb-8"
      />
      <h2 className="text-5xl font-bold text-red-600 mb-4 text-center">
        Oops! Page Not Found
      </h2>
      <p className="text-lg text-gray-600 text-center mb-8">
        The page you are looking for might have been removed or is temporarily
        unavailable.
      </p>
      <button
        onClick={goBack}
        className="px-6 py-3 text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 transition duration-200"
      >
        Go Back
      </button>
    </div>
  );
};

export default ErrorPage;
