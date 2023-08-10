/* eslint-disable react-hooks/exhaustive-deps */
import {
  TextInput,
  createStyles,
  Group,
  Loader,
  ActionIcon,
  SimpleGrid,
} from "@mantine/core";
import { Await, useLoaderData } from "react-router-dom";
import { Suspense, useEffect, useState } from "react";
import { IPost } from "../../types/types";
import SinglePost from "../../components/Posts/SinglePostCard";
import Paginate from "../../components/Posts/Pagination";
import { IconSearch, IconArrowRight } from "@tabler/icons-react";
import { useViewportSize } from "@mantine/hooks";
interface IPromise {
  data: Promise<IPost[]>;
}
interface Idata {
  data: { posts: IPost[] };
}

const useStyles = createStyles((theme) => ({
  main: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    [theme.fn.smallerThan("xs")]: {
      flexDirection: "column",
    },
  },
  cards: {
    flex: 1,
  },
}));

const PostPage = () => {
  const { classes } = useStyles();
  const loader = useLoaderData();
  const { width } = useViewportSize();
  const [searchValue, setSearchValue] = useState("");
  const [initialData, setInitialData] = useState<IPost[]>([]);
  const [pageCount, setPageCount] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [cardNumber, setCardNumber] = useState(1);
  const [tableData, setTableData] = useState<IPost[] | void>([]);

  function RenderPostsElements(data: Idata) {
    function handleTableData(currentPage: number, pageNumber: number) {
      setTableData(
        initialData.slice(
          currentPage * pageNumber - pageNumber,
          currentPage * pageNumber
        )
      );
    }

    useEffect(() => {
      setInitialData(
        data.data.posts.filter((post) => post.title.includes(searchValue))
      );
    }, [searchValue]);

    useEffect(() => {
      setPageCount(Math.ceil(initialData.length / cardNumber));

      if (width < 600) {
        setCardNumber(1);
        setTableData(initialData);
      } else if (width > 1000) {
        setCardNumber(3);
        handleTableData(currentPage, 3);
      } else if (600 < width && width < 1000) {
        setCardNumber(2);
        handleTableData(currentPage, 2);
      }
    }, [initialData, width]);

    return (
      <Group className={classes.main}>
        <TextInput
          mt={10}
          maw={280}
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
        <Group className={classes.cards}>
          <SimpleGrid cols={cardNumber}>
            {tableData?.map((post) => (
              <div key={post.id}>
                <SinglePost key={post.title} {...post} />
              </div>
            ))}
          </SimpleGrid>
        </Group>
        {cardNumber !== 1 && (
          <Paginate
            pageCount={pageCount}
            page={currentPage}
            setPage={setCurrentPage}
            handlePage={(page) => handleTableData(page, cardNumber)}
          />
        )}
      </Group>
    );
  }

  return (
    <Suspense fallback={<Loader color="teal" variant="dots" />}>
      <Await resolve={(loader as IPromise).data}>{RenderPostsElements}</Await>
    </Suspense>
  );
};

export default PostPage;
