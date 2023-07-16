import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Breadcrumbs from "./Breadcrumbs";

const Layout = () => (
  <div>
    <Navbar />
    <Breadcrumbs />
    <main>
      <Outlet />
    </main>
  </div>
);

export default Layout;
