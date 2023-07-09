import { Response } from "express";

export const parseToken = (authHeader: string | undefined, res: Response) => {
  if (!authHeader) {
    res.status(403).send("Header does not exist");
    return "";
  }
  return authHeader.split(" ")[1];
};
