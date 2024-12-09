/* eslint-disable react/prop-types */
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase.init";
import toast from "react-hot-toast";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userType, setUserType] = useState(null);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(null);

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const updateUserProfile = (updatedData) => {
    return updateProfile(auth.currentUser, updatedData);
  };

  const logOutUser = () => {
    setLoading(true);
    toast.success("User logged out successfully");
    return signOut(auth);
  };

  const userInfo = {
    user,
    setUser,
    loading,
    setLoading,
    createUser,
    signInUser,
    logOutUser,
    updateUserProfile,
    userType,
    setUserType,
    progress,
    setProgress,
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      // console.log("object is now unsubscribed");

      if (currentUser?.email) {
        fetch(`http://localhost:4000/userType?email=${currentUser.email}`)
          .then((res) => res.json())
          .then((data) => {
            // console.log("User Type:", data);
            // toast.info(`Welcome, ${data.userType}!`); // Display the userType
            // setUserType(data.userType);
            setUserType(data[0].userType);
          })
          .catch((err) => {
            console.error("Error fetching user type:", err.message);
            // toast.error(err.message); // Display specific error message
          });
      } else {
        setUserType(null);
      }
    });
    return () => unsubscribe();
  }, []);
  return (
    <AuthContext.Provider value={userInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
