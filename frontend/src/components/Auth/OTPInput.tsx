import {
  ActionIcon,
  createStyles,
  rem,
  Group,
  PinInput,
  TextInput,
  Container,
  Flex,
} from "@mantine/core";
import { IconArrowRight } from "@tabler/icons-react";
import useBoundStore from "../../store/Store";
import { useContext, useState } from "react";
import { RecoveryContext } from "../../pages/Auth/Login.page";
import { TbX } from "react-icons/tb";
import { IRecoveryContext } from "../../types/types";

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
  close: {},
}));

const OTPInput = () => {
  const { classes, theme } = useStyles();

  const { setEmail, setPage, email } = useContext(
    RecoveryContext
  ) as IRecoveryContext;
  const { emailRecoveryNumber } = useBoundStore((state) => state);

  const [inputEmail, setInputEmail] = useState(email);
  const [OTPinput, setOTPinput] = useState(0);
  const [randomOTP, setRandomOTP] = useState(0);

  const handleToReset = () => {
    const freshOTP = Math.floor(Math.random() * 9000 + 100000);

    if (!inputEmail && !OTPinput) return;

    if (inputEmail && !OTPinput) {
      setRandomOTP(freshOTP);
      emailRecoveryNumber(inputEmail, freshOTP);
    }

    if (inputEmail && OTPinput && OTPinput == randomOTP) {
      setEmail(inputEmail);
      setPage("reset");
      console.log("OTP===randomOTP");
    }
  };

  return (
    <Container size="xs" className={classes.container}>
      <Flex justify="flex-end">
        <ActionIcon mb="md">
          <TbX size={20} onClick={() => setPage("login")} />
        </ActionIcon>
      </Flex>

      <TextInput
        required
        value={inputEmail}
        onChange={(e) => setInputEmail(e.target.value)}
        label="Email"
        radius="sm"
        size="md"
        rightSection={
          <ActionIcon
            size={35}
            radius="sm"
            color={theme.primaryColor}
            onClick={handleToReset}
          >
            <IconArrowRight size="1.5rem" stroke={1.5} />
          </ActionIcon>
        }
        placeholder="Please enter your email"
        rightSectionWidth={42}
      />
      <Group position="center" my={20}>
        <PinInput
          length={6}
          type="number"
          onChange={(value) => setOTPinput(+value)}
        />
      </Group>
      <p>
        First enter your recovery email and submit. Then enter 4 digit code from
        your email submit again.
      </p>
    </Container>
  );
};

export default OTPInput;
