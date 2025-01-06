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
import PrivateRouter from "./PrivateRouter";
import Reviews from "../pages/Reviews";
import TrendingCourses from "../pages/TrendingCourses";
import AllCourses from "../pages/AllCourses";
import Bookmarks from "../pages/Bookmarks";
import Announcement from "../pages/Announcement";
import ShowAnnouncement from "../pages/ShowAnnouncement";
import MyNotes from "../pages/MyNotes";
import Quizzes from "../pages/Quizzes";
import MyProfile from "../pages/MyProfile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
        loader: () => fetch("https://edufy-server.vercel.app/courses"),
      },
      {
        path: "/allCourses",
        element: <AllCourses></AllCourses>,
      },

      {
        path: "/instructors",
        element: <Instructors></Instructors>,
        loader: () => fetch("https://edufy-server.vercel.app/courses"),
      },
      {
        path: "/users",
        element: (
          <PrivateRouter>
            <Users></Users>
          </PrivateRouter>
        ),
        loader: () => fetch("https://edufy-server.vercel.app/users"),
      },
      {
        path: "/myNotes",
        element: (
          <PrivateRouter>
            <MyNotes></MyNotes>
          </PrivateRouter>
        ),
      },
      {
        path: "/addCourse",
        element: (
          <PrivateRouter>
            <AddCourse></AddCourse>
          </PrivateRouter>
        ),
      },
      {
        path: "updateCourse/:id",
        element: (
          <PrivateRouter>
            <UpdateCourse></UpdateCourse>
          </PrivateRouter>
        ),
        loader: ({ params }) =>
          fetch(`https://edufy-server.vercel.app/courses/${params.id}`),
      },
      {
        path: "/courseDetails/:id",
        element: <CourseDetails></CourseDetails>,
        loader: ({ params }) =>
          fetch(`https://edufy-server.vercel.app/courses/${params.id}`),
      },

      {
        path: "/enrolled-courses",
        element: (
          <PrivateRouter>
            <EnrolledCourses></EnrolledCourses>
          </PrivateRouter>
        ),
      },
      {
        path: "/showMoudules/:id",
        element: (
          <PrivateRouter>
            <ShowModules></ShowModules>
          </PrivateRouter>
        ),
      },
      {
        path: "/learn-course/:id",
        element: (
          <PrivateRouter>
            <LearnCourse></LearnCourse>,
          </PrivateRouter>
        ),
      },
      {
        path: "/reviews",
        element: (
          <PrivateRouter>
            <Reviews></Reviews>
          </PrivateRouter>
        ),
        loader: () => fetch(`https://edufy-server.vercel.app/reviews`),
      },
      {
        path: "/highRatedCourses",
        element: (
          <PrivateRouter>
            <TrendingCourses></TrendingCourses>
          </PrivateRouter>
        ),
        loader: () => fetch(`https://edufy-server.vercel.app/highRatedCourses`),
      },
      {
        path: "/bookmarks",
        element: (
          <PrivateRouter>
            <Bookmarks></Bookmarks>
          </PrivateRouter>
        ),
      },
      {
        path: "/announcement",
        element: (
          <PrivateRouter>
            <Announcement></Announcement>
          </PrivateRouter>
        ),
      },
      {
        path: "/showAnnouncement",
        element: (
          <PrivateRouter>
            <ShowAnnouncement></ShowAnnouncement>
          </PrivateRouter>
        ),
      },
      {
        path: "/quizzes",
        element: (
          <PrivateRouter>
            <Quizzes></Quizzes>
          </PrivateRouter>
        ),
      },
      {
        path: "/myProfile/",
        element: (
          <PrivateRouter>
            <MyProfile></MyProfile>
          </PrivateRouter>
        ),
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
