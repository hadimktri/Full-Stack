import { createStyles, Navbar, getStylesRef, Text, rem, em } from "@mantine/core";
import { IconSettings, IconLogout, IconLogin } from "@tabler/icons-react";
import { NavLink, useNavigate } from "react-router-dom";
import LightDark from "../misc/LightDark";
import useBoundStore from "../../store/Store";

const useStyles = createStyles((theme) => ({
  sideBar: {
    width: "200px",
    maxHeight:"60vh",
    border: "none",
    [`@media (max-width: ${em(1200)})`]: {
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

  linkIcon: {
    ref: getStylesRef("icon"),
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[2]
        : theme.colors.gray[6],
    marginRight: theme.spacing.sm,
  },
}));
export default function RightSideBar() {
  const navigate = useNavigate();
  const { logoutService, user } = useBoundStore((state) => state);
  const { classes } = useStyles();
  const onLogout = () => {
    logoutService();
    navigate("posts");
  };
  return (
    <Navbar py="md" pl="30px" className={classes.sideBar}>
      <Navbar.Section pt={30} mt={30}>
        <NavLink to="#" className={classes.link}>
          <LightDark IconSize={23} />
        </NavLink>
      </Navbar.Section>
      {!user ? (
        <Navbar.Section pt={30} mt={30}>
          <NavLink to="login" className={classes.link}>
            <IconLogin className={classes.linkIcon} stroke={1.5} />
            <Text>Login</Text>
          </NavLink>
        </Navbar.Section>
      ) : (
        <Navbar.Section pt={30} mt={30}>
          <NavLink to="#" className={classes.link} onClick={onLogout}>
            <IconLogout className={classes.linkIcon} stroke={1.5} />
            <Text>Logout</Text>
          </NavLink>

          <NavLink to="/user/profile" className={classes.link}>
            <IconSettings className={classes.linkIcon} stroke={1.5} />
            <Text>Account settings</Text>
          </NavLink>
        </Navbar.Section>
      )}
    </Navbar>
  );
}
