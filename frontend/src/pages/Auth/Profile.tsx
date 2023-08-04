import {
  Avatar,
  Text,
  Button,
  Paper,
  createStyles,
  rem,
  Group,
  Flex,
} from "@mantine/core";
import useBoundStore from "../../store/Store";
import { TbX } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
const useStyles = createStyles((theme) => ({
  wrapper: {
    width: "50%",
    height: "500px",
    alignItems: "center",
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.gray[9] : theme.white,
    border: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.colors.gray[3]
    }`,

    [theme.fn.smallerThan("xs")]: {
      flexDirection: "column",
      width: "100%",
      margin: theme.spacing.md,
    },
  },
  buttons: {
    [theme.fn.smallerThan("sm")]: {
      flexDirection: "column",
      width: "100%",
    },
  },
}));

export default function Profile() {
  const { user, deleteUser } = useBoundStore((state) => state);
  const navigate = useNavigate();
  const { classes } = useStyles();

  const handleDelete = () => {
    deleteUser(user?.id as string);
  };

  return (
    <Paper radius="md" withBorder p="lg" className={classes.wrapper} mt={30}>
      <Flex justify="flex-end">
        <Button
          variant="subtle"
          color="red"
          size="xs"
          onClick={() => navigate("/posts")}
        >
          <TbX size={20} />
        </Button>
      </Flex>
      <Avatar
        src={user?.profilePicture}
        size={150}
        radius={120}
        mx="auto"
        mt={30}
      />
      <Paper withBorder shadow="md" p={15} mt={30} radius="md">
        <Text ta="center" fz="lg" weight={600} mt="md">
          {user?.name}
        </Text>
        <Text ta="center" c="dimmed" fz="md">
          {user?.email}
        </Text>
        <Group position="center" spacing="xl" className={classes.buttons}>
          <Button variant="subtle" color="indigo" mt="xl" size="xs">
            Edit Account ?
          </Button>
          <Button
            variant="subtle"
            onClick={handleDelete}
            color="red"
            mt="xl"
            size="xs"
          >
            Delete Account ?
          </Button>
        </Group>
      </Paper>
    </Paper>
  );
}
