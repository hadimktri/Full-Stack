import { NextFunction, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { sleep } from "../utils/utils";

export const postControllers = {
  getPosts: async (req: Request, res: Response) => {
    // await sleep(500);
    const posts = await prisma.post.findMany({
      include: {
        favoratedBy: true,
        author: true,
        comments: true,
      },
      orderBy: { createdAt: "asc" },
    });
    return res.json(posts);
  },

  getOnePost: async (req: Request, res: Response) => {
    const post = await prisma.post.findFirst({
      where: {
        id: req.params.id,
      },
    });
    return res.json(post);
  },

  postCreatePost: async (req: Request, res: Response) => {
    try {
      const userId = req.params.id;
      if (!req.body) {
        throw res.status(403).json("post data is required");
      } else {
        await prisma.post.create({
          data: {
            title: req.body.title,
            content: req.body.content,
            image: req.body.image,
            category: req.body.category,
            authorId: userId,
          },
        });
        res.status(200).json({ success: true });
      }
    } catch (error) {
      res.status(401).json({ error });
    }
  },

  postUpdatePost: async (req: Request, res: Response) => {
    try {
      await prisma.post.update({
        where: {
          id: req.params.id,
        },
        data: {
          title: req.body.title,
          content: req.body.content,
          category: req.body.category,
          image: req.body.image,
        },
      });
      res.status(200).json({ success: true });
    } catch (error) {
      res.status(401).json({ error });
    }
  },

  postDeletePost: async (req: Request, res: Response) => {
    try {
      await prisma.post.delete({
        where: {
          id: req.params.id,
        },
      });
      res.status(200).json({ success: true });
    } catch (error) {
      res.status(401).json({ error });
    }
  },

  postFavoratePost: async (req: Request, res: Response) => {
    const postId = req.params.id;
    const userId = req.body.userId;
    try {
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

      if (isFaved) {
        await prisma.post.update({
          where: {
            id: postId,
          },
          data: {
            favoratedBy: {
              disconnect: { id: userId },
            },
          },
        });
      } else {
        await prisma.post.update({
          where: {
            id: postId,
          },
          data: {
            favoratedBy: {
              connect: { id: userId },
            },
          },
        });
      }

      res.status(200).json({ success: true });
    } catch (error) {
      res.status(401).json({ error });
    }
  },

  postLikeUpPost: async (req: Request, res: Response) => {
    try {
      await prisma.post.update({
        where: {
          id: req.params.id,
        },
        data: { likes: { increment: 1 } },
      });
      res.status(200).json({ success: true });
    } catch (error) {
      res.status(401).json({ error });
    }
  },
  postLikeDownPost: async (req: Request, res: Response) => {
    try {
      await prisma.post.update({
        where: {
          id: req.params.id,
        },
        data: { likes: { decrement: 1 } },
      });
      res.status(200).json({ success: true });
    } catch (error) {
      res.status(401).json({ error });
    }
  },
  postCommentPost: async (req: Request, res: Response) => {
    try {
      await prisma.comment.create({
        data: {
          content: req.body.content,
          authorId: req.body.userId,
          postId: req.params.id,
        },
      });
      res.status(200).json({ success: true });
    } catch (error) {
      res.status(401).json({ error });
    }
  },
};

export default postControllers;
