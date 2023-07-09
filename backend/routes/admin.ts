import express from "express";
const router = express.Router();
import { checkAuth } from "../middleware/checkAuth";
import adminControllers from "../controllers/post";

export default router;
