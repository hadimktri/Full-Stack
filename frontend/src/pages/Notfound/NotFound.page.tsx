import { NavLink, useRouteError } from "react-router-dom";
import {
  createStyles,
  em,
  Paper,
  Image,
  Title,
  Text,
  Flex,
  Stack,
  Group,
} from "@mantine/core";
const useStyles = createStyles((theme) => ({
  inner: {
    width: "60%",
    height: "auto",
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.gray[3]
        : theme.colors.gray[1],
    [theme.fn.smallerThan("xs")]: {
      padding: 0,
      margin: 0,
    },
    [`@media (max-width: ${em(800)})`]: {
      width: "100%",
    },
  },
  link: {
    maxWidth: "170px",
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
    fontSize: theme.fontSizes.sm,
    color: theme.colorScheme === "dark" ? "#180e42" : theme.colors.gray[9],
    padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
    borderRadius: theme.radius.sm,
    fontWeight: 600,
    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[5]
          : theme.colors.gray[1],
      color: theme.colorScheme === "dark" ? theme.white : theme.black,
    },
  },
}));

export default function NotFound() {
  const error = useRouteError() as Error;
  const { classes } = useStyles();
  return (
    <Group position="center" p="xl" mt={20}>
      <Paper withBorder p={10} mx={10} className={classes.inner}>
        <Flex></Flex>
        <Title align="center" color="#180e42">
          Page not found
        </Title>
        <Stack m={20} className="backToHome">
          {error && (
            <Text color="#6b2d2d" fz={20} fw={700}>
              {error.message}
            </Text>
          )}
          <NavLink to="/" className={classes.link}>
            Go To The Home Page
          </NavLink>
        </Stack>
        <Image radius="xs" src="../src/assets/404.svg" />
      </Paper>
    </Group>
  );
}
