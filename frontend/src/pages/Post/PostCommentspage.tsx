import {
  ActionIcon,
  Button,
  Divider,
  Flex,
  List,
  Loader,
  Paper,
  Text,
  Textarea,
  createStyles,
  rem,
} from "@mantine/core";
import { Suspense, useEffect, useState } from "react";
import { Await, useLoaderData, useNavigate, useParams } from "react-router-dom";
import { IComment } from "../../types/types";
import useBoundStore from "../../store/Store";
import { TbX } from "react-icons/tb";

interface IPromise {
  data: Promise<IComment[]>;
}
interface Idata {
  data: { comments: IComment[] };
}

export default function PostCommentsPage() {
  const { addComment, user, deleteComment } = useBoundStore((state) => state);
  const { id } = useParams();
  const navigate = useNavigate();
  const loader = useLoaderData();
  const [value, setValue] = useState("");
  const [postComments, setPostComments] = useState<any[]>([]);
  const useStyles = createStyles((theme) => ({
    wrapper: {
      minWidth: "45%",
      alignItems: "center",
      backgroundColor:
        theme.colorScheme === "dark" ? theme.colors.gray[9] : theme.white,
      border: `${rem(1)} solid ${
        theme.colorScheme === "dark"
          ? theme.colors.dark[8]
          : theme.colors.gray[3]
      }`,

      [theme.fn.smallerThan("xs")]: {
        flexDirection: "column",
        width: "100%",
        margin: theme.spacing.sm,
        padding: theme.spacing.sm,
      },
    },
    inner: {
      [theme.fn.smallerThan("xs")]: {
        padding: theme.spacing.sm,
        margin: 0,
      },
    },
    item: {
      display: "flex",
      justifyContent: "space-between",
      padding: "5px",
      marginTop: "10px",
      borderBottom: `${rem(1)} solid ${
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[3]
      }`,
      borderRadius: "5px",
    },
    content: {
      overflow: "hidden",
    },
  }));
  function RenderCommentsElements(data: Idata) {
    function handleAddComment() {
      const newComment = {
        id: Math.floor(Math.random() * Date.now()).toString(36),
        content: value,
        authorId: user?.id as string,
        postId: id as string,
      };
      addComment(newComment);
      setPostComments([...(postComments as IComment[]), newComment]);
    }
    const handleDeleteComment = (id: string) => {
      deleteComment(id);
      setPostComments(postComments.filter((p: IComment) => p.id !== id));
    };
    const handleValue = (value: string) => {
      setValue(value);
    };

    useEffect(() => {
      setPostComments(data.data.comments);
    }, [data.data.comments]);
    const { classes } = useStyles();
    return (
      <Paper radius="md" p="xl" className={classes.wrapper} mt={20}>
        <Flex justify="space-between">
          <Button
            variant="subtle"
            color="cyan"
            size="xs"
            onClick={() => handleAddComment()}
          >
            Add
          </Button>
          <Button
            variant="subtle"
            color="red"
            size="xs"
            onClick={() => navigate("/")}
          >
            <TbX size={20} />
          </Button>
        </Flex>
        <Textarea
          data-autofocus
          label=""
          placeholder="Commens"
          minRows={4}
          value={value}
          onChange={(e) => handleValue(e.target.value)}
        />
        <Divider label="Drag Your Comments" labelPosition="center" my={15} />
        <Paper
          withBorder
          shadow="md"
          p={30}
          radius="md"
          className={classes.inner}
        >
          <List>
            {postComments.map((p:IComment, idx) => (
              <Flex key={idx} className={classes.item}>
                <List.Item>
                  <Text className={classes.content}>{p.content }</Text>
                </List.Item>
                <ActionIcon>
                  <TbX size={15} onClick={() => handleDeleteComment(p.id)} />
                </ActionIcon>
              </Flex>
            ))}
          </List>
        </Paper>
      </Paper>
    );
  }
  return (
    <Suspense fallback={<Loader color="teal" variant="dots" />}>
      <Await resolve={(loader as IPromise).data}>
        {RenderCommentsElements}
      </Await>
    </Suspense>
  );
}
