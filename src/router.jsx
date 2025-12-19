import { createBrowserRouter } from "react-router-dom";
import App from "./App"; // الهوم الحالي (SplashIntro + Home)
import RootLayout from "./layouts/RootLayout";
import About from "./pages/About";
import Articles from "./pages/Articles";
import Books from "./pages/Books";
import Consult from "./pages/Consult";
import Contact from "./pages/Contact";
import CourseRecordedDetail from "./pages/CourseRecordedDetail";
import CoursesRecorded from "./pages/CoursesRecorded";
import Join from "./pages/Join";
import Login from "./pages/Login";
import Privacy from "./pages/Privacy";
import Profile from "./pages/Profile";
import Terms from "./pages/Terms";
import Tools from "./pages/Tools";

import CourseOnlineDetaile from "./pages/CourseOnlineDetaile";
import CoursesOnline from "./pages/CoursesOnline";
// داخل ملف التوجيه لديك:
import BookDetail from "./pages/BookDetail";

import ArticleDetail from "./pages/ArticleDetail";
// ...



export const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        children: [
            { index: true, element: <App /> },                // الصفحة الرئيسية
            { path: "/courses/online", element: <CoursesOnline /> }, // الدورات الحضورية
            { path: "/courses/online/:slug", element: <CourseOnlineDetaile /> },
            { path: "/courses/recorded", element: <CoursesRecorded /> },
            { path: "/courses/recorded/:slug", element: <CourseRecordedDetail /> },

            { path: "/products/books", element: <Books /> },
            { path: "/products/tools", element: <Tools /> },

            { path: "/articles", element: <Articles /> },
            { path: "/articles/:slug", element: <ArticleDetail /> },
            { path: "/about", element: <About /> },

            { path: "/consult", element: <Consult /> },
            { path: "/join", element: <Join /> },
            { path: "/contact", element: <Contact /> },

            { path: "/privacy", element: <Privacy /> },
            { path: "/terms", element: <Terms /> },
            { path: "/login", element: <Login /> },
            { path: "/profile", element: <Profile /> },

            { path: "/products/books/:id", element: <BookDetail /> },
        ],
    },
]);
