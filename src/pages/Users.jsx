import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";

const Users = () => {
  const loadedUsers = useLoaderData();
  const [users, setUsers] = useState(loadedUsers);

  const handleUserDelete = (id) => {
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
        // delete user from the database
        fetch(`https://edufy-server.vercel.app/users/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount) {
              Swal.fire({
                title: "Deleted!",
                text: "User deleted successfully",
                icon: "success",
              });
              const remainingUsers = users.filter((user) => user._id !== id);
              setUsers(remainingUsers);
            }
          });
      }
    });
  };

  // Separate users based on their userType
  const students = users.filter((user) => user.userType === "Student");
  const instructors = users.filter((user) => user.userType === "Instructor");
  const admins = users.filter((user) => user.userType === "Admin");

  const renderTable = (title, userTypeUsers) => (
    <div className="mb-8">
      <h3 className="text-xl font-bold text-blue-600 mb-4">{title}</h3>
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2 border">#</th>
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Email</th>
              <th className="px-4 py-2 border">Image</th>
              <th className="px-4 py-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {userTypeUsers.length > 0 ? (
              userTypeUsers.map((user, index) => (
                <tr
                  key={user._id}
                  className={`hover:bg-gray-100 ${
                    index % 2 === 0 ? "bg-gray-50" : ""
                  }`}
                >
                  <td className="px-4 py-2 border text-center">{index + 1}</td>
                  <td className="px-4 py-2 border">{user.name}</td>
                  <td className="px-4 py-2 border">{user.email}</td>
                  <td className="px-4 py-2 border text-center">
                    <img
                      src={user.imageUrl}
                      alt={`${user.name}`}
                      className="w-12 h-12 rounded-full mx-auto"
                    />
                  </td>
                  <td className="px-4 py-2 border text-center">
                    <button
                      onClick={() => handleUserDelete(user._id)}
                      className="btn bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="px-4 py-4 border text-center text-gray-500"
                >
                  No {title.toLowerCase()} available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
        User Management Dashboard
      </h2>
      <div className="space-y-6">
        {renderTable("Students", students)}
        {renderTable("Instructors", instructors)}
        {renderTable("Admins", admins)}
      </div>
    </div>
  );
};

export default Users;
