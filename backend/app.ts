import express from "express";
import cors from "cors";
import "dotenv/config";
import adminRouter from "./routes/admin";
import authRouter from "./routes/auth";
import postRouter from "./routes/post";
const port = 8085;
const app = express();
app.use(express.json());
app.use(cors());

app.use("/admin", adminRouter);
app.use("/api/user", authRouter);
app.use("/api/posts", postRouter);

app.listen(port, () => console.log("Server is running"));
// import { PrismaClient } from "@prisma/client";
// const prisma = new PrismaClient();
// async function main() {
//   const user = await prisma.user.create({
//     data: {
//       name: "Hadi",
//       email: "hadi@gmail.com",
//       password: "123",
//       profileImage: "khoshtip",
//       age: 27,
//     },
//   });
//   console.log(user);
// }
// main()
//   .catch((e) => {
//     console.log(e.message);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });
