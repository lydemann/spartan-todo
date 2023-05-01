import { z } from 'zod';
import { publicProcedure, router } from '../trpc';

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const todoRouter = router({
  create: publicProcedure
    .input(
      z.object({
        name: z.string(),
      })
    )
    .mutation(({ input }) =>
      prisma.todo.create({
        data: {
          name: input.name,
        },
      })
    ),
  update: publicProcedure
    .input(
      z.object({
        id: z.bigint(),
        name: z.string(),
      })
    )
    .mutation(({ input }) =>
      prisma.todo.update({
        data: {
          name: input.name,
        },
        where: {
          id: input.id,
        },
      })
    ),
  complete: publicProcedure
    .input(
      z.object({
        id: z.bigint(),
        isCompleted: z.boolean(),
      })
    )
    .mutation(({ input }) =>
      prisma.todo.update({
        data: {
          is_completed: input.isCompleted,
        },
        where: {
          id: input.id,
        },
      })
    ),
  list: publicProcedure.query(() => prisma.todo.findMany()),
  remove: publicProcedure
    .input(
      z.object({
        id: z.bigint(),
      })
    )
    .mutation(({ input }) =>
      prisma.todo.delete({
        where: {
          id: input.id,
        },
      })
    ),
});
