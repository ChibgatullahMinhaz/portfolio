import { createBrowserRouter } from "react-router";
import App from "../App";
import { Home } from "../Pages/Home/Home";
import { Portfolio } from "../Pages/Portfolio/Portfolio";
import { Details } from "../Pages/Details/Details";
import { Contact } from "../Pages/ContactMe/Contact";
import { About } from "../Pages/About/About";

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
        path: "/contact-me",
        Component: Contact,
      },
    ],
  },
]);
