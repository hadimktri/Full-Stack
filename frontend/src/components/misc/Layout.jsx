import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Breadcrumbs from "./Breadcrumbs";

// main layout which has navbar and variable contnt placed with  <Outlet />
const navbarLinks = {
  links: [
    {
      link: "/",
      label: "Home",
    },
    {
      link: "posts",
      label: "Posts",
    },
    {
      link: "posts/create",
      label: "Create Post",
    },
  ],
};

// variable contant has been sent throgh the parent Route with the help of (element={<Layout />}) placed as <Outlet /> wraped in main tag
const Layout = () => (
  <div>
    <Navbar {...navbarLinks} />
    <Breadcrumbs />
    <main>
      <Outlet />
    </main>
  </div>
);

export default Layout;
