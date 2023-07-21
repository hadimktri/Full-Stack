import {
  createStyles,
  Paper,
  Text,
  Title,
  Button,
  rem,
  Avatar,
} from "@mantine/core";
import {
  TbArrowBadgeDownFilled,
  TbArrowBadgeUpFilled,
  TbHeartFilled,
} from "react-icons/tb";
import { Link } from "react-router-dom";
import useBoundStore from "../../store/Store";
import { IComment, IUser } from "../../types/types";
import { useEffect, useState } from "react";
import CommentModal from "./CommentModal";

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
  navUser: {
    borderRadius: "50%",
  },
}));
interface IProps {
  title: string;
  category: string;
  image: string;
  id: string;
  favoratedBy: IUser[];
  likes: number;
  author: IUser;
  comments: IComment;
  setChanges: (val: boolean) => void;
  changes: boolean;
}

export function ArticleCardImage({
  title,
  category,
  image,
  id,
  favoratedBy,
  likes,
  author,
  comments,
  setChanges,
  changes,
}: IProps) {
  const { user, userFavorate, postIncreaselikes, postDecreaselikes } =
    useBoundStore((state) => state);
  const { classes } = useStyles();
  const [faved, setFaved] = useState<boolean>(false);

  useEffect(() => {
    setFaved(
      favoratedBy.map((favUser) => favUser.id).includes(user?.id as string)
    );
  }, [favoratedBy, user?.id]);

  const handleFavorate = () => {
    userFavorate(id, user?.id as string);
    setChanges(!changes);
  };
  const handleLikeUp = () => {
    postIncreaselikes(id);
    setChanges(!changes);
  };
  const handleLikeDown = () => {
    setChanges(!changes);
    postDecreaselikes(id);
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
        <Text className={classes.category} size="sm">
          {faved ? "faved" : "not"}
        </Text>
        <Text className={classes.category} size="sm">
          {comments[2]?.content}
        </Text>
        <Text className={classes.category} size="sm">
          {likes}
        </Text>
      </div>

      <Button variant="white" color="dark">
        <Link to={id}>View</Link>
      </Button>
      <Button onClick={handleFavorate} variant="white" color="dark">
        <TbHeartFilled size={30} />
      </Button>
      <Button onClick={handleLikeUp} variant="white" color="dark">
        <TbArrowBadgeUpFilled size={30} />
      </Button>
      <Button onClick={handleLikeDown} variant="white" color="dark">
        <TbArrowBadgeDownFilled size={30} />
      </Button>
      <CommentModal postId={id} />
      <Avatar
        className={classes.navUser}
        src={author?.profilePicture}
        alt="it's me"
      />
    </Paper>
  );
}
