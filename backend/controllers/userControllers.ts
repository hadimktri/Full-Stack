import { NextFunction, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import asyncErrorHandler from "../utils/asyncErrorHandler";
import CustomError from "../config/CustomError";

export default {
  getAllUerPosts: async (req: Request, res: Response, next: NextFunction) => {
    console.log('all')
    const posts = await prisma.post.findMany({
      where: { authorId: req.params.id },
      include: {
        favoratedBy: true,
        author: true,
        comments: true,
      },
      orderBy: { createdAt: "desc" },
    });
    res.status(200).json({
      status: "success",
      length: posts.length,
      data: {
        posts,
      },
    });
  },

  getAllUerLikedPosts: async (
    req: Request,
    res: Response,
    next: NextFunction
    ) => {
    console.log("liked")
    const posts = await prisma.post.findMany({
      where: {
        favoratedBy: {
          some: { id: req.params.id },
        },
      },
      include: {
        favoratedBy: true,
        author: true,
        comments: true,
      },
      orderBy: { createdAt: "desc" },
    });
    res.status(200).json({
      status: "success",
      length: posts.length,
      data: {
        posts,
      },
    });
  },
  getAllUerSavedPosts: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const posts = await prisma.post.findMany({
      where: {
        favoratedBy: {
          some: { id: req.params.id },
        },
      },
      include: {
        favoratedBy: true,
        author: true,
        comments: true,
      },
      orderBy: { createdAt: "desc" },
    });
    res.status(200).json({
      status: "success",
      length: posts.length,
      data: {
        posts,
      },
    });
  },
  getAllUerCommentedPosts: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    console.log("commented");
    const comments = await prisma.comment.findMany({
      where: {
        authorId: req.params.id,
      },
      include: {
        post: true,
      },
      orderBy: { createdAt: "desc" },
    });
       res.status(200).json({
      status: "success",
      length: comments.length,
      data: {
        comments,
      },
    });
  },
};
