import { NavLink, useNavigate } from "react-router-dom";
import useBoundStore from "../../store/Store";
import { useForm } from "@mantine/form";
import {
  Button,
  Divider,
  Flex,
  Image,
  Paper,
  PasswordInput,
  Stack,
  TextInput,
  Title,
  createStyles,
  rem,
} from "@mantine/core";
import { TbX } from "react-icons/tb";
import { IUser } from "../../types/types";
const useStyles = createStyles((theme) => ({
  wrapper: {
    minWidth: "45%",
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

export default function UserProfileUpdate() {
  const { user } = useBoundStore();
  const navigate = useNavigate();
  const { id, name, profilePicture, email, password } = user as IUser;

  const form = useForm({
    initialValues: {
      id: id,
      name: name,
      profilePicture: profilePicture,
      email: email,
      password: password,
    },
  });

  const handleSubmit = (values) => {
    navigate(`profile`);
  };
  const { classes } = useStyles();
  return (
    <Paper radius="md" p="xl" className={classes.wrapper} mt={10}>
      <Flex justify="space-between">
        <Title>Edit your profile</Title>
        <NavLink to="/profile">
          <Button variant="subtle" color="red" size="xs">
            <TbX size={20} />
          </Button>
        </NavLink>
      </Flex>
      <Divider label="*****" labelPosition="center" my={15} />

      <Paper
        withBorder
        shadow="md"
        p={30}
        radius="md"
        className={classes.inner}
      >
        <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
          <Stack align="stretch">
            <Image src={profilePicture} p={20} />
            <TextInput
              label="Name"
              placeholder="Your Name"
              required
              {...form.getInputProps("name")}
            />
            <TextInput
              label="Email"
              placeholder="you@mantine.dev"
              required
              {...form.getInputProps("email")}
            />
            {/* <PasswordInput
              label="Password"
              placeholder="Your password"
              required
              {...form.getInputProps("password")}
            />
            <TextInput
              label="Confirm password"
              placeholder="Your password"
              required
              {...form.getInputProps("confirmPassword")}
            /> */}
            <TextInput
              label="Profile Picture url"
              placeholder="Profile Picture url"
              {...form.getInputProps("profilePicture")}
            />
            {/* <FileInput
            label="Profile Picture File"
            placeholder="Upload Profile Picture File"
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
        </form>
      </Paper>
    </Paper>
  );
}
