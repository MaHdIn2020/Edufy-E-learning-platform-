import { Link, NavLink } from "react-router-dom";
import "../styles/style.css";

const Navbar = () => {
  const links = (
    <div className="lg:flex gap-2 space-y-1 lg:space-y-0">
      <li>
        <NavLink to={"/"}>Home</NavLink>
      </li>
      <li>
        <NavLink to={"/instructors"}>Instructors</NavLink>
      </li>
      <li>
        <NavLink to={"/users"}>Users</NavLink>
      </li>
      <li>
        <NavLink to={"/addCourse"}>Add Course</NavLink>
      </li>
    </div>
  );
  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>
        <Link to={"/"} className="btn btn-ghost text-xl">
          Edufy
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>
      <div className="navbar-end">
        <div className="flex items-center gap-3">
          <Link to={"/auth/login"}>
            <button className="btn">Login</button>
          </Link>
          <Link to={"/auth/register"}>
            <button className="btn">Register</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
