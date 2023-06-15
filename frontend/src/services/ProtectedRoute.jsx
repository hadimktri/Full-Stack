import { Navigate } from "react-router-dom";

// if isAllowed is true, treats the compnent as a child, if not in case of request, refirects to login page
const ProtectedRoute = ({ isAllowed, redirectPath = "/login", children }) => {
  //replace --> replace the current screen with a new one
  return isAllowed ? children : <Navigate to={redirectPath} replace />;
};

export default ProtectedRoute;
