// This is just an example store with fake data
import { StateCreator } from "zustand";
import { IAuthStore } from "../types/types";
import { IPostStore } from "../types/types";
import DOMAIN from "../services/endpoint";
import axios from "axios";

const PostStore: StateCreator<IAuthStore & IPostStore, [], [], IPostStore> = (
  set
) => ({
  postsLoading: true,
  setPostLoading: (value) => {
    set(() => ({ postsLoading: value }));
  },

  addPost: async (values, id) => {
    try {
      const res = await axios.post(`${DOMAIN}/api/posts/${id}`, values);
      if (res?.data.success) {
        set({ postsLoading: true });
      }
    } catch (error) {
      console.log(error);
      set({ postsLoading: false });
    }
  },

  updatePost: async (values, postId) => {
    try {
      const res = await axios.post(
        `${DOMAIN}/api/posts/update/${postId}`,
        values
      );
      if (res?.data.success) {
        set({ postsLoading: true });
      }
    } catch (error) {
      console.log(error);
      set({ postsLoading: false });
    }
  },

  deletePost: async (id) => {
    try {
      const res = await axios.post(`${DOMAIN}/api/posts/delete/${id}`);
      if (res?.data.success) {
        set({ postsLoading: true });
      }
    } catch (error) {
      console.log(error);
      set({ postsLoading: false });
    }
  },
  userFavorate: async (postId, userId) => {
    try {
      const res = await axios.post(`${DOMAIN}/api/posts/favorate/${postId}`, {
        userId,
      });
      if (res?.data.success) {
        set({ postsLoading: true });
      }
    } catch (error) {
      console.log(error);
      set({ postsLoading: false });
    }
  },
});

export default PostStore;
