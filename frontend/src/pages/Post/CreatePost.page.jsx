import {
  TextInput,
  Button,
  Group,
  Box,
  createStyles,
  rem,
  Container,
  Textarea,
} from "@mantine/core";
import DOMAIN from "../../services/endpoint";
import axios from "axios";
import { useForm } from "@mantine/form";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";
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

function CreatePostPage() {
  const { classes } = useStyles();
  // redirects
  const navigate = useNavigate();

  const { user } = useBoundStore((state) => state);
  // gets id as a parameter from url
  const { postId } = useParams();

  const formValue = () => {
    if (postId) {
      const { id, userId, title, category, content, image, author } =
        useLoaderData();
      return {
        initialValues: {
          title,
          category,
          content,
          image,
        },
      };
    } else {
      return {
        initialValues: {
          title: "",
          category: "",
          content: "",
          image: "",
        },
      };
    }
  };

  //sets the initial values or entered values
  const form = useForm(formValue());

  // checks first if url contains any parameter, swichs the form from create to update
  const handleSubmit = async (values) => {
    if (postId) {
      //update
      const res = await axios.post(
        `${DOMAIN}/api/posts/${postId}/create/${postId}`,
        values
      );
      if (res?.data.success) {
        navigate(`/posts/${postId}`);
      }
    } else {
      //add
      const res = await axios.post(`${DOMAIN}/api/posts/${user.id}`, values);
      if (res?.data.success) {
        navigate("/posts");
      }
    }
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
            label="Category"
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

export default CreatePostPage;
