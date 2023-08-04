import {
  TextInput,
  PasswordInput,
  Paper,
  Title,
  Text,
  Button,
  Anchor,
  createStyles,
  Loader,
  Stack,
  Divider,
  rem,
  Flex,
} from "@mantine/core";
import { useForm, isEmail, hasLength } from "@mantine/form";
import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useBoundStore from "../../store/Store";
import { getGoogleUrl } from "../../utils/getGoogleUrl";
import { FcGoogle } from "react-icons/fc";
import { IRegisterValues } from "../../types/types";
import { TbX } from "react-icons/tb";

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

export default function RegisterPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { signUpService, authLoading, user } = useBoundStore((state) => state);

  useEffect(() => {
    if (user) {
      navigate("/posts");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  //sets the inital values
  const form = useForm({
    initialValues: {
      email: "",
      name: "",
      password: "",
      confirmPassword: "",
      terms: true,
    },
    validate: {
      email: isEmail("Invalid email"),
      password: hasLength(
        { min: 8, max: 20 },
        "Password must be 8-20 characters long"
      ),
      confirmPassword: (value, values) =>
        value !== values.password ? "Passwords did not match" : false,
    },
  });

  //check the exsistance of both entry if no stops with return if yes fires the (loginService())
  const onSignUp = (values: IRegisterValues) => {
    if (
      !values.email ||
      !values.password ||
      !values.confirmPassword ||
      !values.name ||
      values.password !== values.confirmPassword
    )
      return;
    signUpService(
      values.name,
      values.email,
      values.password,
      values.profilePicture
    );
  };

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const from = (location.state?.from.pathname as string) || "/profile";
  const { classes } = useStyles();
  return (
    <Paper radius="md" p="xl" className={classes.wrapper} mt={10}>
      <Flex justify="space-between">
        <Title>Sign Up!</Title>
        <Button
          variant="subtle"
          color="red"
          size="xs"
          onClick={() => navigate("/posts")}
        >
          <TbX size={20} />
        </Button>
      </Flex>
      <Stack spacing="xs">
        <Anchor
          component="button"
          type="button"
          color="dimmed"
          size="xs"
          align="right"
          mr={20}
        >
          "Have an account? <Link to={"/login"}>Sign In</Link>"
        </Anchor>

        <Button
          fullWidth
          className={classes.buttons}
          href={getGoogleUrl(from)}
          component="a"
          type="button"
          variant="subtle"
          color="indigo"
          size="sm"
        >
          <FcGoogle size={25} />
          <Text ml="sm">Sign Up with Google</Text>
        </Button>
      </Stack>

      <Divider label="Or continue with email" labelPosition="center" my={15} />

      <Paper
        withBorder
        shadow="md"
        p={30}
        radius="md"
        className={classes.inner}
      >
        <form
          onSubmit={form.onSubmit((values) =>
            onSignUp(values as IRegisterValues)
          )}
        >
          <Stack align="stretch">
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
            <PasswordInput
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
            />
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
            Sign Up
          </Button>
          {authLoading ? <Loader color="teal" variant="dots" /> : null}
        </form>
      </Paper>
    </Paper>
  );
}
