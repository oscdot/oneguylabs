import { v } from 'convex/values'
import { query } from './_generated/server'

export const list = query({
  args: {
    sort: v.union(
      v.literal('newest'),
      v.literal('completed'),
      v.literal('oldest')
    ),
  },
  handler: async (ctx, { sort }) => {
    switch (sort) {
      case 'newest':
        return await ctx.db.query('tasks').order('desc').collect()
      case 'oldest':
        return await ctx.db.query('tasks').order('asc').collect()
      case 'completed':
        return await ctx.db
          .query('tasks')
          .filter((q) => q.eq(q.field('isCompleted'), true))
          .order('desc')
          .collect()
      default:
        throw new Error(`Unknown sort: ${sort}`)
    }
  },
})

export const getById = query({
  args: { taskId: v.string() },
  handler: async (ctx, args) => {
    const taskId = ctx.db.normalizeId('tasks', args.taskId)
    if (!taskId) throw new Error(`Task not found: ${taskId}`)
    return await ctx.db.get(taskId)
  },
})
