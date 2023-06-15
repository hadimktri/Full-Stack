import { useEffect } from "react";
import useBoundStore from "../../store/Store";
import jwtDecode from "jwt-decode";
import { setSession, getAccessToken } from "../../services/jwt.service";

// Auth wraps the children which is entire App.jsx to check if the token is healthy or not.
const Auth = ({ children }) => {
  const { loginWithToken, tokenLoading, logoutService } = useBoundStore(
    (state) => state
  );

  //checks first if token exist? then cheks if is valid and still have time
  const handleAuthentication = async () => {
    let token = getAccessToken();
    if (!token) {
      logoutService();
      return;
    }
    if (!isAuthTokenValid(token)) return;
    setSession(token);
    loginWithToken();
  };
  //now we need to check if token is expired! expired? logout and return false. not expired? return true
  const isAuthTokenValid = (token) => {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
      console.warn("access token expired");
      logoutService();
      return false;
    } else {
      return true;
    }
  };

  //in each render will run ( handleAuthentication();) above, checks if token is healthy
  useEffect(() => {
    handleAuthentication();
  }, []);

  //in this moment all codes above will wait for loading to get false to place the children which is one of routs of components
  return <div>{tokenLoading ? "Loading..." : children}</div>;
};

export default Auth;
