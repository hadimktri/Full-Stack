import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { parseToken } from "../services/auth.Service";
import { IDecodedUser } from "../utils/types";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const adminControllers = {};
export default adminControllers;
