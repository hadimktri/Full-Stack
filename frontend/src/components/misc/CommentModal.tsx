import { useDisclosure } from "@mantine/hooks";
import {
  Modal,
  Text,
  Textarea,
  ActionIcon,
  createStyles,
  rem,
} from "@mantine/core";
import useBoundStore from "../../store/Store";
import { TbCheck, TbMessage } from "react-icons/tb";
import { useState } from "react";
import { IComment } from "../../types/types";

interface IProps {
  postId: string;
  comments: any;
  setChanges: (val: boolean) => void;
  changes: boolean;
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
const CommentModal = ({ postId, comments, setChanges, changes }: IProps) => {
  const { classes } = useStyles();
  const [opened, { open, close }] = useDisclosure(false);
  const [value, setValue] = useState("");
  const { user, postComment } = useBoundStore((state) => state);

  const handleValue = (value: string) => {
    setValue(value);
  };

  const handleComment = () => {
    postComment(postId, {
      userId: user?.id as string,
      content: value,
    });
    setChanges(!changes);
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
          <Text key={idx} fw={500} className={classes.title} m="sm">
            {comment?.content}
          </Text>
        ))}
      </Modal>
      <ActionIcon>
        <TbMessage size={20} onClick={open} />
      </ActionIcon>
    </>
  );
};

export default CommentModal;
