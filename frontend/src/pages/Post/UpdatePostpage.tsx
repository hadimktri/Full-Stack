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
  Select,
  Loader,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { Await, useLoaderData, useNavigate } from "react-router-dom";
import { IPost } from "../../types/types";
import useBoundStore from "../../store/Store";
import { TbX } from "react-icons/tb";
import { Suspense } from "react";
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

interface IPromise {
  data: Promise<IPost>;
}
interface Idata {
  data: { post: IPost };
}
export default function UpdatePostPage() {
  const loader = useLoaderData();
  const { updatePost, deletePost, user } = useBoundStore((state) => state);
  const { classes } = useStyles();
  const navigate = useNavigate();

  function RenderPostElements(data: Idata) {
    const post = data.data.post;
    const { id, title, category, content, image, authorId } = post;
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
      navigate(`/`);
    };

    const handleDelete = () => {
      if (authorId === user?.id) {
        deletePost(id);
      }
      navigate("/");
    };

    return (
      <Paper className={classes.wrapper} mt="20px">
        <form onSubmit={form.onSubmit(handleSubmit)}>
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
              <TextInput
                label="Title"
                placeholder="Enter a Title"
                {...form.getInputProps("title")}
                withAsterisk
                mt={10}
              />
              <Select
                label="Category"
                placeholder="Select a category"
                data={[
                  "Tech",
                  "Art",
                  "Nature",
                  "Sport",
                  "Food",
                  "Education",
                  "fashion",
                  "Health",
                  "Business",
                ]}
                defaultValue={category}
                transitionProps={{
                  transition: "pop-top-left",
                  duration: 80,
                  timingFunction: "ease",
                }}
                withinPortal
                withAsterisk
                {...form.getInputProps("category")}
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
            </Paper>
          </Paper>
        </form>
      </Paper>
    );
  }
  
  return (
    <Suspense fallback={<Loader color="teal" variant="dots" />}>
      <Await resolve={(loader as IPromise).data}>{RenderPostElements}</Await>
    </Suspense>
  );
}
