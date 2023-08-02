// This is just an example store with fake data
import { StateCreator } from "zustand";
import { IAuthStore, ISuccess } from "../types/types";
import { IPostStore } from "../types/types";
import DOMAIN from "../services/endpoint";
import axios from "axios";

const PostStore: StateCreator<IAuthStore & IPostStore, [], [], IPostStore> = (
  set
) => ({
  posts: [],
  setPosts: (args) => set({ posts: args }),
  postsLoading: true,
  setPostLoading: (value) => {
    set(() => ({ postsLoading: value }));
  },

  addPost: async (values) => {
    await axios
      .post(`${DOMAIN as string}/api/posts`, values)
      .then(() => {
        set({ postsLoading: true });
      })
      .catch((error) => {
        console.log(error.response.data.message, error.response.data.status);
        set({ postsLoading: false });
      });
  },

  // addPost: async (values) => {
  //   try {
  //     const res = await axios.post(
  //       `${DOMAIN as string}/api/posts`,
  //       values
  //     );
  //     if ((res?.data as ISuccess).success) {
  //       set({ postsLoading: true });
  //     }
  //   } catch (error) {
  //     console.log(error.message as string);
  //     set({ postsLoading: false });
  //   }
  // },

  updatePost: async (values, postId) => {
    try {
      const res = await axios.patch(
        `${DOMAIN as string}/api/posts/${postId}`,
        values
      );
      if ((res?.data as ISuccess).success) {
        set({ postsLoading: true });
      }
    } catch (error) {
      console.log(error);
      set({ postsLoading: false });
    }
  },

  deletePost: async (id) => {
    try {
      const res = await axios.delete(`${DOMAIN as string}/api/posts/${id}`);
      if ((res?.data as ISuccess).success) {
        set({ postsLoading: true });
      }
    } catch (error) {
      console.log(error);
      set({ postsLoading: false });
    }
  },
  userFavorate: async (postId, userId) => {
    try {
      const res = await axios.post(
        `${DOMAIN as string}/api/posts/favorate/${postId}`,
        {
          userId,
        }
      );
      if ((res?.data as ISuccess).success) {
        set({ postsLoading: true });
      }
    } catch (error) {
      console.log(error);
      set({ postsLoading: false });
    }
  },
  postlikes: async (postId, flag) => {
    try {
      const res = await axios.post(
        `${DOMAIN as string}/api/posts/likeUp/${postId}`,
        {
          flag,
        }
      );
      if ((res?.data as ISuccess).success) {
        set({ postsLoading: true });
      }
    } catch (error) {
      console.log(error);
      set({ postsLoading: false });
    }
  },

  postComment: async (values) => {
    try {
      const res = await axios.post(
        `${DOMAIN as string}/api/posts/comment`,
        values
      );
      if ((res?.data as ISuccess).success) {
        set({ postsLoading: true });
      }
    } catch (error) {
      console.log(error);
      set({ postsLoading: false });
    }
  },

  deleteComment: async (id) => {
    try {
      const res = await axios.delete(
        `${DOMAIN as string}/api/posts/comment/${id}`
      );
      if ((res?.data as ISuccess).success) {
        set({ postsLoading: true });
      }
    } catch (error) {
      console.log(error);
      set({ postsLoading: false });
    }
  },
});

export default PostStore;
