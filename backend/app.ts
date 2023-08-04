import express from "express";
import cors from "cors";
import adminRouter from "./routes/adminRoutes";
import authRouter from "./routes/authRoutes";
import postRouter from "./routes/postRoutes";
import userRouter from "./routes/userRouter";
import CustomError from "./config/CustomError";
import globalErrorHandler from "./controllers/errorControllers";

const app = express();

app.use(express.json());
app.use(cors());
app.use("/admin", adminRouter);
app.use("/api/auth", authRouter);
app.use("/api/posts", postRouter);
app.use("/api/user", userRouter);

app.all("*", (req, res, next) => {
  const error: any = new CustomError(
    `Can't find ${req.originalUrl} on the server!`,
    404
  );
  next(error);
});

app.use(globalErrorHandler);

export default app;
