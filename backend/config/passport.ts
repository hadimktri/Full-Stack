import "dotenv/config";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as LocalStrategy } from "passport-local";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
const prisma = new PrismaClient();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      callbackURL: process.env.GOOGLE_CALLBACK_URL as string,
    },
    async (accessToken, refreshToken, profile, done) => {
      const googleUser = await prisma.user.findFirst({
        where: { email: Object.values(profile)[3][0].value },
      });
      if (!googleUser) {
        const randomPassword = await bcrypt.hash(
          new Date().toLocaleDateString.toString(),
          12
        );
        const newUser = await prisma.user.create({
          data: {
            googleId: Object.values(profile)[0],
            name: Object.values(profile)[2].givenName,
            email: Object.values(profile)[3][0].value,
            profileImage: Object.values(profile)[4][0].value,
            password: randomPassword,
          },
        });
        console.log("newUser------------>", newUser);
        return done(null, newUser, {
          message: "Registered with Gmail",
        });
      }

      if (googleUser) {
        console.log("googleUser------------>", googleUser);
        return done(null, googleUser, { message: "Logged In Successfully" });
      }
    }
  )
);
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async function (email, password, done) {
      const localUser = await prisma.user.findFirst({
        where: { email: email },
      });
      if (!localUser) {
        console.log("user not found");
        return done(null, false, {
          message: "Registered with your email",
        });
      }
      if (localUser) {
        console.log("googleUser------------>", localUser);
        const verifyPassword = await bcrypt.compare(
          password,
          localUser?.password
        );
        if (verifyPassword) {
          return done(null, localUser, { message: "Logged In Successfully" });
        }
      }
    }
  )
);
