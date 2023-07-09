import express from "express";
const router = express.Router();
import authControllers from "../controllers/auth";

router.post("/login", authControllers.postUserLogin);

router.post("/validation", authControllers.postUservalidation);

router.post("/signup", authControllers.postUserSignUp);

export default router;
