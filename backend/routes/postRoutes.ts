import express from "express";
const router = express.Router();
import { checkAuth } from "../middleware/checkAuth";
import postControllers from "../controllers/postControllers";

router.get("/", postControllers.getAllPosts);

router.get("/topliked", postControllers.topLiked);
//
router.post("/", postControllers.createPost);

router
  .route("/:id")
  .get(checkAuth, postControllers.getOnePost)
  .patch(checkAuth, postControllers.updatePost)
  .delete(checkAuth, postControllers.deletePost);

router.post("/favorite/:id", checkAuth, postControllers.favoritePost);

router.post("/likeUp/:id", checkAuth, postControllers.likePost);

router.post("/comment", checkAuth, postControllers.addComment);

router.delete("/comment/:id", checkAuth, postControllers.deleteComment);

router.get("/comment/:id", checkAuth, postControllers.getComments);

export default router;
