import {
  ActionIcon,
  Group,
  Text,
  createStyles,
  useMantineColorScheme,
} from "@mantine/core";
import { IconSun, IconMoonStars } from "@tabler/icons-react";
const useStyles = createStyles(() => ({
  link: {
    "&:hover": {
      cursor: "pointer",
    },
  },
}));

export default function LightDark({ IconSize }: { IconSize: string | number }) {
  const { classes } = useStyles();
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";
  return (
    <Group onClick={() => toggleColorScheme()} className={classes.link}>
      <ActionIcon
        variant="outline"
        color={dark ? "yellow" : "blue"}
        title="Toggle color scheme"
        size={IconSize}
      >
        {dark ? <IconSun size={18} /> : <IconMoonStars size={15} />}
      </ActionIcon>
      <Text>{dark ? "Light Mode" : "Dark Mode"}</Text>
    </Group>
  );
}
