import {
  createStyles,
  Text,
  Title,
  Image,
  rem,
  Container,
  Group,
  Button,
} from "@mantine/core";
import useBoundStore from "../../store/Store";
import PasswordChange from "../../components/Auth/Password.Change";

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
  form: { width: "50vw", marginLeft: `calc(${theme.spacing.xl} )` },
  done: { padding: "0", border: "none" },
  buttons: { display: "flex", justifyContent: "space-evenly" },
}));

export default function UserProfile() {
  const { user, deleteUser } = useBoundStore((state) => state);

  const { classes } = useStyles();

  const handleDelete = () => {
    deleteUser(user?.id as string);
  };

  return (
    <Container size="50%" my={40}>
      <div className={classes.wrapper}>
        <div className={classes.body}>
          <Title className={classes.title}>{user?.name}</Title>
          <Text fw={500} fz="lg" mb={5}>
            {user?.email}
          </Text>
          <Group mt="lg">
            {/* <ActionIcon> */}
            <PasswordChange />
            <Button variant="outline" onClick={handleDelete} color="red">
              Delete your account
            </Button>
            {/* </ActionIcon> */}
          </Group>
        </div>
        <Image
          src={user?.profilePicture}
          className={classes.image}
          radius={50}
        />
      </div>
    </Container>
  );
}
