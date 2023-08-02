import { Pagination } from "@mantine/core";
import {
  IconArrowBarToLeft,
  IconArrowBarToRight,
  IconArrowLeft,
  IconArrowRight,
  IconGripHorizontal,
} from "@tabler/icons-react";
import { useEffect } from "react";
import { paginationProps } from "../../types/types";

const Paginate = ({
  handlePage,
  page,
  setPage,
  pageCount,
}: paginationProps) => {
  useEffect(() => {
    handlePage(page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  return (
    <Pagination
      value={page}
      onChange={setPage}
      total={pageCount}
      position="center"
      withEdges
      nextIcon={IconArrowRight}
      previousIcon={IconArrowLeft}
      firstIcon={IconArrowBarToLeft}
      lastIcon={IconArrowBarToRight}
      dotsIcon={IconGripHorizontal}
      size="sm"
    />
  );
};
export default Paginate;
