import express from "express";
const router = express.Router();
import { checkAuth } from "../middleware/checkAuth";
import adminControllers from "../controllers/postControllers";

export default router;
