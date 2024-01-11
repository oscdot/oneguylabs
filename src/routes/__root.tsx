import { Link, Outlet, RootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'

export const Route = new RootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <>
      <div className="p-2 flex gap-2 text-lg">
        <Link
          to="/"
          activeProps={{
            className: 'font-bold',
          }}
          activeOptions={{ exact: true }}
        >
          Home
        </Link>{' '}
        <Link
          to={'/tasks'}
          activeProps={{
            className: 'font-bold',
          }}
        >
          Tasks
        </Link>
      </div>
      <hr />
      <Outlet />
      {/* Start rendering router matches */}
      <TanStackRouterDevtools position="bottom-right" />
    </>
  )
}
