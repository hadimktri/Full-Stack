import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { Secret } from "jsonwebtoken";
const secret = process.env.JWT_SECRET as Secret;
import { parseToken } from "../services/authService";
import { IDecodedUser } from "../utils/types";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

/**
 * password needs to be hashed and to be logged in with passport
 *
 * if user and password matches generates the token with user and secret and expiry time with jwt.sign function provided by JWT
 *
 * passes the authenticated user and token to the browser or 401
 */
export const authControllers = {
  postUserLogin: async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      const user = await prisma.user.findFirst({
        where: {
          email: email,
        },
      });
      if (user) {
        const verifyPassword = await bcrypt.compare(password, user?.password);
        if (verifyPassword) {
          const token = jwt.sign({ id: user?.id }, secret, {
            expiresIn: "2 days",
          });
          res.json({ result: { user, token } });
        }
      }
    } catch (error) {
      res.status(401).json({ error });
    }
  },

  postUservalidation: async (req: Request, res: Response) => {
    try {
      const authHeader = req.headers.authorization;
      const token = parseToken(authHeader, res);
      const decodedUser = jwt.verify(token, secret);
      await prisma.user
        .findFirst({
          where: {
            id: (decodedUser as IDecodedUser).id.toString(),
          },
        })
        .then((user) => {
          res.json({ result: { user, token } });
        });
    } catch (error) {
      res.status(401).json({ error });
    }
  },

  postUserSignUp: async (req: Request, res: Response) => {
    try {
      const { name, email, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 12);
      const signup = await prisma.user.create({
        data: {
          name: name,
          email: email,
          password: hashedPassword,
        },
      });
      if (signup) console.log("user saved");
      res.json({ success: true });
    } catch (error) {
      res.status(401).json({ error });
    }
  },

  googleLogin: (req: Request, res: Response) => {
    console.log("logged with google");
  },
};
export default authControllers;
