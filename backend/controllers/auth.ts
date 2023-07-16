import { Request, Response } from "express";
import { getGoogleOauthToken, getGoogleUser } from "../services/google.service";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { Secret } from "jsonwebtoken";
const JWT_TOKEN_EXPIRES_IN = process.env.JWT_TOKEN_EXPIRES_IN;
const JWT_TOKEN_SECRET = process.env.JWT_TOKEN_SECRET as Secret;
import { parseToken } from "../services/auth.Service";
import { IDecodedUser } from "../utils/types";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const authControllers = {
  postUserLogin: async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      const user = await prisma.user.findFirst({
        where: {
          email: email,
        },
      });
      if (!user) {
        return res.status(401).json({
          result: {
            status: "fail",
            message: "Invalid email or password",
          },
        });
      }
      if (user) {
        const verifyPassword = await bcrypt.compare(password, user?.password);
        if (verifyPassword) {
          const token = jwt.sign({ id: user?.id }, JWT_TOKEN_SECRET, {
            expiresIn: JWT_TOKEN_EXPIRES_IN,
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
      const decodedUser = jwt.verify(token, JWT_TOKEN_SECRET);
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
      const { name, email, password, profilePicture } = req.body;
      const hashedPassword = await bcrypt.hash(password, 12);
      const signup = await prisma.user.upsert({
        where: { email, NOT: { googleId: null } },
        create: {
          name,
          email,
          password: hashedPassword,
          profilePicture: profilePicture,
          verified: false,
        },
        update: {
          password: hashedPassword,
        },
      });

      if (signup) console.log("User Signed Up");
      res.json({ success: true });
    } catch (error) {
      res.status(401).json({ error });
    }
  },

  getGoogleLogin: async (req: Request, res: Response) => {
    const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN as unknown as string;
    try {
      const code = req.query.code as string;
      const pathUrl = (req.query.state as string) || "/";

      if (!code) {
        return res.status(401).json({
          result: {
            status: "fail",
            message: "Authorization code not provided!",
          },
        });
      }

      const { id_token, access_token } = await getGoogleOauthToken({ code });

      const { name, verified_email, email, picture, id } = await getGoogleUser({
        id_token,
        access_token,
      });

      if (!verified_email) {
        return res.status(403).json({
          result: {
            result: {
              status: "fail",
              message: "Google account not verifie",
            },
          },
        });
      }

      const user = await prisma.user.upsert({
        where: { email },
        create: {
          googleId: id,
          name,
          email,
          password: "",
          profilePicture: picture,
          verified: verified_email,
        },
        update: {
          googleId: id,
          name,
          profilePicture: picture,
          verified: verified_email,
        },
      });

      if (!user) return res.redirect(`${FRONTEND_ORIGIN}`);

      const token = jwt.sign({ id: user?.id }, JWT_TOKEN_SECRET, {
        expiresIn: JWT_TOKEN_EXPIRES_IN,
      });
      res.redirect(`http://localhost:3000?token=${token}`);
    } catch (error) {
      console.log("Failed to authorize Google User", error);
      return res.redirect(`${FRONTEND_ORIGIN}/oauth/error`);
    }
  },
};

export default authControllers;
