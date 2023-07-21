import { Navigate } from "react-router-dom";

interface Props {
  isAllowed: boolean;
  children: React.ReactNode;
}
// if isAllowed is true, treats the compnent as a child, if not in case of request, refirects to login page
const ProtectedRoute = ({ isAllowed, children }: Props) => {
  //replace --> replace the current screen with a new one
  return isAllowed ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
