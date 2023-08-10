import { useState } from "react";
import { BsPlusSquare } from "react-icons/bs";
import {
  createStyles,
  Avatar,
  UnstyledButton,
  Group,
  Text,
  Menu,
  rem,
  Header,
  em,
  Flex,
} from "@mantine/core";
import {
  IconLogout,
  IconHeart,
  IconStar,
  IconMessage,
  IconSettings,
  IconChevronDown,
} from "@tabler/icons-react";
import useBoundStore from "../../store/Store";
import { NavLink, useNavigate } from "react-router-dom";
import LightDark from "../misc/LightDark";
const useStyles = createStyles((theme) => ({
  header: {
    margin: "auto",
    position: "sticky",
    display: "flex",
    justifyContent: "center",
    width: "80%",
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[8]
        : theme.colors.gray[0],
    borderBottom: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.gray[8] : theme.colors.gray[2]
    }`,
    border: "none",
    borderRadius:"5px",
    [`@media (max-width: ${em(1200)})`]: {
      width: "100%",
    },
  },

  inner: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    // [`@media (max-width: ${em(550)})`]: {
    //   flexDirection: "column",
    // },
    [`@media (min-width: ${em(1200)})`]: {
      width: "80%",
    },
  },
  leftSection: {
    display: "flex",
    flex: 4,
    justifyContent: "start",
  },
  centerSection: {
    display: "flex",
    flex: 1,
    justifyContent: "center",
  },
  rightSection: {
    display: "flex",
    flex: 4,
    justifyContent: "end",
  },

  link: {
    display: "flex",
    lineHeight: 1,
    borderRadius: theme.radius.md,
    textDecoration: "none",
    padding: theme.spacing.sm,
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 550,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[2],
      borderRadius: theme.radius.md,
    },

    [`@media (max-width: ${em(800)})`]: {
      borderRadius: 0,
      padding: theme.spacing.xs,
    },
  },
  name: {
    [`@media (min-width: ${em(1200)})`]: {
      display: "none",
    },
    [`@media (max-width: ${em(550)})`]: {
      display: "none",
    },
  },
  hide: {
    [`@media (max-width: ${em(800)})`]: {
      display: "none",
    },
  },
  login: {
    [`@media (min-width: ${em(1200)})`]: {
      display: "none",
    },
  },
  avatar: {
    [`@media (max-width: ${em(1200)})`]: {
      display: "none",
    },
  },
}));

export default function MainHeader() {
  const { classes, theme } = useStyles();
  const [, setUserMenuOpened] = useState(false);
  const { logoutService, user } = useBoundStore((state) => state);
  const navigate = useNavigate();
  return (
    <Header height={60}  className={classes.header}>
      <Group className={classes.inner}>
        <Group className={classes.leftSection}>
          <Group>
            <NavLink to="/" className={classes.link}>
              <Text weight={600} size="md">
                Posts
              </Text>
            </NavLink>

            {user && (
              <Menu
                width={200}
                position="bottom-end"
                transitionProps={{ transition: "pop-top-right" }}
                onClose={() => setUserMenuOpened(false)}
                onOpen={() => setUserMenuOpened(true)}
                withinPortal
              >
                <Menu.Target>
                  <UnstyledButton>
                    <Group ml={-10} className={classes.login}>
                      <NavLink to="#" className={classes.link}>
                        <IconChevronDown size={rem(12)} stroke={1.5} />
                      </NavLink>
                    </Group>
                  </UnstyledButton>
                </Menu.Target>
                <Menu.Dropdown m={20}>
                  <Menu.Item
                    icon={
                      <IconHeart
                        size="0.9rem"
                        color={theme.colors.red[6]}
                        stroke={1.5}
                      />
                    }
                  >
                    Liked posts
                  </Menu.Item>
                  <Menu.Item
                    icon={
                      <IconStar
                        size="0.9rem"
                        color={theme.colors.yellow[6]}
                        stroke={1.5}
                      />
                    }
                  >
                    Saved posts
                  </Menu.Item>
                  <Menu.Item
                    icon={
                      <IconMessage
                        size="0.9rem"
                        color={theme.colors.blue[6]}
                        stroke={1.5}
                      />
                    }
                  >
                    Your comments
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            )}
          </Group>
        </Group>
        {user && (
          <div className={classes.centerSection}>
            <NavLink to="create" className={classes.link}>
              <BsPlusSquare size={22} />
            </NavLink>
          </div>
        )}

        <Group p={0} className={classes.rightSection}>
          {!user ? (
            <Flex className={classes.login}>
              <NavLink to="login" className={classes.link}>
                <Text>Login</Text>
              </NavLink>
              <NavLink to="signup" className={classes.link}>
                <Text>SignUp</Text>
              </NavLink>
            </Flex>
          ) : (
            <Group>
              <Avatar
                className={classes.avatar}
                src={user?.profilePicture}
                alt={user?.name}
                radius="xl"
                size={30}
              />
              <Group className={classes.login}>
                <Menu
                  width={200}
                  position="bottom-start"
                  transitionProps={{ transition: "pop-top-left" }}
                  onClose={() => setUserMenuOpened(false)}
                  onOpen={() => setUserMenuOpened(true)}
                  withinPortal
                >
                  <Menu.Target>
                    <UnstyledButton>
                      <NavLink className={classes.link} to="#">
                        <Group spacing={15}>
                          <Avatar
                            src={user?.profilePicture}
                            alt={user?.name}
                            radius="xl"
                            size={30}
                          />

                          <Text
                            weight={550}
                            size="sm"
                            sx={{ lineHeight: 1 }}
                            className={classes.name}
                          >
                            {user?.name}
                          </Text>
                          <IconChevronDown size={rem(12)} stroke={1.5} />
                        </Group>
                      </NavLink>
                    </UnstyledButton>
                  </Menu.Target>
                  <Menu.Dropdown mt={10}>
                    <Menu.Label>Theme</Menu.Label>
                    <Menu.Item>
                      <LightDark IconSize={18} />
                    </Menu.Item>
                    <Menu.Divider />
                    <Menu.Label>Settings</Menu.Label>
                    <Menu.Item
                      onClick={() => navigate("/profile")}
                      icon={<IconSettings size="0.9rem" stroke={1.5} />}
                    >
                      Profile
                    </Menu.Item>
                    <Menu.Item
                      onClick={logoutService}
                      icon={<IconLogout size="0.9rem" stroke={1.5} />}
                    >
                      Logout
                    </Menu.Item>
                  </Menu.Dropdown>
                </Menu>
              </Group>
            </Group>
          )}
        </Group>
      </Group>
    </Header>
  );
}
