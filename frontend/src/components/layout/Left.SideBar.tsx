import { createStyles, Navbar, getStylesRef, em } from "@mantine/core";
import { NavLink } from "react-router-dom";
import useBoundStore from "../../store/Store";

const useStyles = createStyles((theme) => ({
  sideBar: {
    position: "sticky",
    border: "none",
    width: "200px",
    maxHeight: "60vh",
    [`@media (max-width: ${em(1000)})`]: {
      display: "none",
    },
  },

  link: {
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
    fontSize: theme.fontSizes.sm,
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[1]
        : theme.colors.gray[7],
    padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
    borderRadius: theme.radius.sm,
    fontWeight: 550,
    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[1],
      color: theme.colorScheme === "dark" ? theme.white : theme.black,

      [`& .${getStylesRef("icon")}`]: {
        color: theme.colorScheme === "dark" ? theme.white : theme.black,
      },
    },
  },

  active: {},
}));

export default function LeftSideBar() {
  const { classes } = useStyles();
  const { user } = useBoundStore((state) => state);
  return (
    <Navbar
      py="md"
      pr="xl"
      className={classes.sideBar}
      style={{
        ...(!user && { pointerEvents: "none", opacity: "0.33" }),
      }}
    >
      <Navbar.Section pt={30} mt={30}>
        <NavLink to="#"></NavLink>
      </Navbar.Section>
    </Navbar>
  );
}
