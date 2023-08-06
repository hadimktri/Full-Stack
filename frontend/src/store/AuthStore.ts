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
  
  logoutService: () => {
    setSession(null);
    set({ user: null, authLoading: false, tokenLoading: false });
  },

  loginService: async (email, password) => {
    set({ authLoading: true });
    try {
      const res = await axios.post(`${DOMAIN as string}/api/auth/login`, {
        email,
        password,
      });
      if (
        (res.data as IResponse).result?.user &&
        (res.data as IResponse).result?.token
      ) {
        setSession((res.data as IResponse).result?.token);
        set({ user: (res.data as IResponse).result?.user, authLoading: false });
      } else {
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
        console.log("User Signed up");
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

  updatePassword: async (email, password) => {
    try {
      const res = await axios.post(
        `${DOMAIN as string}/api/auth/updatePassword`,
        {
          email,
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

  emailRecoveryNumber: async (email, OTP) => {
    try {
      const res = await axios.post(
        `${DOMAIN as string}/api/auth/emailRecoveryNumber`,
        {
          email,
          OTP,
        }
      );
      if ((res?.data as ISuccess).success) {
        console.log("recovery number has sent");
      }
    } catch (error) {
      console.log(error);
      set({ postsLoading: false });
    }
  },
});

export default createAuthStore;
