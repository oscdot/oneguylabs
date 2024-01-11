import { convex } from '@/lib/api/convex'
import { api } from '@convex/_generated/api'
import { FileRoute, Link } from '@tanstack/react-router'

export const Route = new FileRoute('/tasks/').createRoute({
  loaderDeps: ({ search: { sort } }) => ({ sort }),
  loader: ({ deps: { sort } }) =>
    convex.query(api.tasks.list, { sort: sort ?? 'newest' }),
  staleTime: 1000 * 20, // TODO: change this, it's just for testing
  component: TasksIndexComponent,
})

function TasksIndexComponent() {
  const tasks = Route.useLoaderData()

  return (
    <div>
      <ul className="space-y-3 min-w-56">
        {tasks.map((task) => {
          return (
            <li key={task._id} className="whitespace-nowrap">
              <Link
                to="/tasks/$taskId"
                params={{
                  taskId: task._id,
                }}
                className="block p-3 bg-slate-200 hover:bg-slate-300 rounded-md"
                activeProps={{ className: 'bg-slate-300 font-bold' }}
              >
                <div className="flex items-center justify-between">
                  <div>{task.title}</div>
                  <div className="text-lg">
                    {task.isCompleted ? '🟢' : '🔴'}
                  </div>
                </div>
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
