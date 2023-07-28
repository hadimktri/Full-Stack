import {
  Button,
  TextInput,
  PasswordInput,
  Container,
  createStyles,
  rem,
  ActionIcon,
  Flex,
} from "@mantine/core";
import { hasLength, useForm } from "@mantine/form";
import useBoundStore from "../../store/Store";
import { useContext } from "react";
import { IContext, RecoveryContext } from "../../pages/Auth/Login.page";
import { TbX } from "react-icons/tb";
interface Ivalues {
  password: string;
  confirmPassword?: string;
}

const useStyles = createStyles((theme) => ({
  container: {
    padding: rem(20),
    border: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
  },

  button: {
    background: "none",
    padding: 0,
    color: theme.colors.cyan[5],
    "&:hover": {
      textDecoration: "none",
      background: "none",
    },
  },
}));

export default function PasswordReset() {
  const { classes } = useStyles();
  const { updatePassword } = useBoundStore((state) => state);
  const { email, page, setPage } = useContext(RecoveryContext) as IContext;
  const form = useForm({
    validate: {
      password: hasLength(
        { min: 8, max: 20 },
        "Password must be 8-20 characters long"
      ),
      confirmPassword: (value: string | unknown, values: Ivalues) =>
        value !== values.password ? "Passwords did not match" : false,
    },
  });

  const handleUpdatePassword = (values: Ivalues) => {
    if (
      !values.password ||
      !values.confirmPassword ||
      values.password !== values.confirmPassword
    )
      return;
    updatePassword(email, values.password);
    setPage("recovered");
  };
  console.log(page);
  return (
    <Container size="xs" className={classes.container}>
      <Flex justify="flex-end">
        <ActionIcon mb="md">
          <TbX size={20} onClick={() => setPage("login")} />
        </ActionIcon>
      </Flex>

      <form
        onSubmit={form.onSubmit((values) =>
          handleUpdatePassword(values as Ivalues)
        )}
      >
        <PasswordInput
          label="Password"
          placeholder="Your password"
          required
          data-autofocus
          mt="md"
          {...form.getInputProps("password")}
        />
        <TextInput
          label="Confirm password"
          placeholder="Your password"
          required
          {...form.getInputProps("confirmPassword")}
          mt="xl"
        />
        {page == "reset" && (
          <Button fullWidth mt="xl" type="submit" variant="outline">
            Submit
          </Button>
        )}
      </form>
    </Container>
  );
}
