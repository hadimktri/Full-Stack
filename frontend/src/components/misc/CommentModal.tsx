import { useDisclosure } from "@mantine/hooks";
import {
  Modal,
  Text,
  Textarea,
  ActionIcon,
  createStyles,
  rem,
  Group,
} from "@mantine/core";
import useBoundStore from "../../store/Store";
import { TbCheck, TbMessage, TbX } from "react-icons/tb";
import { useState } from "react";
import { IComment } from "../../types/types";
import { useNavigate } from "react-router-dom";

interface IProps {
  postId: string;
  comments: any;
}
const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
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
}));

const CommentModal = ({ postId, comments }: IProps) => {
  const navigate = useNavigate();
  const { classes } = useStyles();
  const [opened, { open, close }] = useDisclosure(false);
  const [value, setValue] = useState("");
  const { user, postComment, deleteComment } = useBoundStore((state) => state);

  const handleValue = (value: string) => {
    setValue(value);
  };

  const handleComment = () => {
    postComment(postId, {
      userId: user?.id as string,
      content: value,
    });
  };
  const handleDeleteComment = (id: string) => {
    deleteComment(id);
  };

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title={
          <ActionIcon>
            <TbCheck size={20} onClick={() => handleComment()} />
          </ActionIcon>
        }
      >
        <Textarea
          data-autofocus
          label=""
          placeholder="Commens"
          my="xs"
          minRows={5}
          value={value}
          onChange={(e) => handleValue(e.target.value)}
        />
        {(comments as []).map((comment: IComment, idx: number) => (
          <Group key={idx} position="apart" mx={10}>
            <Text fw={500} className={classes.title} m="sm">
              {comment?.content}
            </Text>
            <ActionIcon>
              <TbX size={15} onClick={() => handleDeleteComment(comment?.id)} />
            </ActionIcon>
          </Group>
        ))}
      </Modal>

      <ActionIcon>
        <TbMessage
          size={20}
          onClick={!user ? () => navigate("/login") : open}
        />
      </ActionIcon>
    </>
  );
};

export default CommentModal;
