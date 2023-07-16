export interface IDecodedUser {
  id: number;
}

export interface IUser {
  id: string;
  googleId?: string;
  name: string;
  email: string;
  password: string;
  profilePicture: string;
  role: any;
  writtenPosts?: any;
  favoritePosts?: any;
  verified: boolean;
  createdAt: Date;
  updatedAt: Date;
}
