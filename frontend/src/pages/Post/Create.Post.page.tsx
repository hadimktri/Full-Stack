import {
  TextInput,
  Button,
  createStyles,
  rem,
  Textarea,
  Paper,
  Title,
  Divider,
  Stack,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useNavigate } from "react-router-dom";
import useBoundStore from "../../store/Store";
import { IUser } from "../../types/types";

const useStyles = createStyles((theme) => ({
  wrapper: {
    minWidth: "45%",
    height:"600px",
    alignItems: "center",
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.gray[9] : theme.white,
    border: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.colors.gray[3]
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
  buttons: {
    [theme.fn.smallerThan("sm")]: {
      flexDirection: "column",
      width: "100%",
    },
  },
}));

function CreatePostPage() {
  const { classes } = useStyles();
  const navigate = useNavigate();
  const { user, addPost } = useBoundStore((state) => state);

  const form = useForm();

  const handelAddPost = (values: any) => {
    addPost({ ...values, authorId: (user as IUser).id });
    navigate("/posts");
  };

  return (
    <Paper radius="md" p="xl" className={classes.wrapper} mt={10}>
      <Title size={30}>Create Your Post</Title>{" "}
      <Divider
        label="Please fill all 4 fields"
        labelPosition="center"
        my={15}
      />
      <Paper
        withBorder
        shadow="md"
        p={30}
        radius="md"
        className={classes.inner}
      >
        <form onSubmit={form.onSubmit(handelAddPost)}>
          <Stack>
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
            {/* <FileInput
          label="Upload files"
          placeholder="Upload files"
          accept="image/png,image/jpeg"
        /> */}
          </Stack>
          <Button
            fullWidth
            type="submit"
            variant="subtle"
            color="indigo"
            mt="xl"
            size="sm"
            value="one"
          >
            Submit
          </Button>
          {/* {Loading ? <Loader color="teal" variant="dots" /> : null} */}
        </form>
      </Paper>
    </Paper>
  );
}

export default CreatePostPage;
