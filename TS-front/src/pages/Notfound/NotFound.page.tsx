import { Link, useRouteError } from "react-router-dom";

const NotFound = () => {
  // use (errorElement={<NotFound />}) in parent router and use (useRouteError()) to get the thrown error generated in fetching data in NotFound page
  // this also will load the NotFound page in the wrong Url entry
  const error = useRouteError() as Error;
  return (
    <div>
      <h1>Page not found</h1>
      {error && <p>{error.message}</p>}
      <p className="backToHome">
        Go To The <Link to="/">Home Page</Link>
      </p>
    </div>
  );
};

export default NotFound;
