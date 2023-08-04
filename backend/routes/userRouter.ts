import express from "express";
const router = express.Router();
import { checkAuth } from "../middleware/checkAuth";
import userControllers from "../controllers/userControllers";

router.get("/:id", checkAuth, userControllers.getAllUerPosts);

router.get("/liked/:id",checkAuth, userControllers.getAllUerLikedPosts);

router.get("/commented/:id",checkAuth, userControllers.getAllUerCommentedPosts);

// router
//   .route("/:id")
//   .get(checkAuth, postControllers.getOnePost)
//   .patch(checkAuth, postControllers.updatePost)
//   .delete(checkAuth, postControllers.deletePost);

// router.post("/favorate/:id", checkAuth, postControllers.favoratePost);

// router.post("/likeUp/:id", checkAuth, postControllers.likePost);

// router.post("/comment", checkAuth, postControllers.commentPost);

// router.delete("/comment/:id", checkAuth, postControllers.deleteComment);

export default router;
