import { NextFunction, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { sleep } from "../utils/utils";

export const postControllers = {
  getPosts: async (req: Request, res: Response) => {
    await sleep(500);
    const posts = await prisma.post.findMany();
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
      const post = await prisma.post.update({
        where: {
          id:postId
        },
        data: {
          
        },
      });

      res.status(200).json({ success: true });
    } catch (error) {
      res.status(401).json({ error });
    }
  },
};

export default postControllers;
