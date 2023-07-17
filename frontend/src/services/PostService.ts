import axios from "axios";
import DOMAIN from "../services/endpoint";
import { defer } from "react-router-dom";
import { IPost } from "../types/types";

export const postDetailsLoader = async ({ params }: any) => {
  const res = await axios.get(`${DOMAIN}/api/posts/${params.id}`);
  if (res.status != 200) {
    throw Error("Could not find the data");
  }
  return res.data as IPost;
};

//removed await from axios to get the imidiate promise
export const postsLoader = async () => {
  const res = axios.get(`${DOMAIN}/api/posts`);
  return defer({ posts: res });
};
