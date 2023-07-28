import axios from "axios";
import DOMAIN from "../services/endpoint";
import { defer } from "react-router-dom";
import { IPost } from "../types/types";
interface props {
  params: { id: string };
}
interface ISuccess {
  status: string;
  data: { post: IPost };
}

export const postDetailsLoader = async ({ params }: props) => {
  const res = await axios.get(`${DOMAIN as string}/api/posts/${params.id}`);
  if ((res?.data as ISuccess).status !== "success") {
    throw Error("Could not find the Post");
  } else {
    return (res.data as ISuccess).data.post;
  }
};

//removed await from axios to get the imidiate promise
export const postsLoader = () => {
  const res = axios.get(`${DOMAIN as string}/api/posts`);
  return defer({ diferedData: res });
};
