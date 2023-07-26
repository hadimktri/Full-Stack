import { useEffect } from "react";
import useBoundStore from "../../store/Store";
import jwtDecode from "jwt-decode";
import { setSession, getAccessToken } from "../../services/jwt.service";
import { IToken } from "../../types/types";


const Auth = ({ children }: { children: React.ReactNode }) => {
  const { loginWithToken, tokenLoading, logoutService } = useBoundStore(
    (state) => state
  );

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

   useEffect(() => {
    handleAuthentication();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div>{tokenLoading ? "Loading..." : children}</div>;
};

export default Auth;
