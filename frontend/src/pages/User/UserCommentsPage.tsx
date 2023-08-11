import { Suspense } from "react";
import {
  Accordion,
  Avatar,
  Container,
  Group,
  Text,
  Title,
  createStyles,
  rem,
} from "@mantine/core";
import { useLoaderData, Await } from "react-router-dom";
import { Loader } from "@mantine/core";
import { IComment } from "../../types/types";
const useStyles = createStyles((theme) => ({
  wrapper: {
    paddingTop: `calc(${theme.spacing.xl} * 2)`,
    paddingBottom: `calc(${theme.spacing.xl} * 2)`,
    minHeight: 650,
  },

  title: {
    marginBottom: `calc(${theme.spacing.xl} * 1.5)`,
  },

  item: {
    padding: 0,
    borderRadius: theme.radius.sm,
    marginBottom: theme.spacing.lg,
    border: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },
  accordion: {
    width: "500px",
  },
}));
interface IPromise {
  data: Promise<IComment>;
}

export default function UserCommentsPage() {
  const loader = useLoaderData();
  function CommentsAcordion(commentsArray: { data: { comments: IComment[] } }) {
    const comments = commentsArray.data.comments;
    const { classes } = useStyles();
    return (
      <Container className={classes.wrapper}>
        <Title size={20} className={classes.title}>
          Your comments on each post
        </Title>
        <Accordion variant="separated" className={classes.accordion}>
          {comments.map((comment, idx) => (
            <Accordion.Item
              className={classes.item}
              value={comment.id}
              key={idx}
            >
              <Accordion.Control>
                {
                  <Group spacing="xl">
                    <Avatar
                      src={comment.post.image}
                      alt={comment.post.title}
                      radius="xs"
                      size={80}
                    />
                    <Text>{comment.post.title}</Text>
                  </Group>
                }
              </Accordion.Control>
              <Accordion.Panel>{comment.content}</Accordion.Panel>
            </Accordion.Item>
          ))}
        </Accordion>
      </Container>
    );
  }

  return (
    <Suspense fallback={<Loader color="teal" variant="dots" />}>
      <Await resolve={(loader as IPromise).data}>{CommentsAcordion}</Await>
    </Suspense>
  );
}
