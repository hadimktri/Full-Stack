import "dotenv/config";
import express from "express";
import passport from "passport";
import authControllers from "../controllers/auth";
import jwt from "jsonwebtoken";
import { Secret } from "jsonwebtoken";
const secret = process.env.JWT_SECRET as Secret;
const router = express.Router();
router.post("/login", authControllers.postUserLogin);
router.post("/validation", authControllers.postUservalidation);
router.post("/signup", authControllers.postUserSignUp);

// router.get(
//   "/google",
//   passport.authenticate("google", {
//     scope: ["email", "profile"],
//   })
// );

// router.get("/google/callback", function (req, res, next) {
//   passport.authenticate("google", { session: false }, (err, user, info) => {
//     if (err || !user) {
//       return res.status(400).json({
//         message: "Something is not right",
//         user: user,
//       });
//     }
//     req.login(user, { session: false }, (err) => {
//       if (err) {
//         res.send(err);
//       }
//       const token = jwt.sign({ id: user?.id }, secret, {
//         expiresIn: "2 days",
//       });
//       res.json({ result: { user, token } });
//     });
//   })(req, res);
// });

// router.post("/login", passport.authenticate("local"), (req, res) => {
//   console.log("logged in");
//   res.redirect("/");
// });

export default router;
