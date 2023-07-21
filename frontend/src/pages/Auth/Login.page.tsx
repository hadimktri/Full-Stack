import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
  createStyles,
} from "@mantine/core";
import { useForm, isEmail, hasLength } from "@mantine/form";
import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useBoundStore from "../../store/Store";
import { FcGoogle } from "react-icons/fc";

import { getGoogleUrl } from "../../utils/getGoogleUrl";
const useStyles = createStyles(() => ({
  button: {
    display: "flex",
    color: "lightgray",
    borderBottom: "2px solid gray",
    paddingBottom: "5px",
    paddingTop: "5px",
    marginTop: "20px",
    backgroundColor: "transparent",
  },
  signUp: {
    display: "flex",
    justifyContent: "center",
    color: "lightgray",
    gap: "5px",
    paddingTop: "20px",
  },
}));

interface Ivalues {
  email: string;
  password: string;
  terms: boolean;
}
export default function LoginPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { loginService, authLoading, user } = useBoundStore((state) => state);

  const from = (location.state?.from.pathname as string) || "/profile";

  // firt of all checks if there is any user already in the system redirects to /posts
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
      terms: true,
    },
    // cheks the validity of entry in the useForm hook
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
  };

  const { classes } = useStyles();
  return (
    <Container size={420} my={40}>
      <Title
        align="center"
        mr={15}
        sx={(theme) => ({
          // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
          fontFamily: `Greycliff CF, ${theme.fontFamily}`,
          fontWeight: 900,
        })}
      >
        Welcome back!
      </Title>
      <Text className={classes.signUp}>
        <Text>Do not have an account yet?</Text>
        <Link to={"/signup"}>Create account</Link>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={20} radius="md">
        <form onSubmit={form.onSubmit((values) => onLogin(values))}>
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
            mt="md"
            {...form.getInputProps("password")}
          />
          <Group position="apart" mt="lg">
            <Checkbox label="Remember me" />
            <Anchor component="button" size="sm">
              Forgot password?
            </Anchor>
          </Group>
          <Button fullWidth mt="xl" type="submit">
            Sign in
          </Button>
          <Anchor href={getGoogleUrl(from)} className={classes.button}>
            <FcGoogle size={25} />
            <Text ml="sm">or Login with Google</Text>
          </Anchor>
          {authLoading ? <h2>Loading...</h2> : null}
        </form>
      </Paper>
    </Container>
  );
}
