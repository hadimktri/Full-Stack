import { create } from "zustand";
import { devtools } from "zustand/middleware";
import AuthStore from "./AuthStore";
import PostStore from "./PostStore";
import { IAuthStore } from "../types/types";
import { IPostStore } from "../types/types";

const useBoundStore = create<IPostStore & IAuthStore>()(
  devtools((...a) => ({
    ...PostStore(...a),
    ...AuthStore(...a),
  }))
);
export default useBoundStore;
