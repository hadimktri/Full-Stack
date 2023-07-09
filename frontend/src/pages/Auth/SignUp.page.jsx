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
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useBoundStore from "../../store/Store";

export default function SignUpPage() {
  const navigate = useNavigate();
  const { signUpService, authLoading, user } = useBoundStore((state) => state);
  // firt of all checks if there is any user already in the system redirects to /posts
  useEffect(() => {
    if (!!user) {
      navigate("/posts");
    }
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
      email: (val) => (/^\S+@\S+$/.test(val) ? null : "Invalid email"),
      password: (val) =>
        val.length <= 8
          ? "Password should include at least 8 characters"
          : null,
    },
  });

  //check the exsistance of both entry if no stops with return if yes fires the (loginService())
  const onSignUp = async (values) => {
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
          fontFamily: `Greycliff CF, ${theme.fontFamily}`,
          fontWeight: 900,
        })}
      >
        Sign Up!
      </Title>
      <Text color="dimmed" size="sm" align="center" mt={5}>
        have an account?
        <Anchor size="sm" component="button">
          Sign In
        </Anchor>
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
          <PasswordInput
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
