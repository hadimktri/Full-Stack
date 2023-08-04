import { createStyles, Navbar, getStylesRef, Text, em } from "@mantine/core";
import {
  IconHeart,
  IconStar,
  IconBookmark,
  IconMessage,
} from "@tabler/icons-react";
import { NavLink } from "react-router-dom";
import { TbBookmark, TbSlideshow } from "react-icons/tb";
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
        <NavLink
          to={`/posts/user/${user?.id as string} `}
          className={classes.link}
        >
          <TbSlideshow
            size={20}
            style={{ ...(user && { color: "#40C057" }) }}
          />
          <Text ml={10}>Your Posts</Text>
        </NavLink>
      </Navbar.Section>
      <Navbar.Section pt={30} mt={30}>
        <NavLink
          to={`/posts/userLiked/${user?.id as string} `}
          className={classes.link}
        >
          <IconHeart
            size={18}
            style={{ ...(user && { color: "#FA5252" }) }}
            stroke={1.5}
          />
          <Text ml={10}>Liked posts</Text>
        </NavLink>

        <NavLink
          to={`/posts/userSaved/${user?.id as string} `}
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
          to={`/posts/Commented/${user?.id as string} `}
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
