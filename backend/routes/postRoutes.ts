import express from "express";
const router = express.Router();
import { checkAuth } from "../middleware/checkAuth";
import postControllers from "../controllers/post";

router.get("/", checkAuth, postControllers.getPosts);

router.get("/:id", checkAuth, postControllers.getOnePost);

router.post("/:id", checkAuth, postControllers.postCreatePost);

router.post("/update/:id", checkAuth, postControllers.postUpdatePost);

router.post("/delete/:id", checkAuth, postControllers.postDeletePost);

router.post("/favorate/:id", checkAuth, postControllers.postFavoratePost);

export default router;
