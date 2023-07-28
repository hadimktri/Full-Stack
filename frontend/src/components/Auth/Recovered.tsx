import {
  ActionIcon,
  Container,
  Flex,
  Text,
  createStyles,
  rem,
} from "@mantine/core";
import { useContext } from "react";
import { TbX } from "react-icons/tb";
import { IContext, RecoveryContext } from "../../pages/Auth/Login.page";
const useStyles = createStyles((theme) => ({
  container: {
    padding: rem(20),
    border: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
  },

  content: {
    background: "none",
    padding: 0,
    color: theme.colors.cyan[5],
    "&:hover": {
      textDecoration: "none",
      background: "none",
    },
  },
}));
const Recovered = () => {
  const { setPage } = useContext(RecoveryContext) as IContext;
  const { classes } = useStyles();
  return (
    <Container size="xs" className={classes.container}>
      <Flex justify="flex-end">
        <ActionIcon mb="md">
          <TbX size={20} onClick={() => setPage("login")} />
        </ActionIcon>
      </Flex>

      <Text className={classes.content}>
        Your password successfully recovered please close the page and log in
        again.
      </Text>
    </Container>
  );
};

export default Recovered;
