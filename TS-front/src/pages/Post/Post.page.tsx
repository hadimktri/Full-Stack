
import { Suspense } from "react";
import { ArticleCardImage } from "../../components/misc/ArticleCardImage";
import { SimpleGrid, Container } from "@mantine/core";
import { useLoaderData, Await } from "react-router-dom";
import { Loader } from "@mantine/core";

const PostPage = () => {
  const dataPromise = useLoaderData();
  return (
    <Container>
      <SimpleGrid cols={3}>
        <Suspense fallback={<Loader color="teal" variant="dots" />}>
          <Await resolve={dataPromise.posts}>
            {(posts) =>
              posts.data.map((post) => (
                <div key={post.id}>
                  <ArticleCardImage key={post.title} {...post} />
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
