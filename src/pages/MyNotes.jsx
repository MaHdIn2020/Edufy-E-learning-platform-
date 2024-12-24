/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";

const MyNotes = () => {
  const { user } = useContext(AuthContext);
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    fetch(`https://edufy-server.vercel.app/notes/${user.email}`)
      .then((res) => res.json())
      .then((data) => setNotes(data));
  }, [user]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">My Notes</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {notes.map((note) => (
          <NoteCard key={note._id} note={note} />
        ))}
      </div>
    </div>
  );
};

export default MyNotes;

const NoteCard = ({ note }) => {
  return (
    <div className="flex flex-col items-center rounded-lg shadow-md bg-white p-6">
      <div className="w-40 h-40 rounded-full overflow-hidden mb-4">
        <img
          src={note.courseImageUrl}
          alt={note.courseName}
          className="object-cover w-full h-full"
        />
      </div>
      <h3 className="text-xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500 mb-2">
        {note.courseName}
      </h3>
      <h4 className="text-gray-600 text-center mb-4">{note.courseCode}</h4>

      <div className="border px-6 py-4 rounded-lg">
        <h3 className="text-xl font-bold text-center">Notes: </h3>
        <p className="text-gray-700 text-center bg-green-100 px-4 p-2 rounded-lg">
          {note.notes}
        </p>
      </div>
    </div>
  );
};
