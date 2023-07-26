import express from "express";
const router = express.Router();
import { checkAuth } from "../middleware/checkAuth";
import authControllers from "../controllers/auth";

router.post("/login", authControllers.postUserLogin);

router.post("/validation", authControllers.postUservalidation);

router.post("/signup", authControllers.postUserSignUp);

router.post("/delete/:id", checkAuth, authControllers.postUserDelete);

router.get("/google", authControllers.getGoogleLogin);

router.post("/updatePassword",  authControllers.postUpdatePassword);

router.post("/emailRecoveryNumber", authControllers.emailRecoveryNumber);

export default router;
