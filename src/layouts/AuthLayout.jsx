import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const AuthLayout = () => {
  return (
    <div className="container mx-auto">
      <nav>
        <Navbar></Navbar>
      </nav>
      <Outlet></Outlet>
    </div>
  );
};

export default AuthLayout;
