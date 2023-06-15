import React, { useState } from "react";
import {
  createStyles,
  Header,
  Container,
  Group,
  Burger,
  Paper,
  Transition,
  rem,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { GiPlantsAndAnimals } from "react-icons/gi";
import { NavLink, useNavigate } from "react-router-dom";
import useBoundStore from "../../store/Store";
import LightDark from "./LightDark";
const HEADER_HEIGHT = rem(60);

const useStyles = createStyles((theme) => ({
  root: {
    position: "relative",
    zIndex: 1,
  },

  dropdown: {
    position: "absolute",
    top: HEADER_HEIGHT,
    left: 0,
    right: 0,
    zIndex: 0,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    borderTopWidth: 0,
    overflow: "hidden",
    paddingLeft: 15,

    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: "100%",
  },

  links: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },

  burger: {
    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },

  link: {
    // color:'blue',
    display: "block",
    lineHeight: 1,
    padding: `${rem(8)} ${rem(12)}`,
    borderRadius: theme.radius.sm,
    textDecoration: "none",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },

    [theme.fn.smallerThan("sm")]: {
      borderRadius: 0,
      padding: theme.spacing.md,
    },
  },

  linkActive: {
    "&, &:hover": {
      backgroundColor: theme.fn.variant({
        variant: "light",
        color: theme.primaryColor,
      }).background,
      color: theme.fn.variant({ variant: "light", color: theme.primaryColor })
        .color,
    },
  },
}));

export default function Navbar({ links }) {
  const { logoutService, user } = useBoundStore((state) => state);
  const navigate = useNavigate();
  const onLogout = () => {
    logoutService();
    navigate("/");
  };

  const [opened, { toggle, close }] = useDisclosure(false);
  const [active, setActive] = useState(links[0].link);
  const { classes, cx } = useStyles();

  const items = links.map((link) => (
    <NavLink
      key={link.label}
      to={link.link}
      className={cx(classes.link, {
        [classes.linkActive]: active === link.link,
      })}
      onClick={() => {
        setActive(link.link);
        close();
      }}
    >
      <h4>{link.label}</h4>
    </NavLink>
  ));

  return (
    <Header height={HEADER_HEIGHT} mb={120} className={classes.root}>
      <Container className={classes.header}>
        <GiPlantsAndAnimals size={40} style={{ color: "green" }} />
        {!!user && (
          <Group spacing={5} className={classes.links}>
            {items}
          </Group>
        )}
        <Group spacing={5} className={classes.links}>
          {!!user ? (
            <h4 className="logout" onClick={onLogout}>
              Logout
            </h4>
          ) : (
            <NavLink to="login">
              <h4>Login</h4>
            </NavLink>
          )}
        </Group>
        <LightDark />

        <Burger
          opened={opened}
          onClick={toggle}
          className={classes.burger}
          size="sm"
        />

        <Transition transition="pop-top-right" duration={200} mounted={opened}>
          {(styles) => (
            <Paper className={classes.dropdown} withBorder style={styles}>
              <NavLink to="/">
                <h4>Home</h4>
              </NavLink>
              {!!user && (
                <NavLink to="posts">
                  <h4>Posts</h4>
                </NavLink>
              )}
              {!!user ? (
                <h4 className="logout" onClick={onLogout}>
                  Logout
                </h4>
              ) : (
                <NavLink to="login">
                  <h4>Login</h4>
                </NavLink>
              )}
              <LightDark />
            </Paper>
          )}
        </Transition>
      </Container>
    </Header>
  );
}
