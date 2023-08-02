import { Outlet as Content } from "react-router-dom";
import Header from "./Header ";
import LeftSideBar from "./Left.SideBar";
import RightSideBar from "./Right.SideBar";
import { createStyles } from "@mantine/core";
import Footer from "./Footer";
import { createContext, useState } from "react";
import { ILayoutContext } from "../../types/types";

export const LayoutContext = createContext<ILayoutContext | null>(null);

const useStyles = createStyles(() => ({
  body: {
    margin: "auto",
    maxWidth: "1400px",
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  },

  main: {
    width: "100%",
    display: "flex",
    flex: 1,
  },
  content: {
    display: "flex",
    flex: 4,
    justifyContent: "center",
  },
  side: {
    display: "flex",
  },
}));

export default function Layout() {
  const [searchValue, setSearchValue] = useState("");

  const { classes } = useStyles();
  return (
    <LayoutContext.Provider value={{ searchValue, setSearchValue }}>
      <div className={classes.body}>
        <Header />
        <main className={classes.main}>
          <div className={classes.side}>
            <LeftSideBar />
          </div>
          <div className={classes.content}>
            <Content />
          </div>
          <div className={classes.side}>
            <RightSideBar />
          </div>
        </main>
        <Footer />
      </div>
    </LayoutContext.Provider>
  );
}
