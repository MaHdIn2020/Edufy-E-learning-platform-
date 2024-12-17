import React, { useEffect, useState } from "react";

const Instructors = () => {
  const [instructors, setInstructors] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/instructors")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched Instructors:", data); // Debug: Check if data is fetched
        setInstructors(data);
      })
      .catch((error) => console.error("Error fetching instructors:", error));
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h1 style={{ textAlign: "center", marginBottom: "1rem" }}>Our Instructors</h1>
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "2rem" }}>
        {instructors.map((instructor) => (
          <div
            key={instructor._id}
            style={{
              width: "300px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
              borderRadius: "10px",
              overflow: "hidden",
              textAlign: "center",
              backgroundColor: "#fff",
            }}
          >
            <img
              src={instructor.imageUrl}
              alt={instructor.name}
              style={{ width: "100%", height: "200px", objectFit: "cover" }}
            />
            <div style={{ padding: "1rem" }}>
              <h2 style={{ margin: "0.5rem 0", fontSize: "1.5rem", color: "#333" }}>
                {instructor.name}
              </h2>
              <p style={{ margin: "0.5rem 0", color: "#555" }}>
                <strong>Qualifications:</strong> {instructor.qualifications}
              </p>
              <p style={{ margin: "0.5rem 0", color: "#555" }}>
                <strong>Institution:</strong> {instructor.institution}
              </p>
              <p style={{ margin: "0.5rem 0", color: "#777" }}>{instructor.details}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Instructors;
