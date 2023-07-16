import { useEffect } from "react";
import useBoundStore from "../../store/Store";
import jwtDecode from "jwt-decode";
import { setSession, getAccessToken } from "../../services/jwt.service";
import { IToken } from "../../types/types";

// Auth wraps the children which is entire App.tsx to check if the token is healthy or not.
const Auth = ({ children }: { children: React.ReactNode }) => {
  const { loginWithToken, tokenLoading, logoutService } = useBoundStore(
    (state) => state
  );

  //checks first if token exist? then cheks if is valid and still have time
  const handleAuthentication = () => {
    const query = new URLSearchParams(window.location.search);
    const token = getAccessToken() || query.get("token");
    if (!token) {
      logoutService();
      return;
    }
    if (!isAuthTokenValid(token)) return;
    setSession(token);
    loginWithToken();
  };
  //now we need to check if token is expired! expired? logout and return false. not expired? return true
  const isAuthTokenValid = (token: string) => {
    const decoded: IToken = jwtDecode(token);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //in this moment all codes above will wait for loading to get false to place the children which is one of routs of components
  return <div>{tokenLoading ? "Loading..." : children}</div>;
};

export default Auth;
