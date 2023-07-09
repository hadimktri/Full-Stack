import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { Secret } from "jsonwebtoken";
const secret = process.env.JWT_SECRET as Secret;
import { parseToken } from "../services/authService";
import { IDecodedUser } from "../utils/interface";
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
      prisma.user
        .findFirst({
          where: {
            email: email,
          },
        })
        .then((user) => {
          if (password === user?.password) {
            const token = jwt.sign({ id: user?.id }, secret, {
              expiresIn: "2 days",
            });
            res.json({ result: { user, token } });
          }
        });
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
      console.log(name);
      await prisma.user.create({
        data: {
          name: name,
          email: email,
          password: password,
        },
      });
      console.log(email);
      res.json({ success: true });
    } catch (error) {
      res.status(401).json({ error });
    }
  },
};
export default authControllers;
