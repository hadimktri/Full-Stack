import express from "express";
const router = express.Router();
import { checkAuth } from "../middleware/checkAuth";
import userControllers from "../controllers/userControllers";

router.get("/:id", checkAuth, userControllers.getAllUerPosts);

router.get("/liked/:id", checkAuth, userControllers.getAllUerLikedPosts);

router.get(
  "/comments/:id",
  checkAuth,
  userControllers.getAllUerCommentedPosts
);

export default router;
