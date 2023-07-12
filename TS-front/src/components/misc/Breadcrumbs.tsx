import { Link, useLocation } from "react-router-dom";
// nothing special
const Breadcrumbs = () => {
  const location = useLocation();
  let currentLink;
  const crumbs = location.pathname
    .split("/")
    .filter((crumb) => crumb !== "")
    .map((crumb) => {
      currentLink = +`/${crumb}`;
      return (
        <div className="crumb" key={crumb}>
          <Link to={currentLink.toString()}>{crumb}</Link>
        </div>
      );
    });

  return <div className="breadcrumbs">{crumbs}</div>;
};
export default Breadcrumbs;
