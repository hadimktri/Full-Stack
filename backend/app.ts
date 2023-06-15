import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";

import { Secret } from "jsonwebtoken";
import { checkAuth } from "./middleware/checkAuth";
import {
  findUserById,
  IDecodedUser,
  verifyUser,
  parseToken,
  addPost,
  posts,
  updatePost,
  sleep,
} from "./fakedb";
import "dotenv/config";

const secret = process.env.JWT_SECRET as Secret;
const port = 8085;
const app = express();
app.use(cors());
app.use(express.json());
/**
 * password needs to be hashed and to be logged in with passport
 *
 * if user and password matches generates the token with user and secret and expiry time with jwt.sign function provided by JWT
 *
 * passes the authenticated user and token to the browser or 401
 */

app.post("/api/user/login", (req, res) => {
  try {
    const { email, password } = req.body;
    const user = verifyUser(email, password);
    const token = jwt.sign({ id: user.id }, secret, { expiresIn: "2 days" });
    res.json({ result: { user, token } });
  } catch (error) {
    res.status(401).json({ error });
  }
});

//gets the header token checks the validity
//returns authorized user with token or 401 to the browser
//request from front. function placed in AuthStore
app.post("/api/user/validation", (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    const token = parseToken(authHeader, res);
    const decodedUser = jwt.verify(token, secret);
    const user = findUserById((decodedUser as IDecodedUser).id);
    res.json({ result: { user, token } });
  } catch (error) {
    res.status(401).json({ error });
  }
});

//returns all posts
app.get("/api/posts", checkAuth, async (req, res) => {
  // Sleep delay goes here
  await sleep(1000);
  return res.json(posts);
});

//returns one post
app.get("/api/posts/:id", checkAuth, (req, res) => {
  const id: any = req.params.id;
  const post = posts.filter((p) => p.id == id)[0];
  const author = findUserById(post.userId).name;
  const newPost = { ...post, author };
  res.json(newPost);
});

//adds a post and checks if empty/incorrect payload
app.post("/api/posts", checkAuth, (req, res) => {
  if (!req.body) {
    throw res.status(403).json("post data is required");
  } else {
    addPost(req.body);
    res.status(200).json({ success: true });
  }
});

// updates a post
app.post("/api/posts/:id/create/:id", checkAuth, (req, res) => {
  const id: any = req.params.id;
  const updatedValues = req.body;
  updatePost(updatedValues, id);
  res.status(200).json({ success: true });
});

app.listen(port, () => console.log("Server is running"));
