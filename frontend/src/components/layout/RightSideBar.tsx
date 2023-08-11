import { createStyles, Navbar, getStylesRef, Text, em } from "@mantine/core";
import { IconSettings, IconLogout, IconLogin } from "@tabler/icons-react";
import { NavLink, useNavigate } from "react-router-dom";
import LightDark from "../misc/LightDark";
import useBoundStore from "../../store/Store";
import {
  TbFolder,
  TbFolders,
  TbHeart,
  TbMessage,
  TbUserPlus,
} from "react-icons/tb";

const useStyles = createStyles((theme) => ({
  sideBar: {
    position: "sticky",
    display: "flex",
    justifyContent: "start",
    flexDirection: "column",
    width: "200px",
    maxHeight: "60vh",
    border: "none",
    [`@media (max-width: ${em(1300)})`]: {
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

  disabled: {
    opacity: "33%",
    pointerEvents: "none",
  },
}));
export default function RightSideBar() {
  const navigate = useNavigate();
  const { logoutService, user } = useBoundStore((state) => state);
  const { classes, cx } = useStyles();
  const onLogout = () => {
    logoutService();
    navigate("/");
  };
  return (
    <Navbar mt={20} pl="30px" className={classes.sideBar}>
      <Navbar.Section mt={30}>
        <NavLink to="#" className={classes.link}>
          <LightDark IconSize={23} />
        </NavLink>
      </Navbar.Section>
      {!user ? (
        <Navbar.Section pt={30}>
          <NavLink to="/login" className={classes.link}>
            <IconLogin className={classes.linkIcon} stroke={1.5} />
            <Text>Login</Text>
          </NavLink>
          <NavLink to="/signup" className={classes.link}>
            <TbUserPlus className={classes.linkIcon} size={25} />
            <Text>Create Account</Text>
          </NavLink>
        </Navbar.Section>
      ) : (
        <Navbar.Section pt={30}>
          <NavLink to="#" className={classes.link} onClick={onLogout}>
            <IconLogout className={classes.linkIcon} stroke={1.5} />
            <Text>Logout</Text>
          </NavLink>

          <NavLink to="profile" className={classes.link}>
            <IconSettings className={classes.linkIcon} stroke={1.5} />
            <Text>Profile</Text>
          </NavLink>
        </Navbar.Section>
      )}
      <Navbar.Section mt={30}>
        <NavLink
          to={`/`}
          className={classes.link}
          style={{
            ...{ paddingLeft: "10px" },
          }}
        >
          <TbFolders size={22} style={{ color: "#40C057" }} />
          <Text ml={10}>All Posts</Text>
        </NavLink>
      </Navbar.Section>
      <Navbar.Section mt={30} className={cx({ [classes.disabled]: !user })}>
        <NavLink to={`user/${user?.id as string}`} className={classes.link}>
          <TbFolder size={20} style={{ ...(user && { color: "#ae46a8" }) }} />
          <Text ml={10}>Your Posts</Text>
        </NavLink>
        <NavLink to={`likes/${user?.id as string}`} className={classes.link}>
          <TbHeart size={20} style={{ ...(user && { color: "#FA5252" }) }} />
          <Text ml={10}>Favorite posts</Text>
        </NavLink>

        <NavLink
          to={`userComments/${user?.id as string} `}
          className={classes.link}
        >
          <TbMessage
            size={20}
            style={{ ...(user && { color: "#228BE6" }) }}
          />
          <Text ml={10}>Your comments</Text>
        </NavLink>
      </Navbar.Section>
    </Navbar>
  );
}
