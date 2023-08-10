/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Suspense } from "react";
import { Container } from "@mantine/core";
import { useLoaderData, Await } from "react-router-dom";
import { Loader } from "@mantine/core";
import { IComment } from "../../types/types";
import CommentsAcordion from "../../components/Posts/CommentsAcordion";

interface IPromise {
  data: Promise<IComment>;
}

export default function Comments() {
  const loader = useLoaderData();

  return (
    <Suspense
      fallback={
        <Container>
          <Loader color="teal" variant="dots" />
        </Container>
      }
    >
      <Await resolve={(loader as IPromise).data}>
        {(resolvedPromise) => {
          return (
            <CommentsAcordion commentsArray={resolvedPromise.data.comments} />
          );
        }}
      </Await>
    </Suspense>
  );
}
