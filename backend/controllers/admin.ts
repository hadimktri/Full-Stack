import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { Secret } from "jsonwebtoken";
const secret = process.env.JWT_SECRET as Secret;
import { parseToken } from "../services/authService";
import { IDecodedUser } from "../utils/interface";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const adminControllers = {};
export default adminControllers;
