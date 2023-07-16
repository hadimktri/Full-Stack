import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import Auth from "./components/Auth/Auth";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Auth>
    <App />
  </Auth>
);
