import DOMAIN from "../services/endpoint";
import axios from "axios";
import { setSession } from "../services/jwt.service";
import { IAuthStore } from "../types/types";
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

  //sends login form values
  loginService: async (email, password) => {
    set({ authLoading: true });
    // while waiting for result from backend, loading is running
    try {
      const res = await axios.post(`${DOMAIN}/api/auth/login`, {
        email,
        password,
      });
      //if we have truthy result with user and token
      if (res.data.result?.user && res.data.result?.token) {
        // saving token in the local storage as cookie
        setSession(res.data.result?.token);
        //finally set the stor's user from null to result user
        set({ user: res.data.result?.user, authLoading: false });
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
      const res = await axios.post(`${DOMAIN}/api/auth/signup`, {
        name,
        email,
        password,
        profilePicture,
      });
      if (res.data.success) {
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
      const res = await axios.post(`${DOMAIN}/api/auth/validation`);
      // if result contains user and token, sets session and user loading false
      if (res.data.result?.user && res.data.result?.token) {
        setSession(res.data.result?.token);
        set({ user: res.data.result?.user, tokenLoading: false });
      } else {
        // in falsy result
        set({ tokenLoading: false, user: null });
      }
    } catch (error) {
      console.log(error);
      get().logoutService();
    }
  },
});
export default createAuthStore;
