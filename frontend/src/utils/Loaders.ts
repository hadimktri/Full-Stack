/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import axios from "axios";
import DOMAIN from "../services/endpoint";
import { defer } from "react-router-dom";
import { IPost } from "../types/types";

export const postsLoader = () => {
  const data = axios.get(`${DOMAIN as string}/api/posts`);
  const sideData = "await axios.get(`${DOMAIN as string}/api/posts/topliked`);";
  return defer({ data, sideData });
  //  return defer({ data });
};
export const leftPostLoader = async () => {
  const res = await axios.get(`${DOMAIN as string}/api/posts/topliked`);
  if (res.status !== 200) {
    throw Error("Could not find the data");
  }
  return res.data.posts as IPost[];
};

export const postDetailsLoader = ({ params }: any) => {
  const data = axios.get(
    `${DOMAIN as string}/api/posts/${params.id as string}`
  );
  return defer({ data });
};
export const postComments = ({ params }: any) => {
 
  const data = axios.get(
    `${DOMAIN as string}/api/posts/comment/${params.id as string}`
  );
  return defer({ data });
};

export const userPostsLoader = ({ params }: any) => {
  const data = axios.get(`${DOMAIN as string}/api/user/${params.id as string}`);
  return defer({ data });
};

export const userLikedPostsLoader = ({ params }: any) => {
  const data = axios.get(
    `${DOMAIN as string}/api/user/liked/${params.id as string}`
  );
  return defer({ data });
};
export const userCommentsLoader = ({ params }: any) => {
  const data = axios.get(
    `${DOMAIN as string}/api/user/comments/${params.id as string}`
  );
  return defer({ data });
};
