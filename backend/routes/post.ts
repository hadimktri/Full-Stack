import express from "express";
const router = express.Router();
import { checkAuth } from "../middleware/checkAuth";
import postControllers from "../controllers/post";

router.get("/", checkAuth, postControllers.getPosts);

router.get("/:id", checkAuth, postControllers.getOnePost);

router.post("/:id", checkAuth, postControllers.postCreatePost);

router.post("/:id/create/:id", checkAuth, postControllers.postUpdatePost);

router.post("/delete/:id", postControllers.postDeletePost);

export default router;
