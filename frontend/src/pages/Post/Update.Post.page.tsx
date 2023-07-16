import {
  TextInput,
  Button,
  Group,
  createStyles,
  rem,
  Container,
  Textarea,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import { IPost } from "../../types/types";
import useBoundStore from "../../store/Store";
const useStyles = createStyles((theme) => ({
  wrapper: {
    padding: `calc(${theme.spacing.xl} * 2)`,
    borderRadius: theme.radius.md,
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white,
    border: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.colors.gray[3]
    }`,
  },
}));

function UpdatePostPage() {
  const { updatePost } = useBoundStore((state) => state);
  const { classes } = useStyles();
  const navigate = useNavigate();
  const { postId } = useParams();
  const { title, category, content, image } = useLoaderData() as IPost;
  const form = useForm({
    initialValues: {
      title: title,
      category: category,
      content: content,
      image: image,
    },
  });

  const handleSubmit = (values: any) => {
    updatePost(values, postId as string);
    navigate("/posts");
  };

  return (
    <Container size="50%" my={40}>
      <div className={classes.wrapper}>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <TextInput
            label="Title"
            placeholder="Enter a Title"
            {...form.getInputProps("title")}
            withAsterisk
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
          />
          <Group position="right" mt="md">
            <Button type="submit">{!postId ? "Create" : "Edit"}</Button>
          </Group>
        </form>
      </div>
    </Container>
  );
}

export default UpdatePostPage;
