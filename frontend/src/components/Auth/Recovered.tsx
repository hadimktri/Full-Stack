import { Button, Flex, Paper, Text, createStyles, rem } from "@mantine/core";
import { useContext } from "react";
import { TbX } from "react-icons/tb";
import { RecoveryContext } from "../../pages/Auth/Login.page";
import { IRecoveryContext } from "../../types/types";
const useStyles = createStyles((theme) => ({
  wrapper: {
    width: "45%",
    height: "300px",
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
    height: "170px",
    [theme.fn.smallerThan("xs")]: {
      padding: theme.spacing.sm,
      margin: 0,
    },
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
  const { setPage } = useContext(RecoveryContext) as IRecoveryContext;
  const { classes } = useStyles();
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
      <Paper
        withBorder
        shadow="md"
        p={15}
        mt={30}
        radius="md"
        className={classes.inner}
      >
        <Text className={classes.content}>
          Your password successfully recovered please close the page and log in
          again.
        </Text>
      </Paper>
    </Paper>
  );
};

export default Recovered;
