import { useEffect, useState } from "react";
import { IPost } from "../../types/types";
import Paginate from "./Pagination";
import SinglePost from "./Single.Post";
import { Container, SimpleGrid } from "@mantine/core";

interface IProps {
  postArray: IPost[];
  setChanges: (val: boolean) => void;
  changes: boolean;
}

const PaginatePosts = ({ postArray, setChanges, changes }: IProps) => {
  const [initialData] = useState<IPost[]>(postArray);
  const [tableData, setTableData] = useState<IPost[]>([]);
  const [pageCount, setPageCount] = useState<number>(1);
  const [page, setPage] = useState(1);
  const handlePage = (page: number) => {
    setTableData(initialData.slice(page * 3 - 3, page * 3));
  };

  useEffect(() => {
    setPageCount(Math.ceil(initialData.length / 3));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postArray]);

  return (
    <Container>
      <SimpleGrid cols={3}>
        {tableData.map((post) => (
          <div key={post.id}>
            <SinglePost
              key={post.title}
              {...post}
              setChanges={setChanges}
              changes={changes}
            />
          </div>
        ))}
      </SimpleGrid>
      <Paginate
        handlePage={handlePage}
        pageCount={pageCount}
        page={page}
        setPage={setPage}
      />
    </Container>
  );
};

export default PaginatePosts;
