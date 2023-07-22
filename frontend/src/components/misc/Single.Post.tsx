import {
  createStyles,
  Card,
  Image,
  ActionIcon,
  Group,
  Text,
  Avatar,
  Badge,
  rem,
} from "@mantine/core";
import { IconHeart } from "@tabler/icons-react";
import useBoundStore from "../../store/Store";
import { IComment, IUser } from "../../types/types";
import { useEffect, useState } from "react";
import CommentModal from "./CommentModal";
import {
  TbArrowBadgeDown,
  TbArrowBadgeUp,
  TbEdit,
  TbHeartFilled,
} from "react-icons/tb";
import { Link } from "react-router-dom";

interface IProps {
  id: string;
  title: string;
  content: string;
  category: string;
  image: string;
  favoratedBy: IUser[];
  likes: number;
  author: IUser;
  comments: IComment[];
  setChanges: (val: boolean) => void;
  changes: boolean;
}

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    height: "450px",
  },

  title: {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },

  footer: {
    padding: `${theme.spacing.xs} ${theme.spacing.lg}`,
    marginTop: theme.spacing.md,
    borderTop: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
  },
  content: {
    overflow: "auto",
    height: "85px",
  },
}));

export default function SinglePost({
  title,
  category,
  image,
  id,
  favoratedBy,
  likes,
  author,
  comments,
  content,
  setChanges,
  changes,
}: IProps) {
  const { classes, theme } = useStyles();
  const { user, userFavorate, postIncreaselikes, postDecreaselikes } =
    useBoundStore((state) => state);
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
    <Card withBorder padding="lg" radius="md" className={classes.card}>
      <Card.Section mb="xs">
        <Image src={image} alt={title} height={180} />
      </Card.Section>
      <Text fw={700} className={classes.title}>
        {title}
      </Text>
      <Badge my="xs">{category}</Badge>
      <Text className={classes.content} color={theme.colors.gray[6]} size="sm">
        {content}
      </Text>
      <Group mt="md">
        <Avatar size="sm" src={author?.profilePicture} radius="xl" />
        <Text fz="xs" fw={400}>
          {author?.name}
        </Text>
      </Group>

      <Card.Section className={classes.footer}>
        <Group position="apart">
          <Group spacing={0}>
            <ActionIcon>
              <TbArrowBadgeUp
                size="1.5rem"
                color={theme.colors.blue[3]}
                onClick={handleLikeUp}
              />
            </ActionIcon>
            <ActionIcon>
              <TbArrowBadgeDown
                size="1.5rem"
                color={theme.colors.blue[3]}
                onClick={handleLikeDown}
              />
            </ActionIcon>
            <Text fz="sm" c="dimmed">
              {`${likes} liked`}
            </Text>
          </Group>
          <Group spacing={0}>
            <ActionIcon>
              {faved ? (
                <TbHeartFilled
                  size="1.2rem"
                  color={theme.colors.red[6]}
                  stroke={1.5}
                  onClick={handleFavorate}
                />
              ) : (
                <IconHeart
                  size="1.2rem"
                  color={theme.colors.red[6]}
                  stroke={1.5}
                  onClick={handleFavorate}
                />
              )}
            </ActionIcon>
            <ActionIcon>
              <Link to={id}>
                <TbEdit
                  size="1.2rem"
                  color={theme.colors.yellow[6]}
                  onClick={handleFavorate}
                />
              </Link>
            </ActionIcon>
            <CommentModal
              postId={id}
              comments={comments}
              setChanges={setChanges}
              changes={changes}
            />
          </Group>
        </Group>
      </Card.Section>
    </Card>
  );
}
