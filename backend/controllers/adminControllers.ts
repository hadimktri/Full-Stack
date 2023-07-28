import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { parseToken } from "../services/auth.Service";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export default {};
