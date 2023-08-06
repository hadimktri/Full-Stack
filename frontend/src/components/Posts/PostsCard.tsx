import { useContext, useEffect, useState } from "react";
import { ISearchContext, IPost } from "../../types/types";
import Paginate from "./Pagination";
import SinglePost from "./Single.Post.Card";
import { Group, SimpleGrid, createStyles } from "@mantine/core";
import Search from "../misc/Search";
import { useViewportSize } from "@mantine/hooks";
import { SearchContext } from "../../App";

const useStyles = createStyles((theme) => ({
  main: {
    display: "flex",
    justifyContent: "center",
    [theme.fn.smallerThan("xs")]: {
      flexDirection: "column",
    },
  },
  search: {
    width: "280px",
    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },
}));

export default function PostsCard({ postArray }: { postArray: IPost[] }) {
  // const [initialData, setInitialData] = useState<IPost[]>(postArray);
  const [filteredData, setFilteredData] = useState<IPost[]>([]);
  const [tableData, setTableData] = useState<IPost[] | void>([]);
  const [pageCount, setPageCount] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [flag, setFlag] = useState(false);
  const [cardNumber, setCardNumber] = useState(3);
  const { width } = useViewportSize();
  const { searchValue, setSearchValue } = useContext(
    SearchContext
  ) as ISearchContext;

  const handleTableData = (currentPage: number, pageNumber: number) => {
    setTableData(
      filteredData.slice(
        currentPage * pageNumber - pageNumber,
        currentPage * pageNumber
      )
    );
    if (currentPage === pageCount) setFlag(true);
  };

  useEffect(() => {
    setFilteredData(
      postArray.filter((post) => post.title.includes(searchValue))
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setPageCount(Math.ceil(filteredData.length / cardNumber));

    if (width < 555) {
      setCardNumber(0);
      setTableData(filteredData);
    } else if (width > 1200) {
      setCardNumber(3);
      handleTableData(currentPage, 3);
    } else if (555 < width && width < 1200) {
      setCardNumber(2);
      handleTableData(currentPage, 2);
    }

    // if (flag && currentPage > pageCount) {
    //   setCurrentPage(pageCount);
    // }
    // if (currentPage > pageCount) {
    //   setCurrentPage(pageCount);
    //   setFlag(true);
    // }
    // if (flag && currentPage < pageCount) {
    //   setCurrentPage(pageCount);
    //   setFlag(false);
    // }
  }, [cardNumber, currentPage, filteredData, width]);

  const { classes } = useStyles();
  return (
    <Group className={classes.main}>
      <div className={classes.search}>
        <Search />
      </div>
      {cardNumber ? (
        <>
          <SimpleGrid cols={cardNumber}>
            {tableData?.map((post) => (
              <div key={post.id}>
                <SinglePost key={post.title} {...post} />
              </div>
            ))}
          </SimpleGrid>

          <Paginate
            pageCount={pageCount}
            page={currentPage}
            setPage={setCurrentPage}
            handlePage={(page) => handleTableData(page, cardNumber)}
          />
        </>
      ) : (
        tableData?.map((post) => (
          <div key={post.id}>
            <SinglePost key={post.title} {...post} />
          </div>
        ))
      )}
    </Group>
  );
}
