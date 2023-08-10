import { Navigate } from "react-router-dom";

interface Props {
  isAllowed: boolean;
  children: React.ReactNode;
}

const ProtectedRoute = ({ isAllowed, children }: Props) => {
  return isAllowed ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
