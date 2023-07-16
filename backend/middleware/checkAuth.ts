import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import jwtDecode from "jwt-decode";
import { parseToken } from "../services/auth.Service";
import { Secret } from "jsonwebtoken";
const JWT_TOKEN_SECRET = process.env.JWT_TOKEN_SECRET as Secret;

export const checkAuth = (
  req: Request | any,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;
    const token = parseToken(authHeader, res);
    // prevents from any request to the route WITHOUT a token
    if (!token) {
      return res.status(401).json("no token found");
    }
    // checks if token is expired
    else {
      const decoded: any = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      if (decoded.exp < currentTime) {
        return res.status(403).json("access token expired");
      }
    }
    // checks token if is valid
    jwt.verify(token, JWT_TOKEN_SECRET, (err: any, userId: any) => {
      if (err) {
        return res.status(403).json("invalid token");
      } else {
        if (!userId) {
          return res.status(403).json("user id not found");
        } else {
          req.user = {
            id: userId,
          };
          next();
        }
      }
    });
  } catch (error) {
    res.status(401).json({ error });
  }
};
