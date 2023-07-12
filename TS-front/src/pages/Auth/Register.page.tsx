import {
  TextInput,
  PasswordInput,
  Paper,
  Title,
  Text,
  Container,
  Button,
} from "@mantine/core";
import {
  useForm,
  isNotEmpty,
  isEmail,
  isInRange,
  hasLength,
  matches,
} from "@mantine/form";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import useBoundStore from "../../store/Store";

interface Ivalues {
  email: string;
  password: string;
  name: string;
  confirmPassword?: any;
  terms: boolean;
}

export default function RegisterPage() {
  const navigate = useNavigate();
  const { signUpService, authLoading, user } = useBoundStore((state) => state);
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
      confirmPassword: (value: string, values: Ivalues) =>
        value !== values.password ? "Passwords did not match" : null,
    },
  });

  //check the exsistance of both entry if no stops with return if yes fires the (loginService())
  const onSignUp = (values: Ivalues) => {
    if (
      !values.email ||
      !values.password ||
      !values.name ||
      values.password !== values.confirmPassword
    )
      return;
    signUpService(values.name, values.email, values.password);
  };

  return (
    <Container size={420} my={40}>
      <Title
        align="center"
        sx={(theme) => ({
          // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
          fontFamily: `Greycliff CF, ${theme.fontFamily}`,
          fontWeight: 900,
        })}
      >
        Sign Up!
      </Title>
      <Text color="dimmed" size="sm" align="center" mt={5}>
        have an account?
        <Link to={"/login"}>Sign In</Link>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={form.onSubmit((values) => onSignUp(values))}>
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
            mt="md"
            {...form.getInputProps("password")}
          />
          <TextInput
            label="Confirm password"
            placeholder="Your password"
            required
            {...form.getInputProps("confirmPassword")}
          />
          <Button fullWidth mt="xl" type="submit">
            Sign Up
          </Button>
          {authLoading ? <h2>Loading...</h2> : null}
        </form>
      </Paper>
    </Container>
  );
}
