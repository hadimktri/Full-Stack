import express from "express";
const router = express.Router();
import { checkAuth } from "../middleware/checkAuth";
import authControllers from "../controllers/authControllers";

router.post("/login", authControllers.userLogin);

router.post("/validation", authControllers.userValidation);

router.post("/signup", authControllers.userSignUp);

router.post("/delete/:id", checkAuth, authControllers.userDelete);

router.get("/google", authControllers.googleLogin);

router.post("/updatePassword",  authControllers.updatePassword);

router.post("/emailRecoveryNumber", authControllers.emailRecoveryNumber);

export default router;
