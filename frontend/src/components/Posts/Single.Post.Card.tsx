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
import { Link, useNavigate } from "react-router-dom";

interface IProps {
  id: string;
  title: string;
  content: string;
  category: string;
  image: string;
  favoratedBy: IUser[];
  likes: number;
  author: IUser;
  authorId: string;
  comments: IComment[];
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
  authorId,
  comments,
  content,
}: IProps) {
  const navigate = useNavigate();
  const { classes, theme } = useStyles();
  const { user, userFavorate, postlikes } = useBoundStore((state) => state);
  const [faved, setFaved] = useState<boolean>(false);
  useEffect(() => {
    setFaved(
      favoratedBy.map((favUser) => favUser.id).includes(user?.id as string)
    );
  }, [favoratedBy, user?.id]);

  const handleFavorate = () => {
    !user ? navigate("/login") : userFavorate(id, user?.id);
  };
  const handleLike = (id: string, flag: boolean) => {
    !user ? navigate("/login") : postlikes(id, flag);
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
                onClick={() => handleLike(id, true)}
              />
            </ActionIcon>
            <ActionIcon>
              <TbArrowBadgeDown
                size="1.5rem"
                color={theme.colors.blue[3]}
                onClick={() => handleLike(id, false)}
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
            {authorId === user?.id && (
              <ActionIcon>
                <Link to={!user ? "/login" : id}>
                  <TbEdit size="1.2rem" color={theme.colors.yellow[6]} />
                </Link>
              </ActionIcon>
            )}

            <CommentModal postId={id} comments={comments} />
          </Group>
        </Group>
      </Card.Section>
    </Card>
  );
}
