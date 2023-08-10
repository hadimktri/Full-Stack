import { createContext, useState } from "react";
import Login from "../../components/Auth/Login";
import OTPInput from "../../components/Auth/OTPInput";
import Recovered from "../../components/Auth/Recovered";
import PasswordReset from "../../components/Auth/PasswordReset";
import { IRecoveryContext } from "../../types/types";

export const RecoveryContext = createContext<IRecoveryContext | null>(null);

function LoginPage() {
  const [page, setPage] = useState("login");
  const [email, setEmail] = useState("");

  function NavigateComponents() {
    if (page === "login") return <Login />;
    if (page === "otp") return <OTPInput />;
    if (page === "reset") return <PasswordReset />;
    return <Recovered />;
  }

  return (
    <RecoveryContext.Provider value={{ page, setPage, setEmail, email }}>
      <NavigateComponents />
    </RecoveryContext.Provider>
  );
}

export default LoginPage;
