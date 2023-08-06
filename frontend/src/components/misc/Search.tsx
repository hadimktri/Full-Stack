import { TextInput, ActionIcon } from "@mantine/core";
import { IconSearch, IconArrowRight } from "@tabler/icons-react";
import { useContext } from "react";
import { SearchContext } from "../../App";
import { ISearchContext } from "../../types/types";



export default function Search() {
  const { searchValue, setSearchValue } = useContext(
    SearchContext
  ) as ISearchContext;

  return (
    <TextInput
      icon={<IconSearch size="1.1rem" stroke={1.5} />}
      radius="sm"
      size="xs"
      rightSection={
        <ActionIcon size={32} radius="sm">
          <IconArrowRight size="1.1rem" stroke={1.5} />
        </ActionIcon>
      }
      placeholder="Search the title"
      rightSectionWidth={42}
      onChange={(e) => setSearchValue(e.target.value)}
      value={searchValue}
    />
  );
}
