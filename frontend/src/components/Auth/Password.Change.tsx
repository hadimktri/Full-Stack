import { useDisclosure } from "@mantine/hooks";
import { Modal, Group, Button, TextInput, PasswordInput } from "@mantine/core";
import { hasLength, useForm } from "@mantine/form";
import useBoundStore from "../../store/Store";
interface Ivalues {
  password: string;
  confirmPassword?: string;
}

export default function PasswordChange() {
  const [opened, { open, close }] = useDisclosure(false);
  const { user, updatePassword } = useBoundStore((state) => state);
  const form = useForm({
    validate: {
      password: hasLength(
        { min: 8, max: 20 },
        "Password must be 8-20 characters long"
      ),
      confirmPassword: (value: string | unknown, values: Ivalues) =>
        value !== values.password ? "Passwords did not match" : false,
    },
  });

  const handleUpdatePassword = (values: Ivalues) => {
    if (
      !values.password ||
      !values.confirmPassword ||
      values.password !== values.confirmPassword
    )
      return;
    updatePassword(user?.id as string, values.password);
  };
  return (
    <>
      <Modal opened={opened} onClose={close} title="Focus demo">
        <form
          onSubmit={form.onSubmit((values) =>
            handleUpdatePassword(values as Ivalues)
          )}
        >
          <PasswordInput
            label="Password"
            placeholder="Your password"
            required
            data-autofocus
            mt="md"
            {...form.getInputProps("password")}
          />
          <TextInput
            label="Confirm password"
            placeholder="Your password"
            required
            {...form.getInputProps("confirmPassword")}
          />
          <Button fullWidth mt="xl" type="submit">
           Submit
          </Button>
        </form>
      </Modal>

      <Group position="center">
        <Button onClick={open}>Open modal</Button>
      </Group>
    </>
  );
}
