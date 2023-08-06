import axios from "axios";
import DOMAIN from "../services/endpoint";
import { defer } from "react-router-dom";
import { IPost } from "../types/types";

interface ISuccess {
  status: string;
  data: { post: IPost };
}

export const postDetailsLoader = async ({ params }: any) => {
  const res = await axios.get(
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    `${DOMAIN as string}/api/posts/${params.id as string}`
  );
  if ((res?.data as ISuccess).status !== "success") {
    throw Error("Could not find the Post");
  } else {
    return (res.data as ISuccess).data.post;
  }
};

export const postsLoader = () => {
  const res = axios.get(`${DOMAIN as string}/api/posts`);
  return defer({ diferedData: res });
};

export const userPostsLoader = async ({ params }: any) => {
  const res = await axios.get(
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    `${DOMAIN as string}/api/user/${params.id as string}`
  );
  return defer({ diferedData: res });
};

export const userLikedPostsLoader = async ({ params }: any) => {
  const res = await axios.get(
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    `${DOMAIN as string}/api/user/liked/${params.id as string}`
  );
  return defer({ diferedData: res });
};
export const userCommentedPostsLoader = async ({ params }: any) => {
  const res = await axios.get(
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    `${DOMAIN as string}/api/user/commented/${params.id as string}`
  );
  return defer({ diferedData: res });
};


