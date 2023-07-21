import { useDisclosure } from "@mantine/hooks";
import { Modal, Group, Button, Textarea } from "@mantine/core";
import useBoundStore from "../../store/Store";
import { TbCheck, TbMessage } from "react-icons/tb";
import { useState } from "react";

const CommentModal = ({ postId }: any) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [value, setValue] = useState("");
  const { user, postComment } = useBoundStore((state) => state);

  const handleValue = (value: string) => {
    setValue(value);
  };

  const handleComment = () => {
    postComment(postId as string, {
      userId: user?.id as string,
      content: value,
    });
    close();
  };
  return (
    <>
      <Modal opened={opened} onClose={close} title="Comment">
        <Textarea
          data-autofocus
          label=""
          placeholder="It has data-autofocus attribute"
          my="xs"
          minRows={5}
          value={value}
          onChange={(e) => handleValue(e.target.value)}
        />

        <Button onClick={handleComment} variant="white" color="dark">
          <TbCheck size={30} />
        </Button>
      </Modal>

      <Group position="center">
        <Button onClick={open}>
          <TbMessage size={30} />
        </Button>
      </Group>
    </>
  );
};

export default CommentModal;
