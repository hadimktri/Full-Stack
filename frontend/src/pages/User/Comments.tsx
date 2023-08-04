/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Suspense } from "react";
import { Container } from "@mantine/core";
import { useLoaderData, Await } from "react-router-dom";
import { Loader } from "@mantine/core";
import { IComment } from "../../types/types";
import CommentsAcordion from "../../components/user/CommentsAcordion";

interface IPromise {
  diferedData: Promise<IComment>;
}
export default function Comments() {
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
                <CommentsAcordion
                  commentsArray={
                    resolvedPromise.data.data.comments as IComment[]
                  }
                />
              );
            }
          }
        }}
      </Await>
    </Suspense>
  );
}
