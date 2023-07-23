import { Suspense, useEffect, useState } from "react";
import { Container } from "@mantine/core";
import { useLoaderData, Await, useRevalidator } from "react-router-dom";
import { Loader } from "@mantine/core";
import { IPost } from "../../types/types";
import PaginatePosts from "../../components/misc/PaginatePosts";

interface IPromise {
  posts: Promise<IPost>;
}
const PostPage = () => {
  const dataPromise = useLoaderData();
  const revalidator = useRevalidator();
  const [changes, setChanges] = useState(true);
  useEffect(() => {
    revalidator.revalidate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [changes]);

  return (
    <Suspense
      fallback={
        <Container>
          <Loader color="teal" variant="dots" />
        </Container>
      }
    >
      <Await resolve={(dataPromise as IPromise).posts}>
        {(resolvedData) => {
          return (
            <PaginatePosts
              // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
              postArray={resolvedData.data as IPost[]}
              setChanges={setChanges}
              changes={changes}
            />
          );
        }}
      </Await>
    </Suspense>
  );
};

export default PostPage;
