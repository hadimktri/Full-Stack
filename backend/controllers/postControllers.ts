import { NextFunction, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { sleep } from "../utils/utils";
import asyncErrorHandler from "../utils/asyncErrorHandler";
import CustomError from "../config/CustomError";

export default {
  getAllPosts: async (req: Request, res: Response, next: NextFunction) => {
    await sleep(500);
    const posts = await prisma.post.findMany({
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
        data: {
          post,
        },
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
        data: {
          post,
        },
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

      res.status(202).json({
        status: "success",
        data: {
          post,
        },
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
        data: {
          post,
        },
      });
    }
  ),

  favoratePost: asyncErrorHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const postId = req.params.id;
      const userId = req.body.userId;

      const favedId = await prisma.post.findFirst({
        where: {
          id: postId,
        },
        select: {
          favoratedBy: { select: { id: true } },
        },
      });

      const isFaved = favedId?.favoratedBy
        .map((faved) => faved.id)
        .includes(userId);

      const post = isFaved
        ? await prisma.post.update({
            where: {
              id: postId,
            },
            data: {
              favoratedBy: {
                disconnect: { id: userId },
              },
            },
          })
        : await prisma.post.update({
            where: {
              id: postId,
            },
            data: {
              favoratedBy: {
                connect: { id: userId },
              },
            },
          });

      !post && next(new CustomError("Favorating Post Failed!", 404));

      res.status(200).json({
        status: "success",
        data: {
          post,
        },
      });
    }
  ),

  likePost: asyncErrorHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const flag = req.body.flag;
      const id = req.params.id;

      const post = flag
        ? await prisma.post.update({
            where: {
              id: id,
            },
            data: { likes: { increment: 1 } },
          })
        : await prisma.post.update({
            where: {
              id: req.params.id,
            },
            data: { likes: { decrement: 1 } },
          });

      !post && next(new CustomError("Like/Dislike Post Failed!", 404));

      res.status(200).json({
        status: "success",
        data: {
          post,
        },
      });
    }
  ),

  commentPost: asyncErrorHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const comment = await prisma.comment.create({
        data: req.body,
      });

      !comment && next(new CustomError("Commenting Post Failed!", 404));

      res.status(200).json({
        status: "success",
        data: {
          comment,
        },
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
        data: {
          comment,
        },
      });
    }
  ),
};
