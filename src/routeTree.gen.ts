import { Route as rootRoute } from './routes/__root'
import { Route as TasksImport } from './routes/tasks'
import { Route as LayoutImport } from './routes/_layout'
import { Route as IndexImport } from './routes/index'
import { Route as TasksIndexImport } from './routes/tasks.index'
import { Route as TasksTaskIdImport } from './routes/tasks.$taskId'

const TasksRoute = TasksImport.update({
  path: '/tasks',
  getParentRoute: () => rootRoute,
} as any)

const LayoutRoute = LayoutImport.update({
  id: '/_layout',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const TasksIndexRoute = TasksIndexImport.update({
  path: '/',
  getParentRoute: () => TasksRoute,
} as any)

const TasksTaskIdRoute = TasksTaskIdImport.update({
  path: '/$taskId',
  getParentRoute: () => TasksRoute,
} as any)
declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/_layout': {
      preLoaderRoute: typeof LayoutImport
      parentRoute: typeof rootRoute
    }
    '/tasks': {
      preLoaderRoute: typeof TasksImport
      parentRoute: typeof rootRoute
    }
    '/tasks/$taskId': {
      preLoaderRoute: typeof TasksTaskIdImport
      parentRoute: typeof TasksImport
    }
    '/tasks/': {
      preLoaderRoute: typeof TasksIndexImport
      parentRoute: typeof TasksImport
    }
  }
}
export const routeTree = rootRoute.addChildren([
  IndexRoute,
  LayoutRoute,
  TasksRoute.addChildren([TasksTaskIdRoute, TasksIndexRoute]),
])
