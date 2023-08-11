/* eslint-disable react-hooks/exhaustive-deps */
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
import useBoundStore from "../../store/Store";
import { IPost } from "../../types/types";
import { useEffect, useState } from "react";

import {
  TbArrowBadgeDown,
  TbArrowBadgeUp,
  TbEdit,
  TbHeart,
  TbHeartFilled,
  TbMessage,
} from "react-icons/tb";
import { Link, NavLink, useNavigate } from "react-router-dom";

const useStyles = createStyles((theme) => ({
  card: {
    display: "flex",
    width: "290px",
    flexDirection: "column",
    height: "450px",
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
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
    height: "80px",
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
  favoritedBy,
  likes,
  author,
  authorId,
  comments,
  content,
}: IPost) {
  const navigate = useNavigate();
  const { classes, theme } = useStyles();

  const { user, userfavorite, postlikes } = useBoundStore((state) => state);
  const [favorited, setFavorited] = useState<boolean>(false);
  const [postLikes, setPostLikes] = useState<number>(0);

  useEffect(() => {
    setFavorited(
      favoritedBy.map((favUser) => favUser.id).includes(user?.id as string)
    );
    setPostLikes(likes);
  }, []);

  function handlefavorite() {
    if (!user) {
      navigate("/login");
    } else {
      userfavorite(id, user?.id);
      setFavorited(!favorited);
    }
  }

  function handleLike(id: string, flag: number) {
    if (!user) {
      navigate("/login");
    } else {
      setPostLikes(postLikes + flag);
      postlikes(id, postLikes + flag);
    }
  }

  return (
    <Card withBorder padding="xs" radius="md" className={classes.card}>
      <Card.Section mb="sm">
        <Link
          to={"detail"}
          state={{
            title,
            category,
            image,
            id,
            favoritedBy,
            likes,
            author,
            authorId,
            comments,
            content,
          }}
        >
          <Image src={image} alt={title} height={180} />
        </Link>
      </Card.Section>
      <Text fw={700} my="xs">
        {title}
      </Text>
      <Badge
        my="xs"
        className={classes.category}
        variant="gradient"
        gradient={{ from: "violet", to: "cyan", deg: 30 }}
      >
        {category}
      </Badge>
      <Text className={classes.content} color={theme.colors.gray[6]} size="sm">
        {content}
      </Text>
      <Group mt="md" ml={10} spacing={10}>
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
                onClick={() => handleLike(id, 1)}
              />
            </ActionIcon>
            <ActionIcon>
              <TbArrowBadgeDown
                size="1.5rem"
                color={theme.colors.blue[3]}
                onClick={() => handleLike(id, -1)}
              />
            </ActionIcon>
            <Text fz="sm" c="dimmed">
              {`${postLikes} liked`}
            </Text>
          </Group>
          <Group spacing={0}>
            <ActionIcon>
              {favorited ? (
                <TbHeartFilled
                  size="1.2rem"
                  color={theme.colors.red[6]}
                  stroke={1.5}
                  onClick={handlefavorite}
                />
              ) : (
                <TbHeart
                  size="1.2rem"
                  color={theme.colors.red[6]}
                  onClick={handlefavorite}
                />
              )}
            </ActionIcon>
            {authorId === user?.id && (
              <>
                <ActionIcon>
                  <NavLink to={!user ? "/login" : `${id}`}>
                    <TbEdit size="1.2rem" color={theme.colors.yellow[6]} />
                  </NavLink>
                </ActionIcon>
              </>
            )}
            <ActionIcon>
              <NavLink to={!user ? "/login" : `/postcomments/${id}`}>
                <TbMessage size={20} />
              </NavLink>
            </ActionIcon>
          </Group>
        </Group>
      </Card.Section>
    </Card>
  );
}
