import { RouterProvider } from "react-router-dom";
import StyleProvider from "./StyleProvider";
import { Router } from "./router";

function App() {
  const router = Router();

  return (
    <StyleProvider>
      <RouterProvider router={router} />
    </StyleProvider>
  );
}

export default App;
