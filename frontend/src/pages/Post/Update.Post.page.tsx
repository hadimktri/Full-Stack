import {
  TextInput,
  Button,
  Group,
  createStyles,
  rem,
  Container,
  Textarea,
  Image,
  ActionIcon,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useLoaderData, useNavigate } from "react-router-dom";
import { IPost } from "../../types/types";
import useBoundStore from "../../store/Store";
import { TbChecks, TbTrashFilled } from "react-icons/tb";
const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    height: "430px",
  },
  wrapper: {
    display: "flex",
    padding: `calc(${theme.spacing.xl} )`,
    borderRadius: theme.radius.md,
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white,
    border: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.colors.gray[3]
    }`,
  },
  image: { maxWidth: "50%" },
  form: { width: "50vw", marginLeft: `calc(${theme.spacing.xl} )` },
  done: { padding: "0", border: "none" },
  buttons:{ display:"flex", justifyContent:"space-evenly"}
}));

function UpdatePostPage() {
  const { updatePost, deletePost } = useBoundStore((state) => state);
  const { classes, theme } = useStyles();
  const navigate = useNavigate();
  const { id, title, category, content, image } = useLoaderData() as IPost;
  const form = useForm({
    initialValues: {
      title: title,
      category: category,
      content: content,
      image: image,
    },
  });

  const handleSubmit = (values: any) => {
    updatePost(values, id);
    navigate(`/posts`);
  };
  const handleDelete = () => {
    deletePost(id);
    navigate("/posts");
  };

  return (
    <Container className={classes.wrapper} size="md">
      <Image src={image} className={classes.image} />
      <form onSubmit={form.onSubmit(handleSubmit)} className={classes.form}>
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
        <Group className={classes.buttons} mt="lg">
          <ActionIcon>
            <Button variant="outline" type="submit" className={classes.done}>
              <TbChecks size={30} color={theme.colors.green[9]} />
            </Button>
          </ActionIcon>
          <ActionIcon>
            <TbTrashFilled
              size={30}
              color={theme.colors.red[9]}
              onClick={handleDelete}
            />
          </ActionIcon>
        </Group>
      </form>
    </Container>
  );
}

export default UpdatePostPage;
