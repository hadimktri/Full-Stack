import { Outlet } from "react-router-dom";
import Header from "./Header ";
import LeftSideBar from "./LeftSideBar";
import { createStyles } from "@mantine/core";
import Footer from "./Footer";
import RightSideBar from "./RightSideBar";

const useStyles = createStyles(() => ({
  body: {
    margin: "auto",
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    maxWidth: "1300px",
    alignItems: "Center",
  },
  main: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
    flex: 1,
  },
  content: {
    display: "flex",
    flex: 4,
    justifyContent: "center",
    alignItems: "start",
  },
}));

export default function PublicLayout() {
  const { classes } = useStyles();
  return (
    <div className={classes.body}>
      <Header />
      <main className={classes.main}>
        <LeftSideBar />
        <div className={classes.content}>
          <Outlet />
        </div>
        <RightSideBar />
      </main>
      <Footer />
    </div>
  );
}
