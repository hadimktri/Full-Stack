import { createStyles, Navbar, getStylesRef, Text, em } from "@mantine/core";
import { IconHeart, IconStar, IconMessage } from "@tabler/icons-react";
import { NavLink } from "react-router-dom";
import { TbSlideshow } from "react-icons/tb";

const useStyles = createStyles((theme) => ({
  sideBar: {
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
}));

export default function LeftSideBar() {
  const { classes, theme } = useStyles();
  return (
    <Navbar py="md" pr="xl" className={classes.sideBar}>
      <Navbar.Section pt={30} mt={30}>
        <NavLink to="" className={classes.link}>
          <TbSlideshow size={20} color={theme.colors.green[8]} />
          <Text ml={10}>Your Posts</Text>
        </NavLink>
      </Navbar.Section>
      <Navbar.Section pt={30} mt={30}>
        <NavLink to="" className={classes.link}>
          <IconHeart size={18} color={theme.colors.red[6]} stroke={1.5} />
          <Text ml={10}>Liked posts</Text>
        </NavLink>

        <NavLink to="" className={classes.link}>
          <IconStar size={18} color={theme.colors.yellow[6]} stroke={1.5} />
          <Text ml={10}>Saved posts</Text>
        </NavLink>
        <NavLink to="" className={classes.link}>
          <IconMessage size={18} color={theme.colors.blue[6]} stroke={1.5} />
          <Text ml={10}>Your comments</Text>
        </NavLink>
      </Navbar.Section>
    </Navbar>
  );
}
