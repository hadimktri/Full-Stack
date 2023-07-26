import { Suspense } from "react";
import { Container } from "@mantine/core";
import { useLoaderData, Await } from "react-router-dom";
import { Loader } from "@mantine/core";
import { IPost } from "../../types/types";
import PaginatePosts from "../../components/Posts/PaginatePosts";

interface IPromise {
  posts: Promise<IPost>;
}
const PostPage = () => {
  const dataPromise = useLoaderData();
  // const revalidator = useRevalidator();

  // useEffect(() => {
  //   setTimeout(() => {
  //     revalidator.revalidate();
  //     console.log("first");
  //   }, 1000);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [revalidator]);

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
            />
          );
        }}
      </Await>
    </Suspense>
  );
};

export default PostPage;
