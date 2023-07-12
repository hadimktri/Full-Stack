import {
  createStyles,
  Text,
  Title,
  Button,
  Image,
  rem,
  Container,
} from "@mantine/core";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import useBoundStore from "../../store/Store";

const useStyles = createStyles((theme) => ({
  wrapper: {
    display: "flex",
    alignItems: "center",
    padding: `calc(${theme.spacing.xl} * 2)`,
    borderRadius: theme.radius.md,
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white,
    border: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.colors.gray[3]
    }`,

    [theme.fn.smallerThan("sm")]: {
      flexDirection: "column-reverse",
      padding: theme.spacing.xl,
    },
  },

  image: {
    maxWidth: "35%",

    [theme.fn.smallerThan("sm")]: {
      maxWidth: "100%",
    },
  },

  body: {
    paddingRight: `calc(${theme.spacing.xl} * 4)`,

    [theme.fn.smallerThan("sm")]: {
      paddingRight: 0,
      marginTop: theme.spacing.xl,
    },
  },

  title: {
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    lineHeight: 1,
    marginBottom: theme.spacing.md,
  },

  controls: {
    display: "flex",
    justifyContent: "space-around",
    marginTop: theme.spacing.xl,
  },

  inputWrapper: {
    width: "100%",
    flex: "1",
  },

  input: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    borderRight: 0,
  },

  control: {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },
}));

export default function PostDetailsPage() {
  const { deletePost } = useBoundStore((state) => state);
  const { classes } = useStyles();

  const { id, userId, title, category, content, image, author } =
    useLoaderData();
  const navigate = useNavigate();

  const handleDelete = () => {
    deletePost(id as string);
    navigate("/posts");
  };

  return (
    <Container size="50%" my={40}>
      <div className={classes.wrapper}>
        <div className={classes.body}>
          <Title className={classes.title}>{title}</Title>
          <Text fw={500} fz="lg" mb={5}>
            {category}
          </Text>
          <Text fz="sm" c="dimmed">
            {content}
          </Text>

          <div className={classes.controls}>
            <Button radius="md">
              <Link to={`create/${id as string}`}>Edit</Link>
            </Button>
            <Button onClick={handleDelete}>Delete</Button>
          </div>
        </div>
        <Image src={image as string} className={classes.image} />
      </div>
    </Container>
  );
}
