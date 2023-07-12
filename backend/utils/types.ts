export interface IDecodedUser {
  id: number;
}

export interface IUser {
  id: string;
  googleId?: string;
  name: string;
  email: string;
  password: string;
  profileImage?: string;
  role?: any;
  writtenPosts?: any;
  favoritePosts?: any;
}