import { FileRoute, Outlet } from '@tanstack/react-router'
import { z } from 'zod'

export class TaskNotFoundError extends Error {}

const taskSearchSchema = z.object({
  sort: z.enum(['newest', 'oldest', 'completed']).optional().catch('newest'),
})

export const Route = new FileRoute('/tasks').createRoute({
  validateSearch: taskSearchSchema,
  component: TasksComponent,
})

function TasksComponent() {
  return <Outlet />
}
