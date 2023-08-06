export interface IUser {
  id: string;
  googleId: string;
  name: string;
  email: string;
  password: string;
  profilePicture: string;
  role: any;
  writtenPosts: IPost[];
  favoritePosts: IPost[];
  verified: boolean;
  createdAt: string;
  updatedAt: string;
  comments: IComment[];
}

export interface IAuthStore {
  user: IUser | null;
  authLoading: boolean;
  tokenLoading: boolean;
  setUser: (user: IUser | null) => void;
  logoutService: () => void;
  loginService: (email: string, password: string) => void;
  signUpService: (
    name: string,
    email: string,
    password: string,
    profilePicture: string
  ) => void;
  loginWithToken: () => void;
  deleteUser: (id: string) => void;
  updatePassword: (email: string, password: string) => void;
  emailRecoveryNumber: (email: string, number: number) => void;
}
export interface IPostStore {
  posts: IPost[];
  setPosts: (posts: IPost[]) => void;
  postsLoading: boolean;
  setPostLoading: (value: boolean) => void;
  addPost: (value: any) => void;
  updatePost: (value: any, id: string) => void;
  deletePost: (id: string) => void;
  userFavorate: (postId: string, userId: string) => void;
  postlikes: (postId: string, flag: boolean) => void;
  postComment: (values: {
    authorId: string;
    content: string;
    postId: string;
  }) => void;
  deleteComment: (id: string) => void;
}
export interface IToken {
  name: string;
  exp: number;
  // whatever else is in the JWT.
}
export interface IPost {
  id: string;
  title: string;
  content: string;
  likes: number;
  image: string;
  createdAt: string;
  updatedAt: string;
  category: string;
  author: IUser;
  authorId: string;
  favoratedBy: IUser[];
  favoratedById: string;
  comments: IComment[];
}
export interface IComment {
  id: string;
  content: string;
  author: IUser;
  authorId: string;
  postId: string;
  post: IPost;
  createdAt: string;
  updatedAt: string;
}
export interface ISuccess {
  success: boolean;
}
export interface IResponse {
  result: { user: IUser | null; token: string | null };
}

export interface paginationProps {
  handlePage: (page: number) => void;
  pageCount: number;
  setPage: (n: number) => void;
  page: number;
}

export interface IRegisterValues {
  email: string;
  password: string;
  name: string;
  confirmPassword?: string;
  profilePicture: string;
  terms: true;
}

export interface IRecoveryContext {
  page: string;
  setPage: (val: string) => void;
  email: string;
  setEmail: (val: string) => void;
}
export interface ISearchContext {
  searchValue: string;
  setSearchValue: (value: string) => void;
}
