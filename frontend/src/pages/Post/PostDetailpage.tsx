import {
  Button,
  createStyles,
  rem,
  Image,
  Paper,
  em,
  Flex,
  Text,
} from "@mantine/core";

import { Link, useLocation, useNavigate } from "react-router-dom";
import { IPost } from "../../types/types";
import { TbX } from "react-icons/tb";
const useStyles = createStyles((theme) => ({
  wrapper: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white,
    border: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[3]
    }`,
  },
  inner: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "column",
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white,
    [`@media (max-width: ${em(550)})`]: {
      padding: 0,
    },
  },
  innerRight: {
    width: "100%",
    height: "auto",
    [theme.fn.smallerThan("xs")]: {
      padding: theme.spacing.sm,
      margin: 0,
    },
    [`@media (max-width: ${em(550)})`]: {
      width: "100%",
    },
  },
  innerLeft: {
    width: "100%",
    height: "auto",
    [theme.fn.smallerThan("xs")]: {
      padding: theme.spacing.sm,
      margin: 0,
    },
    [`@media (max-width: ${em(550)})`]: {
      width: "100%",
    },
  },
  details: { width: "100%", display: "flex", justifyContent: "space-between" },
  image: { width: "100%", height: "auto" },
}));

export default function PostDetailPage() {
  const { classes } = useStyles();
  const navigate = useNavigate();
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { state } = useLocation();
  const { title, category, image, likes, author, comments, content } =
    state as IPost;
  return (
    <Paper className={classes.wrapper} mt="20px">
      <Flex justify="flex-end" p="sm">
        <Button
          variant="subtle"
          color="red"
          size="xs"
          onClick={() => navigate("/")}
        >
          <TbX size={20} />
        </Button>
      </Flex>
      <Paper p="xl" pt="0" className={classes.inner}>
        <Paper withBorder p={10} mx={10} className={classes.innerLeft}>
          <Link to={image}>
            <Image
              src={image}
              alt={title}
              radius={5}
              className={classes.image}
            />
          </Link>
        </Paper>
        <Paper
          withBorder
          shadow="md"
          p={25}
          mx={10}
          className={classes.innerRight}
        >
          <Paper
            radius="md"
            withBorder
            p={15}
            className={classes.details}
            mb={5}
          >
            <Text fw={700}>{`title : ${title}`}</Text>
            <Text>{`Category : ${category}`}</Text>
            <Text>{`Author : ${author.name}`}</Text>
            <Text>{`Likes : ${likes}`}</Text>
          </Paper>
          <Paper radius="md" withBorder p={15} mb={5}>
            <Text>{`Content : ${content}`}</Text>
          </Paper>
          <Paper radius="md" withBorder px={15}>
            <Text color="cyan" fw={700} my="xs">{`Commtents`}</Text>
            {comments.map((c, i) => (
              <Text m={10} key={i}>
                {c.content}
              </Text>
            ))}
          </Paper>
        </Paper>
      </Paper>
    </Paper>
  );
}
