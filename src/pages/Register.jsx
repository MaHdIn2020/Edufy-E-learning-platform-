import { useContext, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import Swal from "sweetalert2";

const Register = () => {
  const { createUser } = useContext(AuthContext);
  const [userData, setUserData] = useState({
    name: "",
    imageUrl: "",
    email: "",
    password: "",
    userType: "Student",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    createUser(userData.email, userData.password)
      // eslint-disable-next-line no-unused-vars
      .then((result) => {
        // console.log("Firebase User Created:", result.user);

        // Prepare user data without the password
        // eslint-disable-next-line no-unused-vars
        const { password, ...userWithoutPassword } = userData;

        // Save the user to the database
        fetch("https://edufy-server.vercel.app/users", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(userWithoutPassword),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.insertedId) {
              Swal.fire({
                title: "Registration Successful!",
                text: "Your account has been created successfully.",
                icon: "success",
                confirmButtonText: "OK",
              });

              // Reset form fields
              setUserData({
                name: "",
                imageUrl: "",
                email: "",
                password: "",
                userType: "Student",
              });
            }
          })
          .catch((error) => console.error("Error registering user:", error));
      })
      .catch((err) => {
        console.error("Registration failed: ", err);
        Swal.fire({
          title: "Error!",
          text: "Registration failed. Please try again.",
          icon: "error",
          confirmButtonText: "OK",
        });
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Register
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={userData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your name"
              required
            />
          </div>
          {/* Image URL */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Image URL
            </label>
            <input
              type="url"
              name="imageUrl"
              value={userData.imageUrl}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your image URL"
              required
            />
          </div>
          {/* Email */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={userData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              required
            />
          </div>
          {/* Password */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={userData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              required
            />
          </div>
          {/* Type of User */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Type of User
            </label>
            <select
              name="userType"
              value={userData.userType}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="Admin">Admin</option>
              <option value="Instructor">Instructor</option>
              <option value="Student">Student</option>
            </select>
          </div>
          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;

// const Register = () => {
//   return <div>register</div>;
// };

// export default Register;
