import { Suspense, useEffect, useState } from "react";
import { ArticleCardImage } from "../../components/misc/ArticleCardImage";
import { SimpleGrid, Container } from "@mantine/core";
import { useLoaderData, Await, useRevalidator } from "react-router-dom";
import { Loader } from "@mantine/core";

const PostPage = () => {
  const [changes, setChanges] = useState(false);

  const dataPromise = useLoaderData();
  const revalidator = useRevalidator();

  useEffect(() => {
    revalidator.revalidate();
  }, [changes, revalidator]);
  return (
    <Container>
      <SimpleGrid cols={3}>
        <Suspense fallback={<Loader color="teal" variant="dots" />}>
          <Await resolve={dataPromise.posts}>
            {(posts) =>
              posts.data.map((post) => (
                <div key={post.id}>
                  <ArticleCardImage
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
