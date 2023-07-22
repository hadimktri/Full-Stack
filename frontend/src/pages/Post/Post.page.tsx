import { Suspense, useEffect, useState } from "react";
import { SimpleGrid, Container } from "@mantine/core";
import { useLoaderData, Await, useRevalidator } from "react-router-dom";
import { Loader } from "@mantine/core";
import SinglePost from "../../components/misc/Single.Post";
import { IPost } from "../../types/types";

interface IPromise {
  posts: Promise<IPost>;
}
const PostPage = () => {
  const [changes, setChanges] = useState(false);
  const dataPromise = useLoaderData();
  const revalidator = useRevalidator();

  useEffect(() => {
    revalidator.revalidate();
  }, [changes]);

  return (
    <Container>
      <SimpleGrid cols={3}>
        <Suspense fallback={<Loader color="teal" variant="dots" />}>
          <Await resolve={(dataPromise as IPromise).posts}>
            {(posts) =>
              // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
              (posts.data as IPost[]).map((post) => (
                <div key={post.id}>
                  <SinglePost
                    key={post.title}
                    {...post}
                    setChanges={setChanges}
                    changes={changes}
                                      />
                </div>
              ))
            }
          </Await>
        </Suspense>
      </SimpleGrid>
    </Container>
  );
};

export default PostPage;
