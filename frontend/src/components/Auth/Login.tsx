import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Text,
  Group,
  Button,
  createStyles,
  Loader,
  rem,
  Divider,
  Stack,
  Flex,
} from "@mantine/core";
import { useForm, isEmail, hasLength } from "@mantine/form";
import { useContext, useEffect } from "react";
import { Form, NavLink, useLocation, useNavigate } from "react-router-dom";
import useBoundStore from "../../store/Store";
import { FcGoogle } from "react-icons/fc";
import { getGoogleUrl } from "../../utils/getGoogleUrl";
import { RecoveryContext } from "../../pages/Auth/Loginpage";
import { IRecoveryContext } from "../../types/types";
import { TbX } from "react-icons/tb";

interface Ivalues {
  email: string;
  password: string;
  terms: boolean;
}

const useStyles = createStyles((theme) => ({
  wrapper: {
    minWidth: "45%",
    height: "530px",
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
    },
  },
  buttons: {
    [theme.fn.smallerThan("sm")]: {
      flexDirection: "column",
      width: "100%",
    },
  },
}));
export default function Login() {
  const location = useLocation();
  const navigate = useNavigate();
  const { classes } = useStyles();
  const { loginService, authLoading, user } = useBoundStore((state) => state);
  const { setEmail, setPage } = useContext(RecoveryContext) as IRecoveryContext;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const from: string = (location.state?.from.pathname as string) || "/profile";

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [navigate, user]);

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
      terms: true,
    },
    validate: {
      email: isEmail("Invalid email"),
      password: hasLength(
        { min: 8, max: 20 },
        "Name must be 8-20 characters long"
      ),
    },
  });

  const onLogin = (values: Ivalues) => {
    if (!values.email || !values.password) return;
    loginService(values.email, values.password);
    setEmail(values.email);
  };

  return (
    <Paper radius="md" p="lg" className={classes.wrapper} mt={30}>
      <Flex justify="space-between">
        <Title
          ml={15}
          sx={(theme) => ({
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            fontFamily: `Greycliff CF, ${theme.fontFamily}`,
            fontWeight: 700,
          })}
        >
          Welcome back!
        </Title>
        <Button
          variant="subtle"
          color="red"
          size="xs"
          onClick={() => navigate("/")}
        >
          <TbX size={20} />
        </Button>
      </Flex>
      <Stack align="center" mt={20}>
        <Anchor component="button" type="button" color="dimmed" size="xs">
          "Don't have an account?{" "}
          <NavLink to={"/signup"}>Create account</NavLink>"
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
          <Text ml="sm">Login with Google</Text>
        </Button>
      </Stack>

      <Divider label="Or continue with email" labelPosition="center" my="lg" />

      <Paper shadow="md" p={30} mt={20} radius="md">
        <Form onSubmit={form.onSubmit((values) => onLogin(values))} replace>
          <TextInput
            label="Email"
            placeholder="you@email.com"
            required
            data-autofocus
            {...form.getInputProps("email")}
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            required
            {...form.getInputProps("password")}
          />
          <Group position="apart" mt="lg">
            <Checkbox label="Remember me" />
            <Anchor component="button" size="xs" onClick={() => setPage("otp")}>
              Forgot password?
            </Anchor>
          </Group>
          <Button
            fullWidth
            type="submit"
            variant="subtle"
            color="indigo"
            mt="xl"
            size="sm"
            value="one"
          >
            Sign in
          </Button>
          {authLoading ? <Loader color="teal" variant="dots" /> : null}
        </Form>
      </Paper>
    </Paper>
  );
}
