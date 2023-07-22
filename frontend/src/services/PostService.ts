import axios from "axios";
import DOMAIN from "../services/endpoint";
import { defer } from "react-router-dom";
import { IPost } from "../types/types";
interface props {
  id: string;
}
export const postDetailsLoader = async ({ params }) => {
  const res = await axios.get(
    `${DOMAIN as string}/api/posts/${(params as props).id}`
  );
  if (res.status != 200) {
    throw Error("Could not find the data");
  }
  return res.data as IPost;
};

//removed await from axios to get the imidiate promise
export const postsLoader = () => {
  const res = axios.get(`${DOMAIN as string}/api/posts`);
  return defer({ posts: res });
};
