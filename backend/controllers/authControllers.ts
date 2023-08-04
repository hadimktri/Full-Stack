import { NextFunction, Request, Response } from "express";
import { getGoogleOauthToken, getGoogleUser } from "../services/google.service";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { Secret } from "jsonwebtoken";
const JWT_TOKEN_EXPIRES_IN = process.env.JWT_TOKEN_EXPIRES_IN;
const JWT_TOKEN_SECRET = process.env.JWT_TOKEN_SECRET as Secret;
import { parseToken } from "../services/auth.Service";
import { PrismaClient } from "@prisma/client";
import sendEmail from "../config/mailer";
import asyncErrorHandler from "../utils/asyncErrorHandler";
import CustomError from "../config/CustomError";
const prisma = new PrismaClient();

interface IDecodedUser {
  id: number;
}

export default {
  userLogin: asyncErrorHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { email, password } = req.body;
      const user = await prisma.user.findFirst({
        where: {
          email: email,
        },
        include: {
          favoritePosts: true,
        },
      });

      !user && next(new CustomError("Invalid email or password!", 401));

      if (user) {
        const verifyPassword = await bcrypt.compare(password, user?.password);
        if (verifyPassword) {
          const token = jwt.sign({ id: user?.id }, JWT_TOKEN_SECRET, {
            expiresIn: JWT_TOKEN_EXPIRES_IN,
          });
          res.json({ result: { user, token } });
        }
      }
    }
  ),

  userValidation: asyncErrorHandler(
    async (req: Request, res: Response, next: NextFunction) => {
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
    }
  ),

  userSignUp: asyncErrorHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { name, email, password, profilePicture } = req.body;
      const hashedPassword = await bcrypt.hash(password, 12);
      const user = await prisma.user.upsert({
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

      !user && next(new CustomError(`Registering the User is Failed!`, 404));

      res.status(201).json({
        status: "success",
        data: {
          user,
        },
      });
    }
  ),

  googleLogin: asyncErrorHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN as unknown as string;

      const code = req.query.code as string;

      !code && next(new CustomError(`Authorization code not provided!`, 401));

      const { id_token, access_token } = await getGoogleOauthToken({ code });

      const { name, verified_email, email, picture, id } = await getGoogleUser({
        id_token,
        access_token,
      });

      !verified_email &&
        next(new CustomError(`Google account is not verified!`, 403));

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
        include: {
          favoritePosts: true,
        },
        update: {
          googleId: id,
          name,
          profilePicture: picture,
          verified: verified_email,
        },
      });

      !user && res.redirect(`${FRONTEND_ORIGIN}`);

      const token = jwt.sign({ id: user?.id }, JWT_TOKEN_SECRET, {
        expiresIn: JWT_TOKEN_EXPIRES_IN,
      });
      res.redirect(`${FRONTEND_ORIGIN}?token=${token}`);
    }
  ),

  userDelete: asyncErrorHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const user = await prisma.user.delete({
        where: {
          id: req.params.id,
        },
      });

      !user && next(new CustomError(`Deleting User Failed!`, 404));

      res.status(200).json({ success: true });
    }
  ),

  updatePassword: asyncErrorHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { email, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 12);
      const user = await prisma.user.update({
        where: { email: email },
        data: {
          password: hashedPassword,
        },
      });
      !user && next(new CustomError(`Updating User Failed!`, 404));

      res.json({ success: true });
    }
  ),

  emailRecoveryNumber: asyncErrorHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const email = req.body.email;
      const OTP = req.body.OTP;

      const result: any = await sendEmail(email, OTP);

      !result && next(new CustomError(`Recovery Email is not sent!`, 404));

      res.json({ success: true });
    }
  ),
};
