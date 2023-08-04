import {
  Container,
  Title,
  Accordion,
  createStyles,
  rem,
  Text,
  Avatar,
  Group,
} from "@mantine/core";
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

export default function CommentsAcordion({
  commentsArray,
}: {
  commentsArray: IComment[];
}) {
  const { classes } = useStyles();
  console.log(commentsArray[0]);
  return (
    <Container className={classes.wrapper}>
      <Title size={20} className={classes.title}>
        Your comments on each post
      </Title>
      <Accordion variant="separated" className={classes.accordion}>
        {commentsArray.map((comment, idx) => (
          <Accordion.Item className={classes.item} value={comment.id} key={idx}>
            <Accordion.Control>
              {
                <Group spacing="xl">
                  <Avatar
                    // className={classes.avatar}
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
