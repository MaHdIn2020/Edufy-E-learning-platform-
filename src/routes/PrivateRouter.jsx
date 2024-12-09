/* eslint-disable react/prop-types */
import { useContext } from "react";

import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import LoadingPage from "../pages/LoadingPage";

const PrivateRouter = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return <LoadingPage></LoadingPage>;
  }

  if (user && user.email) {
    return children;
  }

  return <Navigate state={location.pathname} to={"/auth/login"}></Navigate>;
};

export default PrivateRouter;
