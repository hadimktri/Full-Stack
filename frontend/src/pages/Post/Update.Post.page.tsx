import {
  TextInput,
  Button,
  createStyles,
  rem,
  Textarea,
  Image,
  Paper,
  Group,
  em,
  Flex,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useLoaderData, useNavigate } from "react-router-dom";
import { IPost } from "../../types/types";
import useBoundStore from "../../store/Store";
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
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white,
    [`@media (max-width: ${em(550)})`]: {
      flexDirection: "column",
      padding: 0,
    },
  },
  innerRight: {
    width: "50%",
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
    width: "50%",
    height: "auto",
    [theme.fn.smallerThan("xs")]: {
      padding: theme.spacing.sm,
      margin: 0,
    },
    [`@media (max-width: ${em(550)})`]: {
      width: "100%",
    },
  },
  image: { width: "100%", height: "auto" },
}));

export default function UpdatePostPage() {
  const { updatePost, deletePost, user } = useBoundStore((state) => state);
  const { classes } = useStyles();
  const navigate = useNavigate();
  const { id, title, category, content, image, authorId } =
    useLoaderData() as IPost;
  const form = useForm({
    initialValues: {
      title: title,
      category: category,
      content: content,
      image: image,
    },
  });

  const handleSubmit = (values: any) => {
    if (authorId === user?.id) {
      updatePost(values, id);
    }
    navigate(`/posts`);
  };
  const handleDelete = () => {
    if (authorId === user?.id) {
      deletePost(id);
    }
    navigate("/posts");
  };

  return (
    <Paper className={classes.wrapper} mt="20px">
      <Flex justify="flex-end" p="sm">
        <Button
          variant="subtle"
          color="red"
          size="xs"
          onClick={() => navigate("/posts")}
        >
          <TbX size={20} />
        </Button>
      </Flex>
      <Paper p="xl" pt="0" className={classes.inner}>
        <Paper withBorder p={10} mx={10} className={classes.innerLeft}>
          <Image radius="xs" src={image} className={classes.image} />
          <Group position="apart">
            <Button
              variant="subtle"
              onClick={handleDelete}
              color="red"
              mt="xl"
              size="sm"
            >
              Delete Post ?
            </Button>
            <Button
              type="submit"
              variant="subtle"
              color="indigo"
              mt="xl"
              size="sm"
            >
              Edit Post ?
            </Button>
          </Group>
        </Paper>
        <Paper
          withBorder
          shadow="md"
          p={25}
          mx={10}
          className={classes.innerRight}
        >
          <form onSubmit={form.onSubmit(handleSubmit)}>
            <TextInput
              label="Title"
              placeholder="Enter a Title"
              {...form.getInputProps("title")}
              withAsterisk
              mt={10}
            />
            <TextInput
              label="category"
              placeholder="Enter a Category"
              {...form.getInputProps("category")}
              withAsterisk
            />
            <TextInput
              label="Image"
              placeholder="Enter an Image"
              {...form.getInputProps("image")}
              withAsterisk
            />
            <Textarea
              label="Content"
              placeholder="Enter some content"
              {...form.getInputProps("content")}
              withAsterisk
              minRows={5}
            />
          </form>
        </Paper>
      </Paper>
    </Paper>
  );
}
