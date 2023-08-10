import {
  Button,
  TextInput,
  PasswordInput,
  createStyles,
  rem,
  Flex,
  Paper,
} from "@mantine/core";
import { hasLength, useForm } from "@mantine/form";
import useBoundStore from "../../store/Store";
import { useContext } from "react";
import { RecoveryContext } from "../../pages/Auth/Loginpage";
import { TbX } from "react-icons/tb";
import { IRecoveryContext } from "../../types/types";
interface Ivalues {
  password: string;
  confirmPassword?: string;
}

const useStyles = createStyles((theme) => ({
  wrapper: {
    width: "45%",
    height: "450px",
    alignItems: "center",
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.gray[9] : theme.white,
    border: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.colors.gray[3]
    }`,

    [theme.fn.smallerThan("xs")]: {
      flexDirection: "column",
      width: "100%",
      margin: 0,
      padding: theme.spacing.xs,
    },
  },
  inner: {
    [theme.fn.smallerThan("xs")]: {
      padding: theme.spacing.sm,
      margin: 0,
    },
  },
}));

export default function PasswordReset() {
  const { classes } = useStyles();
  const { updatePassword } = useBoundStore((state) => state);
  const { email, page, setPage } = useContext(
    RecoveryContext
  ) as IRecoveryContext;
  const form = useForm({
    initialValues: {
      password: "",
      confirmPassword: "",
      terms: true,
    },
    validate: {
      password: hasLength(
        { min: 8, max: 20 },
        "Password must be 8-20 characters long"
      ),
      confirmPassword: (value, values) =>
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

  return (
    <Paper radius="md" withBorder p="lg" className={classes.wrapper} mt={40}>
      <Flex justify="flex-end">
        <Button variant="subtle" color="red" size="xs">
          <TbX size={20} onClick={() => setPage("auth")} />
        </Button>
      </Flex>
      <Paper
        withBorder
        shadow="md"
        p={15}
        mt={30}
        radius="md"
        className={classes.inner}
      >
        <form
          onSubmit={form.onSubmit((values) => handleUpdatePassword(values))}
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
            <Button
              variant="subtle"
              color="indigo"
              mt="xl"
              size="xs"
              type="submit"
            >
              Submit
            </Button>
          )}
        </form>
      </Paper>
    </Paper>
  );
}
