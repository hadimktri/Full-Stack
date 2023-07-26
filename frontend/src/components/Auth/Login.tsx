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
  Loader,
} from "@mantine/core";
import { useForm, isEmail, hasLength } from "@mantine/form";
import { useContext, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useBoundStore from "../../store/Store";
import { FcGoogle } from "react-icons/fc";
import { getGoogleUrl } from "../../utils/getGoogleUrl";
import { IContext, RecoveryContext } from "../../pages/Auth/Login.page";
const useStyles = createStyles((theme) => ({
  button: {
    display: "flex",
    color: "lightgray",
    borderBottom: "1px solid gray",
    paddingBottom: "5px",
    paddingTop: "5px",
    paddingLeft: "15px",
    marginTop: "20px",
    backgroundColor: "transparent",
    borderRadius: "5px",
    "&:hover": {
      borderColor: theme.colors.violet[4],
      borderWidth: "1px",
      textDecoration: "none",
      border: `1px solid ${theme.colors.violet[4]}`,
      color: theme.colors.violet[2],
    },
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
export default function Login() {
  const location = useLocation();
  const navigate = useNavigate();
  const { loginService, authLoading, user } = useBoundStore((state) => state);
  const { setEmail, setPage } = useContext(RecoveryContext) as IContext;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const from: string = (location.state?.from.pathname as string) || "/profile";

  useEffect(() => {
    if (user) {
      navigate("/posts");
    }
  }, [navigate, user]);

  const form = useForm({
    initialValues: {
      email: "",
      name: "",
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
            <Anchor component="button" size="sm" onClick={() => setPage("otp")}>
              Forgot password?
            </Anchor>
          </Group>
          <Button
            fullWidth
            mt="xl"
            type="submit"
            color="violet"
            variant="outline"
            value="one"
          >
            Sign in
          </Button>
          <Anchor href={getGoogleUrl(from)} className={classes.button}>
            <FcGoogle size={25} />
            <Text ml="sm">Login with Google</Text>
          </Anchor>
          {authLoading ? <Loader color="teal" variant="dots" /> : null}
        </form>
      </Paper>
    </Container>
  );
}
