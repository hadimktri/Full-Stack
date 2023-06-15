import { RouterProvider } from "react-router-dom";
import ProviderLayout from "./ProviderLayout";
import { Router } from "./router";
import "./App.css";

function App() {
  const router = Router();
  return (
    // <ProviderLayout> wrps entire App or Routs as a child to provide  <MantineProvider> and <ColorSchemeProvider>
    // instead of (<BrowserRouter>) component we make router constant in the (router.jsx) and define it here to pass it in RouterProvider (1)

    <ProviderLayout>
      <RouterProvider router={router} /> {/* (1) */}
    </ProviderLayout>
  );
}
export default App;
