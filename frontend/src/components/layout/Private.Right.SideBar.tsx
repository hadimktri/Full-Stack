import {
  createStyles,
  Navbar,
  getStylesRef,
  Text,
  em,
} from "@mantine/core";
import { IconSettings, IconLogout, IconLogin } from "@tabler/icons-react";
import { NavLink, useNavigate } from "react-router-dom";
import { IconHeart, IconMessage } from "@tabler/icons-react";
import LightDark from "../misc/LightDark";
import useBoundStore from "../../store/Store";
import { TbBookmark, TbSlideshow, TbUserPlus } from "react-icons/tb";

const useStyles = createStyles((theme) => ({
  sideBar: {
    position: "sticky",
    width: "200px",
    maxHeight: "60vh",
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

  disabled: {
    opacity: "33%",
    pointerEvents: "none",
  },
}));
export default function PrivateRightSideBar() {
  const navigate = useNavigate();
  const { logoutService, user } = useBoundStore((state) => state);
  const { classes } = useStyles();
  const onLogout = () => {
    logoutService();
    navigate("/");
  };
  return (
    <Navbar my="md" pl="30px" className={classes.sideBar}>
      <Navbar.Section mt={30}>
        <NavLink to="#" className={classes.link}>
          <LightDark IconSize={23} />
        </NavLink>
      </Navbar.Section>
      <Navbar.Section pt={30}>
        {!user ? (
          <>
            <NavLink to="login" className={classes.link}>
              <IconLogin className={classes.linkIcon} stroke={1.5} />
              <Text>Login</Text>
            </NavLink>
            <NavLink to="signup" className={classes.link}>
              <TbUserPlus className={classes.linkIcon} size={25} />
              <Text>Create Account</Text>
            </NavLink>
          </>
        ) : (
          <>
            <NavLink to="#" className={classes.link} onClick={onLogout}>
              <IconLogout className={classes.linkIcon} stroke={1.5} />
              <Text>Logout</Text>
            </NavLink>

            <NavLink to="user/profile" className={classes.link}>
              <IconSettings className={classes.linkIcon} stroke={1.5} />
              <Text>Profile</Text>
            </NavLink>
          </>
        )}
      </Navbar.Section>
      <Navbar.Section mt={30}>
        <NavLink
          to={`user/${user?.id as string}`}
          className={classes.link}
        >
          <TbSlideshow
            size={20}
            style={{ ...(user && { color: "#40C057" }) }}
          />
          <Text ml={10}>Your Posts</Text>
        </NavLink>
        <NavLink to={`user/likes/${user?.id as string}`} className={classes.link}>
          <IconHeart
            size={18}
            style={{ ...(user && { color: "#FA5252" }) }}
            stroke={1.5}
          />
          <Text ml={10}>Liked posts</Text>
        </NavLink>

        <NavLink
          to={`user/saves/${user?.id as string} `}
          className={classes.link}
          style={{
            ...{ paddingLeft: "10px" },
          }}
        >
          <TbBookmark
            size={22}
            style={{ ...(user && { color: "#FAB005" }) }}
            // stroke={1.5}
          />
          <Text ml={10}>Saved posts</Text>
        </NavLink>
        <NavLink
          to={`user/comments/${user?.id as string} `}
          className={classes.link}
        >
          <IconMessage
            size={18}
            style={{ ...(user && { color: "#228BE6" }) }}
            stroke={1.5}
          />
          <Text ml={10}>Your comments</Text>
        </NavLink>
      </Navbar.Section>
    </Navbar>
  );
}
