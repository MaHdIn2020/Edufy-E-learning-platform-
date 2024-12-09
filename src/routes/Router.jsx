import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import ErrorPage from "../pages/ErrorPage";
import Home from "../components/Home";
import Instructors from "../pages/Instructors";
import Users from "../pages/Users";
import CourseDetails from "../pages/CourseDetails";
import AddCourse from "../pages/AddCourse";
import UpdateCourse from "../pages/UpdateCourse";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Login";
import Register from "../pages/Register";
import EnrolledCourses from "../pages/EnrolledCourses";
import LearnCourse from "../pages/LearnCourse";
import ShowModules from "../pages/ShowModules";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
        loader: () => fetch("http://localhost:4000/courses"),
      },
      {
        path: "/instructors",
        element: <Instructors></Instructors>,
      },
      {
        path: "/users",
        element: <Users></Users>,
        loader: () => fetch("http://localhost:4000/users"),
      },
      {
        path: "/addCourse",
        element: <AddCourse></AddCourse>,
      },
      {
        path: "updateCourse/:id",
        element: <UpdateCourse></UpdateCourse>,
        loader: ({ params }) =>
          fetch(`http://localhost:4000/courses/${params.id}`),
      },
      {
        path: "/courseDetails/:id",
        element: <CourseDetails></CourseDetails>,
        loader: ({ params }) =>
          fetch(`http://localhost:4000/courses/${params.id}`),
      },

      {
        path: "/enrolled-courses",
        element: <EnrolledCourses></EnrolledCourses>,
      },
      {
        path: "/showMoudules/:id",
        element: <ShowModules></ShowModules>,
      },
      {
        path: "/learn-course/:id",
        element: <LearnCourse></LearnCourse>,
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout></AuthLayout>,
    children: [
      {
        path: "/auth/login",
        element: <Login></Login>,
      },
      {
        path: "/auth/register",
        element: <Register></Register>,
      },
    ],
  },
]);

export default router;
