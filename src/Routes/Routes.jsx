import { createBrowserRouter } from "react-router";
import App from "../App";
import { Home } from "../Pages/Home/Home";
import { Portfolio } from "../Pages/Portfolio/Portfolio";
import { Details } from "../Pages/Details/Details";
import { About } from "../Pages/About/About";
import NotFoundPage from "../Pages/Error/NotFoundPage";
import Contact from "../Pages/ContactMe/Contact";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        index: true,
        path: "/",
        Component: Home,
      },
      {
        path: "/about",
        Component: About,
      },
      {
        path: "/portfolio",
        Component: Portfolio,
      },
      {
        path: "/portfolio-details/:projectId",
        Component: Details,
      },
      {
        path: "/contact",
        Component: Contact ,
      },
    ],
  },
  {
    path: "*",
    element : <NotFoundPage></NotFoundPage>
  }
]);
