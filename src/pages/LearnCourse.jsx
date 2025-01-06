/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { toPng } from "html-to-image"; // For downloading the certificate as an image
import Progressbar from "../components/Progressbar";

const videoLinks = {
  CSE: [
    "https://www.youtube.com/embed/4vU4aEFmTSo?si=95mu2BBA--hhY_LQ",
    "https://www.youtube.com/embed/fkIvmfqX-t0?si=icYEU2GCosoIWeRb",
    "https://www.youtube.com/embed/v_RVTA6D4aI?si=my5KQzpMQKiNfpZm",
    "https://www.youtube.com/embed/MNTvxGCEvQs?si=UjnKCpdL8W5UvXyi",
    "https://www.youtube.com/embed/HAathu8U1xc?si=kjDFl-nfSII5gPud",
  ],
  ECE: [
    "https://www.youtube.com/embed/nDDPLi7f1Xw?si=zcIdPjNA6fdiMTnf",
    "https://www.youtube.com/embed/XKzzGI7qiQc?si=Jy_phvgPQVXHeh5l",
    "https://www.youtube.com/embed/5YHVGO26OZc?si=qHUZ5oyFIBCyJBfp",
    "https://www.youtube.com/embed/hl9KTPIAK9M?si=v-U1_5_m9ZP94G60",
    "https://www.youtube.com/embed/NB64WlEgc08?si=MLhwPWhs189BDfhx",
  ],
  // Add other course codes with iframe links here...
  PHA: [
    "https://www.youtube.com/embed/LBkRKCsumJI?si=FkGv1UXQYiSjyAky",
    "https://www.youtube.com/embed/yP-t--fnBuI?si=MINZLeuLSX3HUYEs",
    "https://www.youtube.com/embed/bXE3tWjKfdM?si=whnfAm6uyxGwe0Eh",
    "https://www.youtube.com/embed/HwHccigi_e4?si=YAXJOTtIZCy5wb_n",
    "https://www.youtube.com/embed/54-DzxeQzdo?si=Zpdo7YLyPc96oaLa",
  ],
  PSY: [
    "https://www.youtube.com/embed/vo4pMVb0R6M?si=jJtHwAHD_8BMR9Ru",
    "https://www.youtube.com/embed/hFV71QPvX2I?si=wTgYOGYaPfTjJaBz",
    "https://www.youtube.com/embed/jReX7qKU2yc?si=VSp5KsbkzG0RQg8E",
    "https://www.youtube.com/embed/R-sVnmmw6WY?si=BaaBf-ijCpB9PmIw",
    "https://www.youtube.com/embed/HVWbrNls-Kw?si=m2RUHvzavE1xYGXH",
  ],
  BBA: [
    "https://www.youtube.com/embed/fedqjIux1eQ?si=GlObto9nkMkHseDF",
    "https://www.youtube.com/embed/zxa19wITJO0?si=kwYaGBjb_HsX2zJj",
    "https://www.youtube.com/embed/RStCN-HL1kM?si=uJHepFrQDq54ICTp",
    "https://www.youtube.com/embed/JJlKNm8ddws?si=69FrKTD6zeuGXAtU",
    "https://www.youtube.com/embed/1S-v8DYwcIo?si=zJHWoxSPnxo_jBrX",
  ],
  EEE: [
    "https://www.youtube.com/embed/Vd2UJiIPbag?si=ugudZohLydMv-3FY",
    "https://www.youtube.com/embed/Vd2UJiIPbag?si=1J7dSoaZ2Nup61yC",
    "https://www.youtube.com/embed/LdMXFW3d_Mw?si=7fnrcou8-2UgAGBb",
    "https://www.youtube.com/embed/MJl_eQHNf-A?si=moK7X_mRzhgZq4If",
    "https://www.youtube.com/embed/UsLbB5k9iuY?si=gtt7xoYIW-M6S5yW",
  ],
  MTH: [
    "https://www.youtube.com/embed/aS6R3epK3ms?si=07KcnwYKQxWPEmwx",
    "https://www.youtube.com/embed/aS6R3epK3ms?si=JG7xEe47fvvTdiZF",
    "https://www.youtube.com/embed/nYM0gaPU-8g?si=M_1hGm4b_lylpsL_",
    "https://www.youtube.com/embed/g6mM570_u70?si=Fx3eTU57NNswV9zJ",
    "https://www.youtube.com/embed/3uwPxQY2CQA?si=H0-_2pam6Cn2LE2K",
  ],
  PHY: [
    "https://www.youtube.com/embed/2Eqe7jPv-Bw?si=WsQAy0YN-tWpNe4j",
    "https://www.youtube.com/embed/xXJmG3krGVU?si=bsRu7nHnyoUd3DKS",
    "https://www.youtube.com/embed/xXJmG3krGVU?si=nGP0nGyatOQZ7IZi",
    "https://www.youtube.com/embed/O2z2y7iB26E?si=4N2jjBweJ8DOCQSb",
    "https://www.youtube.com/embed/z3L8TtBsJC4?si=he6mEkqbf0zDsOvK",
  ],

  HIS: [
    "https://www.youtube.com/embed/r_w7pfulsn8?si=OXs2coSc-eMZpXur",
    "https://www.youtube.com/embed/zRqYx25iPeg?si=Jnp-XUERcmCmjByR",
    "https://www.youtube.com/embed/4TmkBtOkoIA?si=ntHuTBJrXxkJqs11",
    "https://www.youtube.com/embed/4txRaoObqjM?si=D0hBNGn6GoS5xa2M",
    "https://www.youtube.com/embed/0Xm--1qW7K4?si=t3WTFzROyZ26xNMY",
  ],
  ENG: [
    "https://www.youtube.com/embed/LF_mFeBSuTY?si=kgaT_w-9SlF9VHuy",
    "https://www.youtube.com/embed/nyiobtAxSv4?si=2Ahg7D3VWbawi_Y1",
    "https://www.youtube.com/embed/nyiobtAxSv4?si=e-PbNOBHGn1Q-IJc",
    "https://www.youtube.com/embed/oVA9iYQ1IX0?si=6yVs5bhiWH8P3cHY",
    "https://www.youtube.com/embed/68NUGTGw8XU?si=galKbXMS_GphQ6FK",
  ],
};

const LearnCourse = () => {
  const { user } = useContext(AuthContext);
  const { state: course } = useLocation();
  const [progress, setProgress] = useState(null);
  const [completed, setCompleted] = useState(false);
  const [review, setReview] = useState({ rating: 0, comment: "" });
  const [showCertificate, setShowCertificate] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [notes, setNotes] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch(
      `https://edufy-server.vercel.app/progress?userEmail=${user.email}&courseId=${course._id}`
    )
      .then((res) => res.json())
      .then((data) => {
        setProgress(data);
        setCompleted(data?.completedModules === 5);
      });
  }, [user.email, course._id]);

  const handleCompleteModule = () => {
    fetch(`https://edufy-server.vercel.app/progress/${progress._id}`, {
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
    fetch("https://edufy-server.vercel.app/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...review,
        courseId: course._id,
        userEmail: user.email,
        courseName: course.course_name,
        courseCode: course.course_code,
        courseImageUrl: course.imageUrl,
      }),
    }).then(() => {
      Swal.fire("Review Submitted!", "", "success");
    });
    setReview({ rating: 0, comment: "" });
    navigate("/reviews");
    // console.log(review);
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

  const handleNext = () => {
    setCurrentSlide((prev) =>
      prev + 1 < videoLinks[course.course_code].length ? prev + 1 : prev
    );
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const handleSubmitNotes = () => {
    fetch("https://edufy-server.vercel.app/notes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        notes,
        courseId: course._id,
        userEmail: user.email,
        courseName: course.course_name,
        courseCode: course.course_code,
        courseImageUrl: course.imageUrl,
      }),
    }).then(() => {
      Swal.fire("Note Submitted!", "", "success");
    });
    setNotes("");
    navigate("/myNotes");
  };

  return (
    <div className="p-5 space-y-8">
      <h2 className="text-3xl font-bold">{course.course_name}</h2>
      <p>{course.details}</p>

      <div className="text-center">
        <Progressbar progress={progress}></Progressbar>
      </div>

      {progress ? (
        <h3 className="text-xl mt-5">
          Progress: {progress?.completedModules}/5
        </h3>
      ) : (
        <h1 className="text-red-500 font-bold text-5xl">
          Please start the course first
        </h1>
      )}

      {/* ------------------------------------------------------------ */}
      {/* Carousel Section */}
      <div className="relative w-full max-w-3xl mx-auto space-y-4">
        <iframe
          className="w-full h-96 rounded-md shadow-lg"
          src={videoLinks[course.course_code]?.[currentSlide]}
          title={`Module ${currentSlide + 1}`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
        <div className="flex justify-between mt-4">
          <button
            className={`btn ${
              currentSlide === 0 ? "btn-disabled" : "btn-primary"
            }`}
            onClick={handlePrev}
            disabled={currentSlide === 0}
          >
            ❮ Previous Module
          </button>
          <button
            className={`btn ${
              currentSlide === videoLinks[course.course_code]?.length - 1
                ? "btn-disabled"
                : "btn-primary"
            }`}
            onClick={handleNext}
            disabled={
              currentSlide === videoLinks[course.course_code]?.length - 1
            }
          >
            Next Module ❯
          </button>
        </div>
      </div>
      {/* ------------------------------------------------------------ */}

      {/* -----------------quizzes section starts-------------------- */}

      {progress && (
        <div className="text-center">
          <button
            onClick={() => navigate("/quizzes", { state: course.course_code })}
            className="btn btn-secondary"
          >
            Take Quizzes
          </button>
        </div>
      )}

      {/* -----------------quizzes section ends-------------------- */}

      {/* --------------------Taking notes start------------------- */}

      {progress && (
        <div className="mt-5">
          <h3 className="text-xl font-bold mb-2">Take Notes</h3>
          <div className="flex flex-col space-y-2 items-center">
            <textarea
              placeholder="Write your notes here"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="border p-2 w-full rounded-md"
            />
            <button
              className="bg-green-500 text-white px-4 py-2 rounded-md"
              onClick={handleSubmitNotes}
            >
              Save notes
            </button>
          </div>
        </div>
      )}

      {/* --------------------Taking notes end------------------ */}

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
      {completed && (
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
              onChange={(e) =>
                setReview({ ...review, comment: e.target.value })
              }
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
      )}
    </div>
  );
};

export default LearnCourse;
