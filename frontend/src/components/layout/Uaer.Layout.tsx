import { Outlet as Content } from "react-router-dom";
import { createStyles } from "@mantine/core";

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

export default function UserLayout() {
  const { classes } = useStyles();
  return (
    <div className={classes.content}>
      <Content />
    </div>
  );
}
