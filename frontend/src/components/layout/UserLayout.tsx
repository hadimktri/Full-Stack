import { Outlet } from "react-router-dom";
import { createStyles } from "@mantine/core";
import { LeftBar } from "./UserLeftBar";
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
      <main className={classes.main}>
        <LeftBar />
        <div className={classes.content}>
          <Outlet />
        </div>
      </main>
    </div>
  );
}
