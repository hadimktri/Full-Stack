import DOMAIN from "../services/endpoint";
import axios from "axios";
import { setSession } from "../services/jwt.service";
import { IAuthStore, IResponse, ISuccess } from "../types/types";
import { IPostStore } from "../types/types";
import { StateCreator } from "zustand";

const createAuthStore: StateCreator<
  IAuthStore & IPostStore,
  [],
  [],
  IAuthStore
> = (set, get) => ({
  user: null,
  authLoading: false,
  tokenLoading: true,

  setUser: (args) => set({ user: args }),
  // reset everything set session, user, authloading, tokenloadig to false
  logoutService: () => {
    setSession(null);
    set({ user: null, authLoading: false, tokenLoading: false });
  },

  loginService: async (email, password) => {
    set({ authLoading: true });
    // while waiting for result from backend, loading is running
    try {
      const res = await axios.post(`${DOMAIN as string}/api/auth/login`, {
        email,
        password,
      });
      //if we have truthy result with user and token
      if (
        (res.data as IResponse).result?.user &&
        (res.data as IResponse).result?.token
      ) {
        // saving token in the local storage as cookie
        setSession((res.data as IResponse).result?.token);
        //finally set the stor's user from null to result user
        set({ user: (res.data as IResponse).result?.user, authLoading: false });
      } else {
        //if we don't have truthy result with user and token
        set({ authLoading: false, user: null });
      }
    } catch (error) {
      console.log(error);
      set({ authLoading: false });
    }
  },

  signUpService: async (name, email, password, profilePicture) => {
    set({ authLoading: true });
    try {
      const res = await axios.post(`${DOMAIN as string}/api/auth/signup`, {
        name,
        email,
        password,
        profilePicture,
      });
      if ((res?.data as ISuccess).success) {
        console.log("first");
      } else {
        set({ authLoading: false, user: null });
      }
    } catch (error) {
      console.log(error);
      set({ authLoading: false });
    }
  },

  loginWithToken: async () => {
    try {
      const res = await axios.post(`${DOMAIN as string}/api/auth/validation`);
      // if result contains user and token, sets session and user loading false
      if (
        (res.data as IResponse).result?.user &&
        (res.data as IResponse).result?.token
      ) {
        setSession((res.data as IResponse).result?.token);
        set({
          user: (res.data as IResponse).result?.user,
          tokenLoading: false,
        });
      } else {
        // in falsy result
        set({ tokenLoading: false, user: null });
      }
    } catch (error) {
      console.log(error);
      get().logoutService();
    }
  },

  deleteUser: async (id) => {
    try {
      const res = await axios.post(`${DOMAIN as string}/api/auth/delete/${id}`);
      if ((res?.data as ISuccess).success) {
        get().logoutService();
      }
    } catch (error) {
      console.log(error);
      set({ postsLoading: false });
    }
  },

  updatePassword: async (id, password) => {
    try {
      const res = await axios.post(
        `${DOMAIN as string}/api/auth/updatePassword`,
        {
          id,
          password,
        }
      );
      if ((res?.data as ISuccess).success) {
        get().logoutService();
      }
    } catch (error) {
      console.log(error);
      set({ postsLoading: false });
    }
  },
});

export default createAuthStore;
