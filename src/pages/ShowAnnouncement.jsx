// import { useLoaderData } from "react-router-dom";
import { useState, useEffect } from "react";

const ShowAnnouncement = () => {
  const [loading, setLoading] = useState(true);
  const [allAnnouncements, setAllAnnouncements] = useState([]);

  useEffect(() => {
    // Simulate loading data
    const fetchData = async () => {
      try {
        await fetch(`https://edufy-server.vercel.app/announcement`)
          .then((res) => res.json())
          .then((data) => setAllAnnouncements(data));
      } catch (error) {
        console.error("Error loading announcements:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <p className="text-center text-lg font-semibold">Loading...</p>;
  }

  if (allAnnouncements.length === 0) {
    return (
      <p className="text-center text-lg font-semibold">
        No announcements found.
      </p>
    );
  }

  // Separate announcements by userType
  const adminAnnouncements = allAnnouncements.filter(
    (announcement) => announcement.userType === "Admin"
  );
  const instructorAnnouncements = allAnnouncements.filter(
    (announcement) => announcement.userType === "Instructor"
  );

  // Render announcements by type
  const renderAnnouncementsByType = (announcements) => {
    const types = ["Course Related", "Quiz Announcement", "Exam Announcement"];
    return types.map((type) => (
      <div key={type} className="p-4 bg-white shadow-md rounded-md">
        <h3 className="text-xl font-semibold text-center mb-4">{type}</h3>
        {announcements.filter((a) => a.type === type).length === 0 ? (
          <p className="text-gray-500 text-center">No {type} announcements.</p>
        ) : (
          announcements
            .filter((a) => a.type === type)
            .map((announcement) => (
              <div
                key={announcement._id}
                className="border border-gray-300 rounded-md p-3 mb-3"
              >
                <p className="font-bold">{announcement.text}</p>
                <p className="text-sm text-gray-500">
                  Date: {announcement.date}
                </p>
              </div>
            ))
        )}
      </div>
    ));
  };

  return (
    <div className="p-5 max-w-6xl mx-auto space-y-10">
      {/* Admin Announcements */}
      <div>
        <h2 className="text-2xl font-bold mb-5 text-center">
          Admin Announcements
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {renderAnnouncementsByType(adminAnnouncements)}
        </div>
      </div>

      {/* Instructor Announcements */}
      <div>
        <h2 className="text-2xl font-bold mb-5 text-center">
          Instructor Announcements
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {renderAnnouncementsByType(instructorAnnouncements)}
        </div>
      </div>
    </div>
  );
};

export default ShowAnnouncement;
