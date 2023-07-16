import { createStyles, Paper, Text, Title, Button, rem } from "@mantine/core";
import { Link } from "react-router-dom";
import { TbHeartFilled } from "react-icons/tb";
import useBoundStore from "../../store/Store";

const useStyles = createStyles((theme) => ({
  card: {
    height: rem(440),
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },

  title: {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    fontFamily: `Greycliff CF ${theme.fontFamily}`,
    fontWeight: 900,
    color: theme.white,
    lineHeight: 1.2,
    fontSize: rem(32),
    marginTop: theme.spacing.xs,
  },

  category: {
    color: theme.white,
    opacity: 0.7,
    fontWeight: 700,
    textTransform: "uppercase",
  },
}));
interface IProps {
  title: string;
  category: string;
  image: string;
  id: string;
}

export function ArticleCardImage({ title, category, image, id }: IProps) {
  const { userFavorate, user } = useBoundStore((state) => state);
  const { classes } = useStyles();

  const handleFavorate = () => {
    userFavorate(id, user?.id as string);
  };

  return (
    <Paper
      shadow="md"
      p="xl"
      radius="md"
      sx={{ backgroundImage: `url(${image})` }}
      className={classes.card}
    >
      <div>
        <Title order={3} className={classes.title}>
          {title}
        </Title>
        <Text className={classes.category} size="sm">
          {category}
        </Text>
      </div>
      <Button variant="white" color="dark">
        <Link to={id}>View</Link>
      </Button>
      <Button onClick={handleFavorate} variant="white" color="dark">
        <TbHeartFilled size={30} />
      </Button>
    </Paper>
  );
}
