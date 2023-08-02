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
  em,
} from "@mantine/core";
import { IconHeart } from "@tabler/icons-react";
import useBoundStore from "../../store/Store";
import { IPost } from "../../types/types";
import { useEffect, useState } from "react";
import CommentModal from "./CommentModal";
import {
  TbArrowBadgeDown,
  TbArrowBadgeUp,
  TbEdit,
  TbHeartFilled,
} from "react-icons/tb";
import { Link, useNavigate } from "react-router-dom";

const useStyles = createStyles((theme) => ({
  card: {
    display: "flex",
    flexDirection: "column",
    height: "550px",
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    [`@media (max-width: ${em(550)})`]: {
      maxWidth:"500px",
      minWidth: "500px",
      height: "auto",
    },
  },
  footer: {
    padding: `${theme.spacing.xs} ${theme.spacing.lg}`,
    marginTop: theme.spacing.md,
    borderTop: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
  },
  content: {
    overflow: "hidden",
    minHeight: "100px",
    flex: 1,
  },
  category: {
    width: "40%",
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
}: IPost) {
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
    <Card withBorder padding="xs" radius="md" className={classes.card}>
      <Card.Section mb="sm">
        <Image src={image} alt={title} height={250} />
      </Card.Section>
      <Text fw={700} my="xs">
        {title}
      </Text>
      <Badge my="xs" className={classes.category}>
        {category}
      </Badge>
      <Text className={classes.content} color={theme.colors.gray[6]} size="sm">
        {content}
      </Text>
      <Group mt="md" spacing={10}>
        <Avatar size={20} src={author?.profilePicture} radius="xl" />
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
