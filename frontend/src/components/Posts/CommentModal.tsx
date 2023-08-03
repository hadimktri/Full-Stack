import { useDisclosure } from "@mantine/hooks";
import { Modal, Textarea, ActionIcon, Divider, Paper } from "@mantine/core";
import useBoundStore from "../../store/Store";
import { TbCheck, TbMessage } from "react-icons/tb";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CommentStack from "./CommentStack";
import { IComment } from "../../types/types";

interface IProps {
  postId: string;
  comments: IComment[];
}

const CommentModal = ({ postId, comments }: IProps) => {
  const navigate = useNavigate();
  const [opened, { open, close }] = useDisclosure(false);
  const [value, setValue] = useState("");
  const { user, postComment } = useBoundStore((state) => state);

  const handleValue = (value: string) => {
    setValue(value);
  };

  const handleComment = () => {
    postComment({
      content: value,
      authorId: user?.id as string,
      postId: postId,
    });
  };

  return (
    <>
      <Modal
        zIndex={1000}
        opened={opened}
        onClose={close}
        title={
          <ActionIcon>
            <TbCheck size={20} onClick={() => handleComment()} />
          </ActionIcon>
        }
      >
        <Paper radius="md" p="xl">
          <Textarea
            data-autofocus
            label=""
            placeholder="Commens"
            minRows={4}
            value={value}
            onChange={(e) => handleValue(e.target.value)}
          />
          <Divider label="Drag Your Comments" labelPosition="center" my={15} />
          <CommentStack comments={comments} />
        </Paper>
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
