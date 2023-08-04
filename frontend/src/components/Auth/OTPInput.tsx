import {
  ActionIcon,
  createStyles,
  rem,
  Group,
  PinInput,
  TextInput,
  Flex,
  Paper,
  Text,
  Button,
} from "@mantine/core";
import { IconArrowRight } from "@tabler/icons-react";
import useBoundStore from "../../store/Store";
import { useContext, useState } from "react";
import { RecoveryContext } from "../../pages/Auth/Login.page";
import { TbX } from "react-icons/tb";
import { IRecoveryContext } from "../../types/types";
import { isEmail, useForm } from "@mantine/form";
interface Ivalues {
  email: string;
  terms: boolean;
}
const useStyles = createStyles((theme) => ({
  wrapper: {
    width: "45%",
    height: "400px",
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

export default function OTPInput() {
  const { classes, theme } = useStyles();

  const { setEmail, setPage, email } = useContext(
    RecoveryContext
  ) as IRecoveryContext;
  const { emailRecoveryNumber } = useBoundStore((state) => state);

  const [OTPinput, setOTPinput] = useState(0);
  const [randomOTP, setRandomOTP] = useState(0);

  const form = useForm({
    initialValues: {
      email: email,
      terms: false,
    },
    validate: {
      email: isEmail("Invalid email"),
    },
  });

  const handleToReset = ({ email }: Ivalues) => {
    const freshOTP = Math.floor(Math.random() * 9000 + 100000);

    if (!email && !OTPinput) return;

    if (email && !OTPinput) {
      setRandomOTP(freshOTP);
      emailRecoveryNumber(email, freshOTP);
    }

    if (email && OTPinput && OTPinput == randomOTP) {
      setEmail(email);
      setPage("reset");
    }
  };

  return (
    <Paper radius="md" withBorder p="lg" className={classes.wrapper} mt={40}>
      <Flex justify="flex-end">
        <Button
          variant="subtle"
          color="red"
          size="xs"
          onClick={() => setPage("auth")}
        >
          <TbX size={20} />
        </Button>
      </Flex>
      <Text mt={40}>
        First enter your recovery email and submit. Then enter 4 digit code from
        your email submit again.
      </Text>
      <Paper
        withBorder
        shadow="md"
        p={15}
        mt={30}
        radius="md"
        className={classes.inner}
      >
        <form onSubmit={form.onSubmit((values) => handleToReset(values))}>
          <TextInput
            required
            label="Email"
            radius="sm"
            size="md"
            rightSection={
              <ActionIcon
                content="button"
                type="submit"
                size={35}
                radius="sm"
                color={theme.primaryColor}
              >
                <IconArrowRight size="1.5rem" stroke={1.5} />
              </ActionIcon>
            }
            placeholder="Please enter your email"
            rightSectionWidth={42}
            {...form.getInputProps("email")}
          />
        </form>
        <Group position="center" my={20}>
          <PinInput
            length={6}
            type="number"
            onChange={(value) => setOTPinput(+value)}
          />
        </Group>
      </Paper>
    </Paper>
  );
}
