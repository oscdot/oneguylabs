import { convex } from '@/lib/api/convex'
import { api } from '@convex/_generated/api'
import {
  ErrorComponent,
  FileRoute,
  ErrorRouteProps,
  Link,
} from '@tanstack/react-router'

export class TaskNotFoundError extends Error {}

export const Route = new FileRoute('/tasks/$taskId').createRoute({
  loader: async ({ params: { taskId } }) =>
    convex.query(api.tasks.getById, { taskId }),
  errorComponent: TaskErrorComponent,
  staleTime: 1000 * 20,
  component: TaskComponent,
})

export function TaskErrorComponent({ error }: ErrorRouteProps) {
  if (error instanceof TaskNotFoundError) {
    return <div>{error.message}</div>
  }

  return <ErrorComponent error={error} />
}

function TaskComponent() {
  const task = Route.useLoaderData()

  if (!task) return <div>We couldn't find that task.</div>

  return (
    <div className="space-y-2">
      <Link to="/tasks/">Go back</Link>
      <h2 className="font-bold text-xl">{task.title}</h2>
      <div>{task.description}</div>
      <div className="text-lg">{task.isCompleted ? '🟢' : '🔴'}</div>
    </div>
  )
}
