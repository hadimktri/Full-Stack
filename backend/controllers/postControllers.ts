import { NextFunction, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { sleep } from "../utils/utils";
import asyncErrorHandler from "../utils/asyncErrorHandler";
import CustomError from "../config/CustomError";

export default {
  getAllPosts: async (req: Request, res: Response, next: NextFunction) => {
    // await sleep(500);
    const posts = await prisma.post.findMany({
      include: {
        favoritedBy: true,
        author: true,
        comments: true,
      },
      orderBy: { createdAt: "desc" },
    });

    res.status(200).json({
      status: "success",
      length: posts.length,
      posts,
    });
  },

  getOnePost: asyncErrorHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const post = await prisma.post.findFirst({
        where: {
          id: req.params.id,
        },
      });

      !post &&
        next(
          new CustomError(
            `Post with the id of ( ${req.params.id} ) is not found!`,
            404
          )
        );

      res.status(200).json({
        status: "success",
        post,
      });
    }
  ),

  createPost: asyncErrorHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const post = await prisma.post.create({
        data: req.body,
      });

      !post && next(new CustomError(`Creating Post Failed!`, 404));

      res.status(201).json({
        status: "success",
        post,
      });
    }
  ),

  updatePost: asyncErrorHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const post = await prisma.post.update({
        where: {
          id: req.params.id,
        },
        data: req.body,
      });

      !post &&
        next(
          new CustomError(
            `Upsating Failed!. Post with the id of ( ${req.params.id} ) is not found!`,
            404
          )
        );

      console.log(post);
      res.status(202).json({
        status: "success",
        post,
      });
    }
  ),

  deletePost: asyncErrorHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const post = await prisma.post.delete({
        where: {
          id: req.params.id,
        },
      });

      !post &&
        next(
          new CustomError(
            "Deleting Post Failed!. Post with the id of ( ${req.params.id} ) is not found!",
            404
          )
        );

      res.status(204).json({
        status: "success",
        post,
      });
    }
  ),

  favoritePost: asyncErrorHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const postId = req.params.id;
      const userId = req.body.userId;

      const favedId = await prisma.post.findFirst({
        where: {
          id: postId,
        },
        select: {
          favoritedBy: { select: { id: true } },
        },
      });

      const isFaved = favedId?.favoritedBy
        .map((f: any) => f.id)
        .includes(userId);

      const post = isFaved
        ? await prisma.post.update({
            where: {
              id: postId,
            },
            data: {
              favoritedBy: {
                disconnect: { id: userId },
              },
            },
          })
        : await prisma.post.update({
            where: {
              id: postId,
            },
            data: {
              favoritedBy: {
                connect: { id: userId },
              },
            },
          });

      !post && next(new CustomError("favoriting Post Failed!", 404));

      res.status(200).json({
        status: "success",
        post,
      });
    }
  ),

  likePost: asyncErrorHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const likes = req.body.likes;
      const id = req.params.id;

      const post = await prisma.post.update({
        where: {
          id: id,
        },
        data: { likes },
      });

      !post && next(new CustomError("Like/Dislike Post Failed!", 404));

      res.status(200).json({
        status: "success",
        post,
      });
    }
  ),

  addComment: asyncErrorHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const comment = await prisma.comment.create({
        data: req.body,
      });

      !comment && next(new CustomError("Commenting Post Failed!", 404));

      res.status(200).json({
        status: "success",
        comment,
      });
    }
  ),

  deleteComment: asyncErrorHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const comment = await prisma.comment.delete({
        where: {
          id: req.params.id,
        },
      });

      !comment && next(new CustomError("Deleting Comment Failed!", 404));

      res.status(200).json({
        status: "success",
        comment,
      });
    }
  ),

  topLiked: async (req: Request, res: Response, next: NextFunction) => {
    // await sleep(1000);
    const posts = await prisma.post.findMany({
      include: {
        favoritedBy: true,
        author: true,
        comments: true,
      },
      orderBy: { likes: "desc" },
      take: 4,
    });

    res.status(200).json({
      status: "success",
      length: posts.length,
      posts,
    });
  },
  getComments: asyncErrorHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const comments = await prisma.comment.findMany({
        where: { postId: req.params.id },
      });

      !comments && next(new CustomError("Getting comments Failed!", 404));

      res.status(200).json({
        status: "success",
        comments,
      });
    }
  ),
};
