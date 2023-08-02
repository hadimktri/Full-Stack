/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Suspense } from "react";
import { Container } from "@mantine/core";
import { useLoaderData, Await } from "react-router-dom";
import { Loader } from "@mantine/core";
import { IPost } from "../../types/types";
import PostsCard from "../../components/Posts/PostsCard";

interface IPromise {
  diferedData: Promise<IPost>;
}
const PostPage = () => {
  const promise = useLoaderData();
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
      <Await resolve={(promise as IPromise).diferedData}>
        {(resolvedPromise) => {
          if (resolvedPromise.data.status === "success") {
            if (resolvedPromise.data.length === 0) {
              return <h5>Nothing to see here</h5>;
            } else {
              return (
                <PostsCard
                  postArray={resolvedPromise.data.data.posts as IPost[]}
                />
              );
            }
          }
        }}
      </Await>
    </Suspense>
  );
};

export default PostPage;
