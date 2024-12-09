import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";

const ShowModules = () => {
  const { user, setProgress } = useContext(AuthContext);
  const { state: course } = useLocation();
  const navigate = useNavigate();

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
        // setCompleted(data?.completedModules === 5);
      });
  };
  return (
    <div>
      {user.displayName}
      {course._id}
      <button onClick={handleProgress} className="btn">
        Create
      </button>

      <button
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md"
        onClick={() =>
          navigate(`/learn-course/${course._id}`, { state: course })
        }
      >
        Start Course
      </button>
    </div>
  );
};

export default ShowModules;
