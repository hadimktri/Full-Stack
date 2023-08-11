/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import Paginate from "./Pagination";
import SinglePost from "./SinglePostCard";
import {
  ActionIcon,
  Button,
  Group,
  SimpleGrid,
  TextInput,
  createStyles,
} from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import { Link, useRevalidator, useSearchParams } from "react-router-dom";
import { IconSearch, IconArrowRight } from "@tabler/icons-react";
import { IPost } from "../../types/types";

const useStyles = createStyles((theme) => ({
  main: {
    display: "flex",
    justifyContent: "center",
    [theme.fn.smallerThan("xs")]: {
      flexDirection: "column",
    },
  },
}));

export default function PostsCard({ postArray }: { postArray: IPost[] }) {
  const [filteredData, setFilteredData] = useState<IPost[]>([]);
  const [tableData, setTableData] = useState<IPost[] | void>([]);
  const [pageCount, setPageCount] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [cardNumber, setCardNumber] = useState(3);
  const { width } = useViewportSize();
  const [searchValue, setSearchValue] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  function handlefilter(data: IPost[]) {
    const categorizedData = searchParams.get("category")
      ? data.filter(
          (post) =>
            post.category === searchParams.get("category")?.toLowerCase()
        )
      : data;

    const searchedData = categorizedData.filter((post) =>
      post.title.includes(searchValue)
    );
    setFilteredData(searchedData);
  }

  const handleTableData = (currentPage: number, pageNumber: number) => {
    setTableData(
      filteredData.slice(
        currentPage * pageNumber - pageNumber,
        currentPage * pageNumber
      )
    );
  };

  useEffect(() => {
    handlefilter(postArray);
  }, [searchValue, searchParams]);

  useEffect(() => {
    setPageCount(Math.ceil(filteredData.length / cardNumber));

    if (width < 600) {
      setCardNumber(1);
      setTableData(filteredData);
    } else if (width > 1200) {
      setCardNumber(3);
      handleTableData(currentPage, 3);
    } else if (600 < width && width < 1200) {
      setCardNumber(2);
      handleTableData(currentPage, 2);
    }
  }, [cardNumber, currentPage, width, searchValue, searchParams]);

  function genNewSearchParamString(key: string, value: string | null) {
    const sp = new URLSearchParams(searchParams);
    if (value === null) {
      sp.delete("");
    } else {
      sp.set(key, value);
    }
    return `posts?${sp.toString()}`;
  }

  function handleFilterChange(key: string, value: string | null) {
    setSearchParams((prevParams) => {
      if (value === null) {
        prevParams.delete(key);
      } else {
        prevParams.set(key, value);
      }
      return prevParams;
    });
  }
  const categoryFilter = searchParams.get("category");
  const { classes } = useStyles();

  const revalidator = useRevalidator();
  function reload() {
    setInterval(() => {
      revalidator.revalidate();
      console.log("reload");
    }, 1000);
  }

  useEffect(() => {
    reload();
  }, []);

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
      <Link to="posts?category=nature">filter</Link>
      <Link to="/">clear</Link>
      <Link to={genNewSearchParamString("category", "nature")}>
        filter with URL append
      </Link>
      <Link to={genNewSearchParamString("category", null)}>clear</Link>
      <Button onClick={() => setSearchParams({ category: "nature" })}>
        filter
      </Button>
      <Button onClick={() => setSearchParams({})}>clear button filter</Button>
      <Button onClick={() => handleFilterChange("category", "nature")}>
        filter with url append
      </Button>
      {categoryFilter && (
        <Button onClick={() => handleFilterChange("category", null)}>
          filter
        </Button>
      )}

      <>
        <SimpleGrid cols={cardNumber}>
          {tableData?.map((post) => (
            <div key={post.id}>
              <SinglePost key={post.title} {...post} />
            </div>
          ))}
        </SimpleGrid>
        {/* {cardNumber !== 1 ? (
          <Paginate
            pageCount={pageCount}
            page={currentPage}
            setPage={setCurrentPage}
            handlePage={(page) => handleTableData(page, cardNumber)}
          />
        ) : (
          ""
        )} */}
      </>
    </Group>
  );
}
// ) : (
//      tableData?.map((post) => (
//         <div key={post.id}>
//          <SinglePost key={post.title} {...post} />
//         </div>
//       ))
//      )}
