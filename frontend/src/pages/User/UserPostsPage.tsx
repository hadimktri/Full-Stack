import { createStyles, Loader, Grid, Image } from "@mantine/core";
import { Await, Link, useLoaderData } from "react-router-dom";
import { Suspense, useEffect, useState } from "react";
import { IPost } from "../../types/types";

interface IPromise {
  data: Promise<IPost[]>;
}
interface Idata {
  data: { posts: IPost[] };
}

const useStyles = createStyles((theme) => ({
  main: {
    display: "flex",
    justifyContent: "center",
    [theme.fn.smallerThan("xs")]: {
      flexDirection: "column",
    },
  },
}));

export default function UserPostPage() {
  const { classes } = useStyles();
  const loader = useLoaderData();

  const [tableData, setTableData] = useState<IPost[] | void>([]);

  function RenderPostsElements(data: Idata) {
    useEffect(() => {
      setTableData(data.data.posts);
    }, []);

    return (
      <Grid grow gutter="xs" mt={50}>
        {tableData?.map((post) => (
          <div key={post.id}>
            <Grid.Col span={4}>
              <Link
                to={"/detail"}
                state={{
                  title: post.title,
                  category: post.category,
                  image: post.image,
                  likes: post.likes,
                  author: post.author,
                  comments: post.comments,
                  content: post.content,
                }}
              >
                <Image
                  src={post.image}
                  alt={post.title}
                  radius={5}
                  width={280}
                />
              </Link>
            </Grid.Col>
          </div>
        ))}
      </Grid>
    );
  }
  return (
    <Suspense fallback={<Loader color="teal" variant="dots" />}>
      <Await resolve={(loader as IPromise).data}>{RenderPostsElements}</Await>
    </Suspense>
  );
}
