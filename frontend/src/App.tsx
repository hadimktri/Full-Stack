import { RouterProvider } from "react-router-dom";
import StyleProvider from "./StyleProvider";
import { Router } from "./router";
import { createContext, useState } from "react";
import { ISearchContext } from "./types/types";

export const SearchContext = createContext<ISearchContext | null>(null);

function App() {
  const [searchValue, setSearchValue] = useState("");
  const router = Router();
  return (
    <SearchContext.Provider value={{ searchValue, setSearchValue }}>
      <StyleProvider>
        <RouterProvider router={router} />
      </StyleProvider>
    </SearchContext.Provider>
  );
}

export default App;
