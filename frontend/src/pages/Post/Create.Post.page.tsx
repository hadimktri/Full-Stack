import {
  TextInput,
  Button,
  Group,
  createStyles,
  rem,
  Container,
  Textarea,
  FileInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useNavigate } from "react-router-dom";
import useBoundStore from "../../store/Store";
import { IUser } from "../../types/types";

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
  const navigate = useNavigate();
  const form = useForm();
  const { user, addPost } = useBoundStore((state) => state);

  const handelAddPost = (values: any) => {
    addPost(values, (user as IUser).id);
    navigate("/posts");
  };

  return (
    <Container size="50%" my={40}>
      <div className={classes.wrapper}>
        <form onSubmit={form.onSubmit(handelAddPost)}>
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
          <FileInput
            label="Upload files"
            placeholder="Upload files"
            accept="image/png,image/jpeg"
          />
          <Group position="right" mt="md">
            <Button type="submit">Create</Button>
          </Group>
        </form>
      </div>
    </Container>
  );
}

export default CreatePostPage;
