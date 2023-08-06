import { Outlet as Content } from "react-router-dom";
import Header from "./Header ";
import LeftSideBar from "./Left.SideBar";
import PublicRightSideBar from "./Public.Right.SideBar";
import { createStyles } from "@mantine/core";
import Footer from "./Footer";

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

export default function PublicLayout() {


  const { classes } = useStyles();
  return (

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
            <PublicRightSideBar />
          </div>
        </main>
        <Footer />
      </div>

  );
}
