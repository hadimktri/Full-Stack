import {
  createStyles,
  Anchor,
  Group,
  ActionIcon,
  rem,
  em,
} from "@mantine/core";
import {
  IconBrandTwitter,
  IconBrandYoutube,
  IconBrandInstagram,
} from "@tabler/icons-react";

const useStyles = createStyles((theme) => ({
  footer: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
    marginTop: rem(20),
    borderTop: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
    height: "60px",
  },

  inner: {
    width: "90%",
    display: "flex",
    justifyContent: "space-between",
    [`@media (max-width: ${em(550)})`]: {
      flexDirection: "column",
    },
    // [`@media (min-width: ${em(1200)})`]: {
    //   backgroundColor: theme.colors.orange[6],
    // },
  },

  links: {
    marginTop: theme.spacing.xs,
    marginBottom: theme.spacing.xs,

    [`@media (max-width: ${em(550)})`]: {
      marginTop: theme.spacing.xs,
      marginBottom: theme.spacing.xs,
    },
  },
}));

interface FooterCenteredProps {
  link: string;
  label: string;
}

const links: FooterCenteredProps[] = [
  {
    link: "#",
    label: "Contact",
  },
  {
    link: "#",
    label: "Blog",
  },
];

export default function Footer() {
  const { classes } = useStyles();
  const items = links.map((link) => (
    <Anchor<"a">
      color="dimmed"
      key={link.label}
      href={link.link}
      sx={{ lineHeight: 1 }}
      onClick={(event) => event.preventDefault()}
      size="sm"
    >
      {link.label}
    </Anchor>
  ));

  return (
    <Group className={classes.footer}>
      <Group className={classes.inner}>
        <Group className={classes.links}>{items}</Group>
        <Group className={classes.links} spacing="xs" position="right" noWrap>
          <ActionIcon size="lg" variant="default" radius="xl">
            <IconBrandTwitter size="1.05rem" stroke={1.5} />
          </ActionIcon>
          <ActionIcon size="lg" variant="default" radius="xl">
            <IconBrandYoutube size="1.05rem" stroke={1.5} />
          </ActionIcon>
          <ActionIcon size="lg" variant="default" radius="xl">
            <IconBrandInstagram size="1.05rem" stroke={1.5} />
          </ActionIcon>
        </Group>
      </Group>
    </Group>
  );
}
