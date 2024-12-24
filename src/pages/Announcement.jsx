import { useContext, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../providers/AuthProvider";

const Announcement = () => {
  const { userType } = useContext(AuthContext); // Assuming userType indicates access to this form
  const [announcement, setAnnouncement] = useState({
    type: "Course Related",
    date: new Date().toISOString().split("T")[0], // Current date in YYYY-MM-DD format
    text: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAnnouncement({ ...announcement, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const announcementData = { ...announcement, userType };
    // console.log(announcementData);

    // Replace with your actual API endpoint
    fetch(`https://edufy-server.vercel.app/announcement`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(announcementData),
    })
      .then((res) => res.json())
      .then(() => {
        Swal.fire({
          title: "Success!",
          text: "Announcement posted successfully.",
          icon: "success",
          confirmButtonText: "OK",
        });
        // Reset form
        setAnnouncement({
          type: "Course Related",
          date: new Date().toISOString().split("T")[0],
          text: "",
        });
      })
      .catch((error) => {
        Swal.fire({
          title: "Error!",
          text: "There was an error posting the announcement.",
          icon: "error",
          confirmButtonText: "OK",
        });
        console.error("Error:", error);
      });
  };

  return (
    <div className="p-5 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold text-center mb-5">
        Post an Announcement
      </h2>
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={handleSubmit}
      >
        {/* Announcement Type */}
        <div className="mb-4">
          <label
            htmlFor="type"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Announcement Type
          </label>
          <select
            name="type"
            id="type"
            value={announcement.type}
            onChange={handleChange}
            className="block w-full border border-gray-300 rounded-md p-2"
          >
            <option value="Course Related">Course Related</option>
            <option value="Quiz Announcement">Quiz Announcement</option>
            <option value="Exam Announcement">Exam Announcement</option>
          </select>
        </div>

        {/* Announcement Date */}
        <div className="mb-4">
          <label
            htmlFor="date"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Announcement Date
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={announcement.date}
            readOnly
            className="block w-full border border-gray-300 rounded-md p-2 bg-gray-200 cursor-not-allowed"
          />
        </div>

        {/* Announcement Text */}
        <div className="mb-6">
          <label
            htmlFor="text"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Announcement
          </label>
          <textarea
            id="text"
            name="text"
            value={announcement.text}
            onChange={handleChange}
            placeholder="Write your announcement here..."
            rows="4"
            className="block w-full border border-gray-300 rounded-md p-2"
            required
          ></textarea>
        </div>

        {/* Submit Button */}
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Post Announcement
          </button>
        </div>
      </form>
    </div>
  );
};

export default Announcement;
