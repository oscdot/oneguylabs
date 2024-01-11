import { defineSchema, defineTable } from 'convex/server'
import { v } from 'convex/values'

export default defineSchema({
  tasks: defineTable(
    v.object({
      title: v.string(),
      description: v.string(),
      isCompleted: v.boolean(),
    })
  ),
})
