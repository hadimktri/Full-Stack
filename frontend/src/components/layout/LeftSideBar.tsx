import {
  createStyles,
  getStylesRef,
  em,
  Image,
  Text,
  Stack,
  Paper,
} from "@mantine/core";

import { useEffect, useState } from "react";
import axios from "axios";
import DOMAIN from "../../services/endpoint";
import { IPost } from "../../types/types";
import { Link } from "react-router-dom";

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
}));

export default function LeftSideBar() {
  const { classes } = useStyles();

  const [posts, setPosts] = useState<IPost[]>([]);

  useEffect(() => {
    axios
      .get(`${DOMAIN as string}/api/posts/topliked`)
      .then((res) => setPosts(res.data.posts))
      .catch((err) => console.log(err));
  }, []);

  return (
    <Paper mt={40} className={classes.sideBar}>
      <Text fz={"md"} maw={100} m={15}>
        Most liked
      </Text>
      {posts.map((post) => (
        <Stack spacing={"xs"} mb={15} key={post.id}>
          <Link
            to={"detail"}
            state={{
              title: post.title,
              category: post.category,
              image: post.image,
              likes: post.likes,
              author: post.author,
              comments: post.comments,
              content: post.content,
            }}
          >
            <Image src={post.image} alt={post.title} width={145} radius={5} />
          </Link>
        </Stack>
      ))}
    </Paper>
  );
}
