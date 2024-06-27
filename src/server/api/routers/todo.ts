import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
} from "@/server/api/trpc";
import { todos } from "@/server/db/schema";
import { eq } from "drizzle-orm";

export const ColumnIdEnum = z.enum(['todo', 'in-progress', 'done', 'suspended']);

export const todoRouter = createTRPCRouter({
  new: protectedProcedure.input(z.object({ columnId: ColumnIdEnum, content: z.string().min(1).max(128) })).mutation(async ({ ctx, input }) => {
    const maxPosition = await ctx.db.query.todos.findFirst({
      orderBy: (todos, { desc }) => desc(todos.position),
    });
    if (maxPosition && maxPosition.position >= 50) {
      throw new Error("You cannot have more than 50 tasks");
    } 
    else if (maxPosition) {
      await ctx.db.insert(todos).values({
        columnId: input.columnId,
        content: input.content,
        userId: ctx.session.user.id,
        position: maxPosition.position + 1,
      });
    }
    else {
      await ctx.db.insert(todos).values({
        columnId: input.columnId,
        content: input.content,
        userId: ctx.session.user.id,
        position: 0,
      });
    }
  }),

  updateLayout: protectedProcedure
  .input(
    z.array(
      z.object({
        id: z.string().min(1).max(255),
        content: z.string().min(1).max(128),
        columnId: ColumnIdEnum,
      })
    ).min(1).max(50)
  )
  .mutation(async ({ ctx, input }) => {
    const { db } = ctx;

    await db.transaction(async (trx) => {
      for (let i = 0; i < input.length; i++) {
        const todo = input[i];
        if (todo) {
          await trx.update(todos)
          .set({ position: i, columnId: todo.columnId, content: todo.content }) 
          .where(eq(todos.id, todo.id))
          .execute();
        }
      }
    });
  }),

  delete: protectedProcedure.input(z.object({ id: z.string().min(1).max(255) })).mutation(async ({ ctx, input }) => {
      await ctx.db.delete(todos).where(eq(todos.id, input.id))
  }),


  fetch: protectedProcedure.query(async ({ ctx }) => {
      return await ctx.db.query.todos.findMany({
        where: (todos, { eq }) => eq(todos.userId, ctx.session.user.id),
        limit: 50,
        orderBy: (todos, { asc }) => asc(todos.position),
      })
  }),
});
